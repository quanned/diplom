# Generated by Django 3.0.6 on 2020-12-09 22:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reference', '0003_auto_20201210_0132'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productcolor',
            name='value',
            field=models.CharField(default=None, max_length=6, null=True, verbose_name='Цвет в формате HEX (#000fff)'),
        ),
    ]
