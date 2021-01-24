# Generated by Django 3.1.4 on 2021-01-10 13:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('reference', '0006_auto_20210110_1616'),
        ('product', '0011_auto_20210108_1411'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='productfeature',
            name='count',
        ),
        migrations.RemoveField(
            model_name='productfeatureitem',
            name='color',
        ),
        migrations.AddField(
            model_name='productfeature',
            name='color',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='reference.productcolor', verbose_name='Цвет'),
        ),
        migrations.AddField(
            model_name='productfeatureitem',
            name='count',
            field=models.IntegerField(default=0, verbose_name='Количество'),
        ),
    ]