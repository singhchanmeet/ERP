from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.utils import timezone



class Placements(models.Model):
    company_name = models.CharField(max_length= 40)
    pkg_offered = models.FloatField()
    role = models.CharField(max_length= 20)
    docs = models.FileField(upload_to='assets/' , null=True )
    date= models.DateTimeField(default= timezone.now)
    description = models.TextField()
    archive = models.BooleanField(default=False)


    def __str__(self) -> str:
        return self.company_name
    

class Announcement(models.Model):
    title = models.CharField(max_length= 20)
    desc = models.TextField()
    docs = models.FileField(upload_to='assets/' , null=True )
    date = models.DateTimeField(default= timezone.now)
    archive = models.BooleanField(default=False) 

    def __str__(self) -> str:
        return self.title

