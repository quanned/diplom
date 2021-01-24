from django.db import transaction

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK, HTTP_204_NO_CONTENT

from card.models import (
    Card,
    FeatureCard,
)
from product.models import (
    Product,
    ProductFeature,
    ProductFeatureItem,
)

from .exceptions import CardException

from card.serializers import CardSerializer


class CardAPIView(APIView):

    @staticmethod
    def _check_card_user(card, user):
        if user.is_authenticated and not card.user:
            card.user = user
            card.save()
        elif card.user and user.is_authenticated and card.user != user:
            raise CardException

    def get(self, request):

        session_id = request.query_params.get('session_id')
        try:
            card = Card.objects.get(session_id=session_id, is_active=True)
            self._check_card_user(card, request.user)
        except (Card.DoesNotExist, CardException):
            return Response(status=HTTP_204_NO_CONTENT)
        return Response(CardSerializer(card, many=False).data, status=HTTP_200_OK)

    def delete(self, request):
        session_id = request.query_params.get('session_id')
        id_ = request.query_params.get('id')

        try:
            card = Card.objects.get(session_id=session_id, is_active=True)
            self._check_card_user(card, request.user)
        except (Card.DoesNotExist, CardException):
            return Response(status=HTTP_204_NO_CONTENT)

        FeatureCard.objects.filter(card=card, product__id=id_).delete()

        return Response(CardSerializer(card, many=False).data, status=HTTP_200_OK)

    @transaction.atomic
    def post(self, request):
        data = request.data.get('data', [])
        id_ = request.data.get('id')
        session_id = request.query_params.get('session_id')

        if not data or not id_:
            return Response(status=HTTP_400_BAD_REQUEST)

        try:
            product = Product.objects.get(id=id_)
        except Product.DoesNotExist:
            return Response(status=HTTP_400_BAD_REQUEST)

        try:
            card = Card.objects.get(session_id=session_id, is_active=True)
            self._check_card_user(card, request.user)
        except (Card.DoesNotExist, CardException):
            card = Card.objects.create()

        for item in data:
            count = item.get('count', 0)
            if not isinstance(count, int):
                return Response(status=HTTP_400_BAD_REQUEST)

            try:
                product_feature = ProductFeature.objects.get(id=item.get('feature_id'))
                product_feature_item = ProductFeatureItem.objects.get(id=item.get('feature_item_id'))
            except (ProductFeature.DoesNotExist, ProductFeatureItem.DoesNotExist):
                return Response(status=HTTP_400_BAD_REQUEST)

            feature_card, _ = FeatureCard.objects.get_or_create(
                card=card,
                product=product,
                product_feature=product_feature,
                product_feature_item=product_feature_item
            )

            feature_card.count = feature_card.count + count
            feature_card.save()

            if product_feature_item.count - count < 0:
                return Response(status=HTTP_400_BAD_REQUEST)

            product_feature_item.count = product_feature_item.count - count
            product_feature_item.save()

        result = CardSerializer(card, many=False)

        return Response(result.data, status=HTTP_200_OK)