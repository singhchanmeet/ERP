from django.db import models


class Batches(models.Model):

    batch = models.CharField(max_length=4, primary_key=True, db_column='batch')

    def __str__(self):
        return self.batch

    class Meta:
        db_table = 'batches'  
        verbose_name_plural = "Batches" 

