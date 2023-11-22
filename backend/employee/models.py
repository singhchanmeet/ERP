from django.db import models
from authentication.models import User
from django.utils.html import mark_safe
from . import utils

class Employee(models.Model):

    employee_id = models.OneToOneField(User, on_delete=models.CASCADE) #Foreign Key
    name = models.CharField(max_length=75)
    email = models.EmailField(max_length=50)
    contact_number = models.CharField(max_length=15, blank=True)
    ip_address = models. GenericIPAddressField(blank=True, null=True)
    date_joined = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name 
    
    class Meta:
        db_table = 'employees'  
        verbose_name_plural = "Employees"



# Model for all personal details of employee 
class EmployeeDetails(models.Model):

    # first arguement is stored in database, second is its human readable form that will be displayed in dropdowns
    class Gender(models.TextChoices):
        MALE = "MALE" , 'Male'
        FEMALE = "FEMALE" , 'Female'
        OTHERS = "OTHERS" , 'Others'

    class Designation(models.TextChoices):
        ACCOUNTANT = 'Accountant', 'ACCOUNTANT'
        ADMISSION_COUNSELLOR = 'Admission Counsellor', 'ADMISSION COUNSELLOR'
        ADMISSION_HEAD = 'Admission Head', 'ADMISSION HEAD'
        ASSISTANT = 'Assistant', 'ASSISTANT'
        ASSISTANT_ACCOUNTANT = 'Assistant Accountant', 'ASSISTANT ACCOUNTANT'
        ASSISTANT_HOSTEL_WARDEN = 'Assistant Hostel Warden', 'ASSISTANT HOSTEL WARDEN'
        ASSISTANT_LIBRARIAN = 'Assistant Librarian', 'ASSISTANT LIBRARIAN'
        ASSISTANT_NETWORK_ENGINEER = 'Assistant Network Engineer', 'ASSISTANT NETWORK ENGINEER'
        ASSISTANT_PROFESSOR = 'Assistant Professor', 'ASSISTANT PROFESSOR'
        ASSOCIATE_PROFESSOR = 'Associate Professor', 'ASSOCIATE PROFESSOR'
        ASSOCIATE_PROFESSOR_HOD = 'Associate Professor and HoD', 'ASSOCIATE PROFESSOR and HoD'
        ATTENDANT = 'Attendant', 'ATTENDANT'
        CHIEF_ACCOUNT_OFFICER = 'Chief Account Officer', 'CHIEF ACCOUNT OFFICER'
        CLERK = 'Clerk', 'CLERK'
        DAFTARI = 'Daftari', 'DAFTARI'
        DEAN = 'Dean', 'DEAN'
        DIRECTOR = 'Director', 'DIRECTOR'
        ELECTRICAL_ENGINEER = 'Electrical Engineer', 'ELECTRICAL ENGINEER'
        ELECTRICIAN = 'Electrician', 'ELECTRICIAN'
        ENGINEER = 'Engineer', 'ENGINEER'
        EXECUTIVE_ASSISTANT = 'Executive Assistant', 'EXECUTIVE ASSISTANT'
        HEAD_COOK = 'Head Cook', 'HEAD COOK'
        HELPER = 'Helper', 'HELPER'
        JOINT_REGISTRAR = 'Joint Registrar', 'JOINT REGISTRAR'
        LAB_ASSISTANT = 'Lab Assistant', 'LAB ASSISTANT'
        LAB_ATTENDANT = 'Lab Attendant', 'LAB ATTENDANT'
        LIBRARIAN = 'Librarian', 'LIBRARIAN'
        MALI = 'Mali', 'MALI'
        MANAGER_ADMISSIONS = 'Manager Admissions', 'MANAGER ADMISSIONS'
        NETWORK_ENGINEER = 'Network Engineer', 'NETWORK ENGINEER'
        PA = 'PA', 'PA'
        PEON = 'Peon', 'PEON'
        PLUMBER = 'Plumber', 'PLUMBER'
        PRO = 'Pro', 'PRO'
        PROFESSOR = 'Professor', 'PROFESSOR'
        PROFESSOR_HOD = 'Professor and HoD', 'PROFESSOR and HoD'
        PROGRAM_MANAGER = 'Program Manager', 'PROGRAM MANAGER'
        REGISTRAR = 'Registrar', 'REGISTRAR'
        SECURITY_GUARD = 'Security Guard', 'SECURITY GUARD'
        SENIOR_ENGINEER = 'Senior Engineer', 'SENIOR ENGINEER'
        SPORTS_INSTRUCTOR = 'Sports Instructor', 'SPORTS INSTRUCTOR'
        STORE_IN_CHARGE = 'Store In-Charge', 'STORE IN-CHARGE'
        TECHNICAL_OFFICER = 'Technical Officer', 'TECHNICAL OFFICER'
        WARDEN = 'Warden', 'WARDEN'
        WATERMAN = 'Waterman', 'WATERMAN'
        YOGA_INSTRUCTOR = 'Yoga Instructor', 'YOGA INSTRUCTOR'

    class Department(models.TextChoices):
        COMPUTER_SCIENCE_AND_ENGINEERING = 'Computer Science and Engineering', 'COMPUTER SCIENCE AND ENGINEERING'
        COMPUTER_SCIENCE_AND_ENGINEERING_AIML = 'Computer Science and Engineering (Artificial Intelligence and Machine Learning)', 'COMPUTER SCIENCE AND ENGINEERING (ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING)'
        COMPUTER_SCIENCE_AND_ENGINEERING_AI = 'Computer Science and Engineering (Artificial Intelligence)', 'COMPUTER SCIENCE AND ENGINEERING (ARTIFICIAL INTELLIGENCE)'
        COMPUTER_SCIENCE_AND_ENGINEERING_DS = 'Computer Science and Engineering (Data Science)', 'COMPUTER SCIENCE AND ENGINEERING (DATA SCIENCE)'
        INFORMATION_TECHNOLOGY = 'Information Technology', 'INFORMATION TECHNOLOGY'
        ELECTRONICS_AND_COMMUNICATION_ENGINEERING = 'Electronics and Communication Engineering', 'ELECTRONICS AND COMMUNICATION ENGINEERING'
        MECHANICAL_AND_AUTOMATION_ENGINEERING = 'Mechanical and Automation Engineering', 'MECHANICAL AND AUTOMATION ENGINEERING'
        APPLIED_SCIENCE = 'Applied Science', 'APPLIED SCIENCE'
        MECHANICAL_ENGINEERING = 'Mechanical Engineering', 'MECHANICAL ENGINEERING'
        ELECTRICAL_AND_ELECTRONICS_ENGINEERING = 'Electrical and Electronics Engineering', 'ELECTRICAL AND ELECTRONICS ENGINEERING'
        ARTIFICIAL_INTELLIGENCE_AND_MACHINE_LEARNING = 'Artificial Intelligence and Machine Learning', 'ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING'
        ARTIFICIAL_INTELLIGENCE_AND_DATA_SCIENCE = 'Artificial Intelligence and Data Science', 'ARTIFICIAL INTELLIGENCE AND DATA SCIENCE'
        INFORMATION_TECHNOLOGY_AND_ENGINEERING = 'Information Technology and Engineering', 'INFORMATION TECHNOLOGY AND ENGINEERING'
        COMPUTER_SCIENCE_AND_TECHNOLOGY = 'Computer Science and Technology', 'COMPUTER SCIENCE AND TECHNOLOGY'
        BACHELOR_OF_BUSINESS_ADMINISTRATION = 'Bachelor of Business Administration', 'BACHELOR OF BUSINESS ADMINISTRATION'
        MASTER_OF_BUSINESS_ADMINISTRATION = 'Master of Business Administration', 'MASTER OF BUSINESS ADMINISTRATION'
        ADMINISTRATION = 'Administration', 'ADMINISTRATION'

    class BloodGroup(models.TextChoices):
        A_POSITIVE = 'A+', 'A+'
        A_NEGATIVE = 'A-', 'A-'
        B_POSITIVE = 'B+', 'B+'
        B_NEGATIVE = 'B-', 'B-'
        AB_POSITIVE = 'AB+', 'AB+'
        AB_NEGATIVE = 'AB-', 'AB-'
        O_POSITIVE = 'O+', 'O+'
        O_NEGATIVE = 'O-', 'O-'


    # Employee ID
    employee_id = models.CharField(max_length=10, unique=True, db_index=True)   #db_index is for faster queries

    #employee details
    name = models.CharField(max_length=75, blank=True)
    dob = models.DateField(blank=True, null=True)
    full_address = models.CharField(max_length=150, blank=True)
    email = models.EmailField(max_length=50, blank=True, unique=False)
    mobile_number = models.CharField(max_length=10, blank=True)

    gender = models.CharField(max_length=6, choices=Gender.choices, blank=True)
    designation = models.CharField(max_length=27, choices=Designation.choices, blank=True)
    department = models.CharField(max_length=79, choices=Department.choices, blank=True)
    bloodgroup = models.CharField(max_length=3, choices=BloodGroup.choices, blank=True)

    emergency_name = models.CharField(max_length=75, blank=True)
    emergency_number = models.CharField(max_length=10, blank=True)

    #images and files
    passport_photograph = models.ImageField(upload_to=utils.passport_photograph_rename, blank=True, null=True)
    aadhar = models.FileField(upload_to=utils.aadhar_rename, blank=True, null=True)
    pancard = models.FileField(upload_to=utils.pancard_rename, blank=True, null=True)

    # To track IP address and other information of users
    ip_address = models. GenericIPAddressField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):         
        return (self.name)

    def photograph_preview(self):   #for previewing photo in admin panel
        return mark_safe(f'<img src = "{self.passport_photograph.url}" width = "100"/>')

    class Meta:
        verbose_name_plural = "Personal Details"    
        db_table = "employee_personal_details"             
