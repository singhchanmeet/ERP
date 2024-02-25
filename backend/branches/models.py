from django.db import models


class Branches(models.Model):

    branch = models.CharField(max_length=30, primary_key=True, db_column='branch')

    def __str__(self):
        return self.branch

    class Meta:
        db_table = 'branches'  
        verbose_name_plural = "Branches" 

