from django.db import models

class Groups(models.Model):

    group_name = models.CharField(max_length=4, primary_key=True, db_column='group_name')

    def __str__(self):
        return self.group_name

    class Meta:
        db_table = 'groups'  
        verbose_name_plural = "Groups" 