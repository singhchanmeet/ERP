# Generated by Django 4.2.6 on 2023-10-22 07:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('student', '0002_studentdetails'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='studentdetails',
            options={'verbose_name_plural': 'Personal Details'},
        ),
        migrations.AlterField(
            model_name='studentdetails',
            name='dob',
            field=models.DateField(blank=True),
        ),
    ]