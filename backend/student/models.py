from django.db import models
from authentication.models import User
from django.utils.html import mark_safe
from . import utils

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



# Model for all personal details of student (common for all sems)
class StudentDetails(models.Model):

    # Enrollment Number
    enrollment_number = models.CharField(max_length=11, unique=True, db_index=True)   #db_index is for faster queries
    #GGSIPU registration number
    ipu_registration_number = models.CharField(max_length=12, unique=True)

    #candidate details
    name = models.CharField(max_length=75, blank=True)
    dob = models.DateField(blank=True)
    full_address = models.CharField(max_length=150, blank=True)
    email = models.EmailField(max_length=50, blank=True, unique=False)
    mobile_number = models.CharField(max_length=10, blank=True)
    gender = models.CharField(max_length=6, blank=True)
    category = models.CharField(max_length=30, blank=True)
    region = models.CharField(max_length=15, blank=True)

    #parent details
    father_name = models.CharField(max_length=75, blank=True)
    mother_name = models.CharField(max_length=75, blank=True)
    father_qualification = models.CharField(max_length=30, blank=True)
    mother_qualification = models.CharField(max_length=30, blank=True)
    father_occupation = models.CharField(max_length=30, blank=True)
    mother_occupation = models.CharField(max_length=30, blank=True)
    father_job_designation = models.CharField(max_length=50, blank=True)
    mother_job_designation = models.CharField(max_length=50, blank=True)
    father_business_type = models.CharField(max_length=50, blank=True)
    mother_business_type = models.CharField(max_length=50, blank=True)
    father_mobile_number = models.CharField(max_length=10, blank=True)
    mother_mobile_number = models.CharField(max_length=10, blank=True)
    father_office_address = models.CharField(max_length=100, blank=True)
    mother_office_address = models.CharField(max_length=100, blank=True)
    guardian_name = models.CharField(max_length=75, blank=True)

    #12th class details
    board_12th = models.CharField(max_length=100, blank=True)
    year_of_12th = models.PositiveIntegerField(blank=True, null=True)
    rollno_12th = models.PositiveBigIntegerField(blank=True, null=True)
    school_12th = models.CharField(max_length=150, blank=True)
    aggregate_12th = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)

    #10th class details
    board_10th = models.CharField(max_length=100, blank=True)
    year_of_10th = models.PositiveIntegerField(blank=True, null=True)
    rollno_10th = models.PositiveBigIntegerField(blank=True, null=True)
    school_10th = models.CharField(max_length=150, blank=True)
    aggregate_10th = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)

    #JEE details
    jee_rank = models.PositiveIntegerField(blank=True, null=True)
    jee_percentile = models.DecimalField(max_digits=15, decimal_places=11, blank=True, null=True)
    jee_rollno = models.CharField(max_length=12, blank=True)

    #special acheivements
    special_achievements = models.CharField(max_length=200, blank=True)

    #images and files
    passport_photograph = models.ImageField(upload_to=utils.passport_photograph_rename, blank=True)
    marksheet_10th = models.FileField(upload_to=utils.marksheet_10th_rename, blank=True)
    marksheet_12th = models.FileField(upload_to=utils.marksheet_12th_rename, blank=True)
    aadhar = models.FileField(upload_to=utils.aadhar_rename, blank=True)
    pancard = models.FileField(upload_to=utils.pancard_rename, blank=True)

    # To track IP address and other information of users
    ip_address = models. GenericIPAddressField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):         
        return (self.name)

    def photograph_preview(self):   #for previewing photo in admin panel
        return mark_safe(f'<img src = "{self.passport_photograph.url}" width = "100"/>')

    class Meta:
        verbose_name_plural = "Personal Details"    
        db_table = "student_personal_details"             
