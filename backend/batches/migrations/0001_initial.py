# Generated by Django 4.2.6 on 2023-12-02 08:01

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Batches',
            fields=[
                ('batch', models.CharField(db_column='batch', max_length=4, primary_key=True, serialize=False)),
            ],
            options={
                'verbose_name_plural': 'Batches',
                'db_table': 'batches',
            },
        ),
    ]
