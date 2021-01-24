from django.contrib import admin

from product.models import (
    Category,
    Subcategory,
    Brand,
    Product,
    ProductFeatureItem,
    ProductFeature,
    PictureProduct,
)


class PictureProductInline(admin.StackedInline):
    model = PictureProduct
    extra = 1


class ProductFeatureItemInline(admin.StackedInline):
    model = ProductFeatureItem
    extra = 1


class ProductFeatureInline(admin.StackedInline):
    model = ProductFeature
    inlines = [ProductFeatureItemInline, ]
    extra = 1


class ProductAdmin(admin.ModelAdmin):
    inlines = [PictureProductInline, ProductFeatureInline]
    extra = 1


admin.site.register(Category)
admin.site.register(Subcategory)
admin.site.register(Brand)
admin.site.register(Product, ProductAdmin)

admin.site.register(ProductFeature)
admin.site.register(ProductFeatureItem)
