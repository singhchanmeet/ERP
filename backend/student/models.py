from django.db import models
from authentication.models import User

class Student(models.Model):

    student_id = models.OneToOneField(User, on_delete=models.CASCADE) #Foreign Key
    name = models.CharField(max_length=75)
    email = models.EmailField(max_length=50)
    contact_number = models.CharField(max_length=15, blank=True)
    ip_address = models. GenericIPAddressField(blank=True, null=True)
    date_joined = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
    class Meta:
        db_table = 'students'  # This sets the table name to 'students'
        verbose_name_plural = "Students"