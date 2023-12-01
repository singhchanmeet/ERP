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
class InfrastructureCategories(models.Model):

    class FormField(models.TextChoices):
        INSTITUTE = "institute", "institute"
        DEPARTMENT = "department", "department"
        ROOM_CATEGORY = "room_category", "room_category"
        ITEM_TYPE = "item_type", "item_type"

    form_field = models.CharField(max_length=15, choices=FormField.choices)    # the corresponding field of form
    dropdown_value = models.CharField(max_length=25)    # the dropdown values for that field
    
    class Meta:
        db_table = 'infrastructure_categories'  
        verbose_name_plural = "Dropdown values for Infrastructure Form"
    