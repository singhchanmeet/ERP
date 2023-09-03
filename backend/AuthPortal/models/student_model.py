from django.db import models
from .user_model import User

class Student(models.Model):
    student_id = models.OneToOneField(User, on_delete=models.CASCADE) #Foreign Key
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    contact_number = models.CharField(max_length=15)
    ip_address = models. GenericIPAddressField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
    class Meta:
        db_table = 'students'  # This sets the table name to 'students'
        verbose_name_plural = "Students"