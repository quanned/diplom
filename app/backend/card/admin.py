from django.contrib import admin

from .models import (
    Card,
    FeatureCard,
    Order,
)


class FeatureCardInline(admin.StackedInline):
    model = FeatureCard
    extra = 0


class CardAdmin(admin.ModelAdmin):
    inlines = [FeatureCardInline]
    extra = 1


class OrderAdmin(admin.ModelAdmin):
    inlines = [FeatureCardInline, ]


admin.site.register(Card, CardAdmin)
admin.site.register(Order, OrderAdmin)
