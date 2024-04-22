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


    def __str__(self) -> str:
        return self.company_name
    # def save(self, *args, **kwargs):
    #     if self.date.date() < timezone.now().date():
    #         print("past placement")
    #         PastPlacements.objects.create(
    #             company_name=self.company_name,
    #             pkg_offered=self.pkg_offered,
    #             role=self.role,
    #             docs=self.docs,
    #             date=self.date,
    #             description=self.description
    #         )
    #         super().save(*args, **kwargs)
    #         return
    #     else:
    #         print("active placement")
    #         ActivePlacements.objects.create(
    #             company_name=self.company_name,
    #             pkg_offered=self.pkg_offered,
    #             role=self.role,
    #             docs=self.docs,
    #             date=self.date,
    #             description=self.description
    #         )
    #         super().save(*args, **kwargs)
    #         return
    



# class ActivePlacements(models.Model):
#     company_name = models.CharField(max_length= 40)
#     pkg_offered = models.FloatField()
#     role = models.CharField(max_length= 20)
#     docs = models.FileField(upload_to='assets/' , null=True )
#     date= models.DateTimeField(default=timezone.now)
#     description = models.TextField()


#     def __str__(self) -> str:
#         return self.company_name
    

# class PastPlacements(models.Model):
#     company_name = models.CharField(max_length= 40)
#     pkg_offered = models.FloatField()
#     role = models.CharField(max_length= 20)
#     docs = models.FileField(upload_to='assets/' , null=True )
#     date= models.DateTimeField(default= timezone.now)
#     description = models.TextField()


#     def __str__(self) -> str:
#         return self.company_name
    

class Announcement(models.Model):
    title = models.CharField(max_length= 20)
    desc = models.TextField()
    docs = models.FileField(upload_to='assets/' , null=True )
    date = models.DateTimeField(default= timezone.now)
    archive = models.BooleanField(default=False) 

    def __str__(self) -> str:
        return self.title

# class PlacementOfficer(models.Model):
#     name = models.CharField(max_length= 40)
#     username = models.CharField(max_length=20)
#     email = models.EmailField()
#     password = models.CharField(max_length= 15)
#     contact_number = models.CharField(max_length=15, blank=True)
    
    
#     def __str__(self) -> str:
#         return self.name
