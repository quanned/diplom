# Generated by Django 3.1.4 on 2021-01-14 19:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('card', '0004_featurecard_order'),
    ]

    operations = [
        migrations.AddField(
            model_name='card',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]
