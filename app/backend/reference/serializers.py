from rest_framework import serializers

from reference.models import (
    ProductColor,
    ProductHeight,
    ProductSize,
)


class ProductColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductColor
        fields = ('id', 'name', 'value')


class ProductHeightSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductHeight
        fields = ('id', 'value')


class ProductSizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSize
        fields = ('id', 'value')