from django.db.models import (
    F,
    FloatField,
    SmallIntegerField,
    Sum,
)

from rest_framework import serializers

from .models import (
    Card,
    FeatureCard,
)

from product.models import Product


class ProductCardSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product


class FeatureCardSerializer(serializers.ModelSerializer):

    class Meta:
        model = FeatureCard
        fields = (

        )


class CardSerializer(serializers.ModelSerializer):
    amount = serializers.SerializerMethodField('amount_card')
    products = serializers.SerializerMethodField('products_list')

    class Meta:
        model = Card
        fields = (
            'amount',
            'session_id',
            'products',
        )

    def amount_card(self, obj):
        amount = FeatureCard.objects.filter(card=obj).aggregate(
            amount=Sum(
                F('count') * F('product__price'),
                output_field=FloatField()
            )
        ).get('amount')
        return 0.00 if not amount else amount

    def products_list(self, obj):
        ids = FeatureCard.objects.filter(card=obj).distinct('product').values_list('product__id', flat=True)
        result = []
        for id_ in ids:
            features_card = FeatureCard.objects.filter(card=obj, product__id=id_)

            meta_data = features_card.aggregate(
                count_=Sum(F('count'), output_field=SmallIntegerField()),
                product_amount=Sum(F('count') * F('product__price'), output_field=FloatField())
            )
            result.append({
                'id': id_,
                'count': meta_data.get('count_'),
                'amount': meta_data.get('product_amount'),
                'image': features_card[0].product.image.url,
                'name': features_card[0].product.name,
            })
        return result