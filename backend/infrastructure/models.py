from django.db import models

# Create your models here.
class InfrastructureForm(models.Model):
    item_id = models.CharField(max_length=75, unique=True, db_index=True)
    institute = models.CharField(max_length=5)
    department = models.CharField(max_length=10)
    room_category = models.CharField(max_length=20)
    room_number = models.CharField(max_length=3)
    item_type = models.CharField(max_length=25)
    year_of_purchase = models.CharField(max_length=4)
    status = models.BooleanField(default=True)    #working/non-working

    
    def __str__(self):
        return self.item_id
    
    class Meta:
        db_table = 'infrastructure'  
        verbose_name_plural = "Infrastructure List"


# for admin to add/remove/update categories from admin panel and they can reflect in frontend
# class InfrastructureCategories(models.Model):

#     class FormField(models.TextChoices):
#         INSTITUTE = "institute", "institute"
#         DEPARTMENT = "department", "department"
#         ROOM_CATEGORY = "room_category", "room_category"
#         ITEM_TYPE = "item_type", "item_type"

#     form_field = models.CharField(max_length=15, choices=FormField.choices)    # the corresponding field of form
#     dropdown_value = models.CharField(max_length=25)    # the dropdown values for that field
    
#     class Meta:
#         db_table = 'infrastructure_categories'  
#         verbose_name_plural = "Dropdown values for Infrastructure Form"

# Table for all institutes (eg: MAIT, MAIMS etc)
class Institutes(models.Model):
    institute = models.CharField(max_length=8, primary_key=True, db_column='institute')

    def __str__(self):
        return self.institute

    class Meta:
        db_table = 'institutes'  
        verbose_name_plural = "1) Institutes"

# Table for all departments (eg: CSE, IT, BBA etc)
class Departments(models.Model):
    department = models.CharField(max_length=10, primary_key=True, db_column='department')

    def __str__(self):
        return self.department

    class Meta:
        db_table = 'departments'  
        verbose_name_plural = "2) Departments" 

# Table for all rooms (eg: 112, 333, 814 etc)
class Rooms(models.Model):
    room_number = models.CharField(max_length=4, primary_key=True, db_column='room_number')

    def __str__(self):
        return self.room_number

    class Meta:
        db_table = 'rooms'  
        verbose_name_plural = "3) Rooms"

# Table for all room categories (eg: HODroom, Lab, ServerRoom etc)
class RoomCategories(models.Model):
    room_category = models.CharField(max_length=20, primary_key=True, db_column='room_category')
    
    def __str__(self):
        return self.room_category

    class Meta:
        db_table = 'room_categories'  
        verbose_name_plural = "4) Room Categories"

# Table for all Item Types (eg: Computer, Printer, Raspberry Pi etc)
class ItemTypes(models.Model):
    item_type = models.CharField(max_length=25, primary_key=True, db_column='item_type')
 
    def __str__(self):
        return self.item_type

    class Meta:
        db_table = 'item_types'  
        verbose_name_plural = "5) Item Types"

# Table for the Institutes and the Departments under them (eg: MAIT-CSE, MAIT-IT, MAIMS-BBA)
class InstituteDepartments(models.Model):
    institute = models.ForeignKey(Institutes, max_length=8, on_delete=models.SET_NULL, null=True, db_column='institute')
    department = models.ForeignKey(Departments, max_length=10, on_delete=models.SET_NULL, null=True, db_column='department')

    
    class Meta:
        db_table = 'institute_and_departments'  
        verbose_name_plural = "6) Institite & Departments"

# Table for the Departments and the Rooms under them (eg: CSE-112, IT-414 etc)
class DepartmentRooms(models.Model):
    department = models.ForeignKey(Departments, max_length=10, on_delete=models.SET_NULL, null=True, db_column='department')
    room_number = models.ForeignKey(Rooms, max_length=4, on_delete=models.SET_NULL, null=True, db_column='room_number')
    
    class Meta:
        db_table = 'department_and_rooms'  
        verbose_name_plural = "7) Department & Rooms"

    