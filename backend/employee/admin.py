from django.contrib import admin

from .models import Employee, EmployeeDetails

class EmployeeAdmin(admin.ModelAdmin):
    list_display = ['employee_id', 'name', 'email']

class EmployeeDetailsAdmin(admin.ModelAdmin):
    list_display = ['employee_id', 'name', 'designation']



admin.site.register(Employee, EmployeeAdmin)
admin.site.register(EmployeeDetails, EmployeeDetailsAdmin)

