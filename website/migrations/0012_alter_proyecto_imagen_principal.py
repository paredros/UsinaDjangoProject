# Generated by Django 5.1.7 on 2025-03-13 22:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0011_alter_proyecto_imagen_principal'),
    ]

    operations = [
        migrations.AlterField(
            model_name='proyecto',
            name='imagen_principal',
            field=models.ImageField(upload_to='images/proyectos<django.db.models.fields.CharField>'),
        ),
    ]
