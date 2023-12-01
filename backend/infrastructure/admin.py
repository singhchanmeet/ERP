from django.contrib import admin
from . models import InfrastructureCategories, InfrastructureForm


class InfrastructureFormAdmin(admin.ModelAdmin):
    list_display = ['item_id', 'item_type', 'status'] 
    list_filter = ['status'] 

class InfrastructureCategoriesAdmin(admin.ModelAdmin):
    list_display = ['form_field', 'dropdown_value']

admin.site.register(InfrastructureForm, InfrastructureFormAdmin)
admin.site.register(InfrastructureCategories, InfrastructureCategoriesAdmin)