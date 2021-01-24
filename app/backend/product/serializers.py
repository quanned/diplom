from rest_framework import serializers

from product.models import (
    Category,
    Subcategory,
    Product,
    Brand,
    PictureProduct,
    ProductFeatureItem,
    ProductFeature,
)


class SubcategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcategory
        fields = ('id', 'name')


class CategorySerializer(serializers.ModelSerializer):
    subcategories = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = (
            'id',
            'name',
            'image',
            'subcategories',
        )

    def get_subcategories(self, obj):
        subcategories = Subcategory.objects.filter(category=obj)
        return SubcategorySerializer(subcategories, many=True).data


class BrandSerializer(serializers.ModelSerializer):

    class Meta:
        model = Brand
        fields = (
            'id',
            'name',
            'image',
        )


class ProductShortSerializer(serializers.ModelSerializer):
    brand = BrandSerializer()

    class Meta:
        model = Product
        fields = (
            'id',
            'is_new',
            'name',
            'model',
            'price',
            'brand',
            'image',
            'cloth',
            'structure',
            'colors',
        )


class ProductPictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = PictureProduct
        fields = ('image', )


class ProductSerializer(serializers.ModelSerializer):
    brand = BrandSerializer()
    images = serializers.SerializerMethodField('images_list')
    features = serializers.SerializerMethodField('features_list')
    heights = serializers.SerializerMethodField('heights_range')

    class Meta:
        model = Product
        fields = (
            'id',
            'is_new',
            'name',
            'model',
            'price',
            'brand',
            'image',
            'images',
            'features',
            'heights',
            'cloth',
            'structure',
            'type_of_finishing',
        )

    def heights_range(self, obj):
        objects = list(
            set(ProductFeatureItem.objects.filter(product_feature__product=obj).values_list('size__value', flat=True))
        )
        result = None

        if len(objects) == 1:
            return objects[0]
        if len(objects) > 1:
            result = f'{min(objects)}-{max(objects)}'

        return result

    def images_list(self, obj):
        images_ = PictureProduct.objects.filter(product=obj)
        return ProductPictureSerializer(images_, many=True).data

    def features_list(self, obj):
        items = ProductFeatureItem.objects.filter(product_feature__product=obj)
        return {
            'sizes': list(set([x.size.value for x in items.order_by('size__value')])),
            'heights': list(set([x.height.value for x in items.order_by('height__value')])),
            'colors': [{'name': x.color.name, 'value': x.color.value} for x in ProductFeature.objects.filter(product=obj)],
        }