from django.db import models

from reference.models import (
    ProductSize,
    ProductHeight,
    ProductColor,
)


class Category(models.Model):
    """
    Модель раздела
    """
    name = models.CharField(
        max_length=64,
        verbose_name="Название раздела",
    )
    image = models.FileField(null=True)

    class Meta:
        verbose_name = "Раздел"
        verbose_name_plural = "Разделы"

    def __str__(self):
        return self.name


class Subcategory(models.Model):
    """
    Модель категории
    """
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        verbose_name="Раздел",
    )

    name = models.CharField(
        max_length=64,
        verbose_name="Название категории",
    )

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"

    def __str__(self):
        return self.name


class Brand(models.Model):
    """
    Модель бренда
    """
    name = models.CharField(
        max_length=64,
        verbose_name="Наименование бренда"
    )
    image = models.FileField(null=True)

    class Meta:
        verbose_name = "Бренд"
        verbose_name_plural = "Бренды"

    def __str__(self):
        return self.name


class Product(models.Model):
    """
    Модель товара
    """
    subcategory = models.ForeignKey(
        Subcategory,
        on_delete=models.SET_NULL,
        null=True,
        verbose_name="Категория",
    )
    name = models.CharField(
        max_length=268,
        verbose_name="Наименование товара"
    )
    model = models.CharField(
        max_length=16,
        unique=True,
        verbose_name="Модель товара"
    )
    brand = models.ForeignKey(
        Brand,
        on_delete=models.SET_NULL,
        null=True,
        verbose_name="Бренд"
    )

    is_new = models.BooleanField(
        default=False,
        verbose_name="Новинка?"
    )

    price = models.FloatField(
        verbose_name="Стоимость за шт."
    )

    cloth = models.CharField(
        'Полотно',
        max_length=64,
        null=True,
    )

    structure = models.CharField(
        'Состав',
        max_length=64,
        null=True,
    )

    type_of_finishing = models.CharField(
        'Вид отделки',
        max_length=64,
        null=True,
    )

    image = models.FileField('Изображение', default=None)

    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товары"

    def __str__(self):
        return f'{self.name} / {self.id}'

    @property
    def colors(self):
        colors = [x.color.value for x in ProductFeature.objects.filter(product=self)]
        return colors


class ProductFeature(models.Model):
    """
    Модель характеристик товара
    """
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        verbose_name="Товар",
    )
    color = models.ForeignKey(
        ProductColor,
        on_delete=models.PROTECT,
        verbose_name="Цвет",
        null=True,
    )

    class Meta:
        verbose_name = "Характеристика к товару"
        verbose_name_plural = "Характеристики к товарам"

    def __str__(self):
        return f'Характеристика к товару {str(self.product)}'


class ProductFeatureItem(models.Model):
    """
    Модель характеристики товара
    """
    product_feature = models.ForeignKey(
        ProductFeature,
        on_delete=models.CASCADE,
    )
    height = models.ForeignKey(
        ProductHeight,
        on_delete=models.PROTECT,
        verbose_name="Рост",
    )
    size = models.ForeignKey(
        ProductSize,
        on_delete=models.PROTECT,
        verbose_name="Размер",
    )
    count = models.IntegerField(
        default=0,
        verbose_name="Количество",
    )

    class Meta:
        verbose_name = "Особенность характеристики к товару"
        verbose_name_plural = "Особенности характеристики к товарам"

    def __str__(self):
        return f'Размер: {str(self.size)}, Рост: {str(self.height)}'


class PictureProduct(models.Model):
    """
    Модель изображений продукта
    """

    image = models.FileField('Изображение', default=None)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)

    class Meta:
        verbose_name = "Изображение"
        verbose_name_plural = "Изображения"

    def __str__(self):
        return f'Изображение к товару {self.id}'