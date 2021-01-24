from django.db import models


class ProductSize(models.Model):
    value = models.IntegerField(
        unique=True,
        verbose_name="Значение размера",
    )

    class Meta:
        verbose_name = "Размер"
        verbose_name_plural = "Размеры"

    def __str__(self):
        return str(self.value)


class ProductHeight(models.Model):
    value = models.IntegerField(
        unique=True,
        verbose_name="Значение высоты",
    )

    class Meta:
        verbose_name = "Высота"
        verbose_name_plural = "Высота"

    def __str__(self):
        return str(self.value)


class ProductColor(models.Model):
    name = models.CharField(
        max_length=32,
        verbose_name="Название цвета",
    )
    value = models.CharField(
        max_length=6,
        verbose_name="Цвет в формате HEX (000fff)",
        default=None,
        null=True,
    )

    class Meta:
        verbose_name = "Цвет"
        verbose_name_plural = "Цвета"

    def __str__(self):
        return self.name

