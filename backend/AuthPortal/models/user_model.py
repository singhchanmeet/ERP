from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import gettext_lazy as _

# BaseUserManager class contains create_user and create_superuser methods
# We are inheriting from that to override them
class CustomUserManager(BaseUserManager):

    def create_user(self, user_id, email, password, **extra_fields):
        if not email:
            raise ValueError(_("The Email field must be set"))
        if not password:
            raise ValueError(_("User must have a password"))
        email = self.normalize_email(email)
        user = self.model(user_id=user_id, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, user_id, email, password, **extra_fields):
        if not email:
            raise ValueError(_("User must have an email"))
        if not password:
            raise ValueError(_("User must have a password"))
        
        user = self.create_user(user_id=user_id,email=email, password=password, **extra_fields)

        user.is_staff = True
        user.is_superuser = True
        user.role = User.Role.ADMIN
        user.save(using=self._db)
        return user
    
    




class User(AbstractUser):

    class Role(models.TextChoices):
        # first arguement is stored in database, second is its human readable form that will be displayed in dropdowns
        ADMIN = "ADMIN" , 'Admin'
        STUDENT = "STUDENT" , 'Student'
        EMPLOYEE = "EMPLOYEE" , 'Employee'

    # fields coming from parent class AbstractUSer that will be used as-it-is in our custom User model are :
    # email, password, groups, user_permissions, is_staff, is_active, last_login, last_joined
    # fields from parent class AbstractUser that we want to NOT be present in our custom User model are:
    username = None
    first_name = None
    last_name = None
    # adding these new fields to our custom User model:
    user_id = models.CharField(max_length=50, primary_key=True)
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=50, choices=Role.choices)
    password = models.CharField(max_length=1000,blank = True , null= True )
    # user_id will be used for authentication
    USERNAME_FIELD = 'user_id'  

    # without these fields, a User object can't be created:
    REQUIRED_FIELDS = ['email', 'name']

    # for overriding default create_user and create_superuser method because we have extra arguements to be dealt with
    objects = CustomUserManager()  

    def __str__(self):
        return self.user_id
    
    class Meta:
        db_table = 'users'  # This sets the table name to 'users'
        verbose_name_plural = "Users"