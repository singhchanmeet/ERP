# Generated by Django 4.2.6 on 2023-11-26 08:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('groups', '0001_initial'),
        ('student', '0008_studentgroups'),
    ]

    operations = [
        migrations.AlterField(
            model_name='studentgroups',
            name='group_name',
            field=models.ForeignKey(db_column='group_name', null=True, on_delete=django.db.models.deletion.SET_NULL, to='groups.groups'),
        ),
    ]