# Generated by Django 4.2.6 on 2023-12-02 08:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('batches', '0001_initial'),
        ('student', '0007_alter_student_student_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='batch',
            field=models.ForeignKey(db_column='batch', null=True, on_delete=django.db.models.deletion.SET_NULL, to='batches.batches'),
        ),
    ]
