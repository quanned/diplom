import re

from django.db.models import (
    SmallIntegerField,
    FloatField,
    Sum,
    F,
)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_204_NO_CONTENT,
    HTTP_402_PAYMENT_REQUIRED,
    HTTP_200_OK,
)
from card.models import (
    Card,
    FeatureCard,
    Order,
)


class OrderAPIView(APIView):

    def get(self, request):
        try:
            card = Card.objects.get(
                session_id=request.query_params.get('session_id'),
                is_active=True
            )
        except Card.DoesNotExist:
            return Response(status=HTTP_204_NO_CONTENT)

        features_card = FeatureCard.objects.filter(card=card)
        if not features_card.exists():
            return Response(status=HTTP_204_NO_CONTENT)

        products = [f.product for f in features_card.distinct('product')]
        result = []
        for product in products:
            features = FeatureCard.objects.filter(product=product, card=card)

            aggr = features.aggregate(
                count_=Sum(F('count'), output_field=SmallIntegerField()),
                amount=Sum(F('count') * F('product__price'), output_field=FloatField())
            )
            obj = {
                'data': [],
                'model': product.model,
                'price': product.price,
                'count': aggr['count_'],
                'amount': aggr['amount'],
                'id': product.id,
                'image': product.image.url,
                'name': product.name,
            }
            for feature in features:
                obj['data'].append({
                    'id': feature.id,
                    'size': feature.product_feature_item.size.value,
                    'height': feature.product_feature_item.height.value,
                    'count': feature.count,
                    'max_count': feature.product_feature_item.count,
                    'price': feature.product.price,
                    'amount': round(feature.product.price * feature.count, 2)
                })
            result.append(obj)

        return Response(result, status=HTTP_200_OK)

    def post(self, request):
        products = request.data.get('products', [])
        if not products:
            return Response(status=HTTP_402_PAYMENT_REQUIRED)

        info = request.data.get('info', {})
        if not info:
            return Response(status=HTTP_402_PAYMENT_REQUIRED)

        address = info.get('address')
        email = info.get('email')
        phone = info.get('phone')
        initials = info.get('initials')

        commentary = info.get('commentary')

        if not address:
            return Response("Адрес доставки не заполнен.")

        if not isinstance(email, str):
            return Response("Email не был указан.", status=HTTP_400_BAD_REQUEST)
        elif isinstance(email, str) and not re.match(r"^.+@(\[?)[a-zA-Z0-9-.]+.([a-zA-Z]{2,3}|[0-9]{1,3})(]?)$", email):
            return Response("Email был указан неверно.", status=HTTP_400_BAD_REQUEST)

        if not isinstance(phone, str):
            return Response("Телефон не был указан.", status=HTTP_400_BAD_REQUEST)
        elif isinstance(phone, str) and not re.match(r"(\+375)?(\s*)?(\d{9})", phone):
            return Response("Телефон был указан неверно.", status=HTTP_400_BAD_REQUEST)

        if not initials:
            return Response("Адрес доставки не заполнен.")

        card = None

        user = None
        if request.user.is_authenticated:
            user = request.user

        order = Order.objects.create(
            user=user,
            address=address,
            email=email,
            phone=phone,
            initials=initials,
            commentary=commentary,
        )

        for item in products:
            product_id = item.get('id')
            data = item.get('data', [])
            for feature_obj in data:
                try:
                    feature_card = FeatureCard.objects.get(
                        id=feature_obj.get('id'), card__is_active=True, product__id=product_id
                    )
                except FeatureCard.DoesNotExist:
                    return Response(status=HTTP_400_BAD_REQUEST)

                if feature_obj.get('count') > feature_obj.get('max_count'):
                    return Response("Выбрано недопустимое значение количества.", status=HTTP_400_BAD_REQUEST)

                if feature_card.count != feature_obj and feature_obj.get('count', 0) > feature_card.count:
                    diff = feature_obj.get('count') - feature_card.count
                    feature_card.product_feature_item.count = feature_card.product_feature_item.count - diff
                    feature_card.product_feature_item.save()
                elif feature_card.count != feature_obj and feature_obj.get('count', 0) < feature_card.count:
                    diff = feature_card.count + feature_obj.get('count')
                    feature_card.product_feature_item.count = feature_card.product_feature_item.count + diff
                    feature_card.product_feature_item.save()

                feature_card.order = order
                feature_card.save()

                card = feature_card.card

        card.is_active = False
        card.save()

        return Response(order.id, status=HTTP_200_OK)