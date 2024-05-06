from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.utils import timezone



# class Placements(models.Model):
#     company_name = models.CharField(max_length= 40)
#     pkg_offered = models.FloatField()
#     role = models.CharField(max_length= 20)
#     docs = models.FileField(upload_to='assets/' , null=True )
#     # date= models.DateTimeField(default= timezone.now)
#     date = models.DateField(default=timezone.now().date)
#     description = models.TextField()
#     archive = models.BooleanField(default=False)


#     def __str__(self) -> str:
#         return self.company_name
    

# class Announcement(models.Model):
#     title = models.CharField(max_length= 20)
#     desc = models.TextField()
#     docs = models.FileField(upload_to='assets/' , null=True )
#     date = models.DateField(default=timezone.now().date)
#     archive = models.BooleanField(default=False) 

#     def __str__(self) -> str:
#         return self.title

def get_current_date():
    return timezone.now().date()

class Placements(models.Model):
    company_name = models.CharField(max_length=40)
    pkg_offered = models.FloatField()
    role = models.CharField(max_length=20)
    docs = models.FileField(upload_to='assets/', null=True)
    date = models.DateField(default=get_current_date)
    description = models.TextField()
    archive = models.BooleanField(default=False)

    def __str__(self):
        return self.company_name
    

class Announcement(models.Model):
    title = models.CharField(max_length=20)
    desc = models.TextField()
    docs = models.FileField(upload_to='assets/', null=True)
    date = models.DateField(default=get_current_date)
    archive = models.BooleanField(default=False) 

    def __str__(self):
        return self.title