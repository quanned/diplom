# Generated by Django 3.1.4 on 2021-01-02 14:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0009_auto_20210102_1723'),
    ]

    operations = [
        migrations.AddField(
            model_name='pictureproduct',
            name='product',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='product.product'),
        ),
    ]
