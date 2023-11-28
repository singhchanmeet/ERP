from django.db import models
from authentication.models import User


class Groups(models.Model):

    group_name = models.CharField(max_length=4, primary_key=True, db_column='group_name')

    def __str__(self):
        return self.group_name

    class Meta:
        db_table = 'groups'  
        verbose_name_plural = "Groups" 




class StudentGroups(models.Model):

    group_name = models.ForeignKey(Groups, on_delete=models.SET_NULL, null=True, db_column='group_name')
    student_id = models.OneToOneField(User, on_delete=models.CASCADE, db_column='student_id')
    student_name = models.CharField(max_length=75)

    def __str__(self):
        return self.student_id.user_id
    
    class Meta:
        db_table = 'student_groups'  
        verbose_name_plural = "Student-Groups"

class CounsellorGroups(models.Model):

    group_name = models.ForeignKey(Groups, on_delete=models.SET_NULL, null=True, db_column='group_name')
    counsellor_id = models.OneToOneField(User, on_delete=models.CASCADE, db_column='counsellor_id')
    counsellor_name = models.CharField(max_length=75)

    def __str__(self):
        return self.counsellor_id.user_id
    
    class Meta:
        db_table = 'counsellor_groups'  
        verbose_name_plural = "Counsellor-Groups"