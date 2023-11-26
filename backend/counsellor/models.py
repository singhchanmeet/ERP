from django.db import models
from authentication.models import User
from groups.models import Groups


class CounsellorGroups(models.Model):

    group_name = models.ForeignKey(Groups, on_delete=models.SET_NULL, null=True, db_column='group_name')
    counsellor_id = models.OneToOneField(User, on_delete=models.CASCADE, db_column='counsellor_id')
    counsellor_name = models.CharField(max_length=75)

    def __str__(self):
        return self.counsellor.user_id
    
    class Meta:
        db_table = 'counsellor_groups'  
        verbose_name_plural = "Counsellor-Groups"
