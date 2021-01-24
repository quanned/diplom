import uuid

from django.db.models import (
    SmallIntegerField,
    FloatField,
    Sum,
    F,
)
from django.db import models
from django.contrib.auth import get_user_model


class Card(models.Model):
    session_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    user = models.ForeignKey(get_user_model(), null=True, on_delete=models.CASCADE)

    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Корзина"
        verbose_name_plural = "Корзины"


class Order(models.Model):
    order_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)

    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, null=True, blank=True)

    address = models.TextField(null=None, blank=True)
    email = models.EmailField(null=None, blank=True)
    phone = models.CharField(max_length=24, null=None, blank=True)
    initials = models.CharField(max_length=128, null=None, blank=True)
    commentary = models.TextField(null=True, blank=True)

    is_active = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True, null=True)

    @property
    def amount_and_count(self):
        features = FeatureCard.objects.filter(order=self)
        return features.aggregate(
            count_=Sum(F('count'), output_field=SmallIntegerField()),
            amount=Sum(F('count') * F('product__price'), output_field=FloatField())
        )

    class Meta:
        verbose_name = "Заказ"
        verbose_name_plural = "Заказы"


class FeatureCard(models.Model):
    card = models.ForeignKey(Card, on_delete=models.CASCADE)
    product = models.ForeignKey('product.Product', on_delete=models.CASCADE)
    product_feature = models.ForeignKey('product.ProductFeature', on_delete=models.CASCADE)
    count = models.IntegerField(default=0)
    product_feature_item = models.ForeignKey('product.ProductFeatureItem', on_delete=models.CASCADE)

    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)

    @property
    def amount(self):
        return self.count * self.product.price
