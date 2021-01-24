from django.contrib import admin
from reference.models import (
    ProductHeight,
    ProductColor,
    ProductSize,
)


admin.site.register(ProductSize)
admin.site.register(ProductColor)
admin.site.register(ProductHeight)