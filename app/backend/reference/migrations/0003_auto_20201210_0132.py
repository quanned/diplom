# Generated by Django 3.0.6 on 2020-12-09 22:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reference', '0002_auto_20201210_0131'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productcolor',
            name='value',
            field=models.CharField(default='f00000', max_length=6, verbose_name='Цвет в формате HEX (#000fff)'),
        ),
    ]
