from django.db.models import Q

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND

from api.pagination import StandardResultsPagination
from api.mixins import PaginationMixin

from product.models import (
    Category,
    Product,
    ProductFeatureItem,
    Brand,
    ProductFeature,
)

from reference.models import (
    ProductSize,
    ProductHeight,
    ProductColor,
)

from product.serializers import (
    CategorySerializer,
    ProductShortSerializer,
    BrandSerializer,
    ProductSerializer,
)

from reference.serializers import (
    ProductSizeSerializer,
    ProductHeightSerializer,
    ProductColorSerializer,
)

NAME_COLOR = 'colors'
NAME_BRAND = 'brands'
NAME_SIZE = 'sizes'
NAME_HEIGHT = 'height'
NAME_CATEGORY = 'category'

PRODUCTS_ORDER_BY = {
    '1': {'value': 'name', 'title': "по названию"},
    '2': {'value': 'model', 'title': "по модели"},
    '3': {'value': 'price', 'title': "по цене"},
}


class InitializeDataView(APIView):

    def get(self, request, format=None):
        query_params = self.request.query_params
        only_models = query_params.get('only', str()).split(',')

        categories = Category.objects.all()

        orders = {key: PRODUCTS_ORDER_BY.get(key).get('title') for key in PRODUCTS_ORDER_BY.keys()}

        result = {
            'categories': CategorySerializer(categories, many=True).data,
            'orders': orders
        }
        if NAME_BRAND in only_models:
            brands = Brand.objects.all()
            result.update({
                'brands': BrandSerializer(brands, many=True).data
            })

        if NAME_COLOR in only_models:
            colors = ProductColor.objects.all()
            result.update({
                'colors': ProductColorSerializer(colors, many=True).data
            })

        if NAME_HEIGHT in only_models:
            height = ProductHeight.objects.all().order_by('value')
            result.update({
                'height': ProductHeightSerializer(height, many=True).data
            })

        if NAME_SIZE in only_models:
            sizes = ProductSize.objects.all().order_by('value')
            result.update({
                'sizes': ProductSizeSerializer(sizes, many=True).data
            })

        return Response(result)


class ProductsView(APIView, PaginationMixin):
    pagination_class = StandardResultsPagination
    serializer_class = ProductShortSerializer

    def get(self, request, format=None):
        filters, product_features_items, product_features = self._generate_filter(request.query_params)
        queryset = Product.objects.all().filter(**filters)
        if product_features_items:
            queryset = queryset.filter(
                id__in=product_features_items.values_list(
                    'product_feature__product__id', flat=True
                ),
            )

        if product_features:
            queryset = queryset.filter(
                id__in=product_features.values_list(
                    'product__id', flat=True
                ),
            )

        search_value = request.query_params.get('search')
        if search_value:
            queryset = queryset.filter(
                Q(name__icontains=search_value) | Q(model__icontains=search_value)
            )

        order_by = self._generate_order_by(request.query_params)
        queryset = queryset.order_by(order_by)

        paginated = dict()
        page = self.paginate_queryset(queryset)

        if page is not None:
            serializer_products = ProductShortSerializer(page, many=True)
            paginated = self.get_paginated_response(serializer_products.data)
            return paginated
        return Response(paginated)

    @staticmethod
    def _generate_filter(params):
        filters = {}

        is_new = params.get('only_new', None)
        if is_new is not None:
            filters.update({
                'is_new': bool(params.get('only_new', False)),
            })

        brands = params.get(NAME_BRAND)
        if brands:
            brands = [brand for brand in brands.split(',') if brand.isdigit()]
            filters.update({'brand__id__in': brands})

        products_feature_items = {}
        product_feature = {}

        colors = params.get(NAME_COLOR)
        if colors:
            colors = [color for color in colors.split(',') if color.isdigit()]
            product_feature.update({
                'color__id__in': colors,
            })

        heights = params.get(NAME_HEIGHT)
        if heights:
            heights = [height for height in heights.split(',') if height.isdigit()]
            products_feature_items.update({
                'height__id__in': heights,
            })

        sizes = params.get(NAME_SIZE)
        if sizes:
            sizes = [size for size in sizes.split(',') if size.isdigit()]
            products_feature_items.update({
                'size__id__in': sizes,
            })

        subcategory = params.get(NAME_CATEGORY)
        if subcategory:
            subcategories = [subcategory_ for subcategory_ in subcategory.split(',') if subcategory_.isdigit()]
            filters.update({
                'subcategory__id__in': subcategories
            })

        if products_feature_items:
            products_features_items = ProductFeatureItem.objects.filter(**products_feature_items)
        else:
            products_features_items = ProductFeatureItem.objects.none()

        if product_feature:
            product_features = ProductFeature.objects.filter(**product_feature)
        else:
            product_features = ProductFeature.objects.none()

        return filters, products_features_items, product_features

    @staticmethod
    def _generate_order_by(params):
        default_value = '-id'
        return PRODUCTS_ORDER_BY.get(params.get('order_by', None), {}).get('value', default_value)


class ProductView(APIView):
    serializer_class = ProductShortSerializer

    def get(self, request, id, format=None, ):
        try:
            product = Product.objects.get(id=id)
        except Product.DoesNotExist:
            return Response({}, status=HTTP_404_NOT_FOUND)
        data = ProductSerializer(product, many=False).data

        try:
            next_product = Product.objects.get(id=id + 1)
        except Product.DoesNotExist:
            next_product = None

        try:
            prev_product = Product.objects.get(id=id - 1)
        except Product.DoesNotExist:
            prev_product = None

        if next_product:
            next_product = {'id': id + 1, 'image': next_product.image.url, 'model': next_product.model}
        if prev_product:
            prev_product = {'id': id - 1, 'image': prev_product.image.url, 'model': prev_product.model}

        list_ = []

        for p in ProductFeature.objects.filter(product=product).distinct('color'):
            items = ProductFeatureItem.objects.filter(product_feature=p)
            table, heights, sizes = get_table_from_features(items, product)
            list_.append({
                'id': p.id,
                'data': table,
                'sizes': sizes,
                'heights': heights,
                'color': ProductColorSerializer(p.color, many=False).data,
            })

        print(list_)

        data.update({
            'next_product': next_product,
            'prev_product': prev_product,
            'in_stock': ProductFeatureItem.objects.filter(product_feature__product=product, count__gte=0).exists(),
            'feature_items': list_
        })

        return Response(data)


def get_table_from_features(items, product):
    heights = items.distinct('height').values_list('height__value', flat=True)
    sizes = items.distinct('size').values_list('size__value', flat=True)

    data = {index: [] for index, i in enumerate(heights)}

    for index, i in enumerate(heights):
        for s in sizes:
            try:
                item = items.get(height__value=i, size__value=s)
                obj = {
                    'count': item.count,
                    'id': item.id,
                    'value_': 0
                }
            except ProductFeatureItem.DoesNotExist:
                obj = None

            data[index].append(obj)

    return data, heights, sizes