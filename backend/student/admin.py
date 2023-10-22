from django.contrib import admin

from .models import Student, StudentDetails

class StudentAdmin(admin.ModelAdmin):
    list_display = ['student_id', 'name', 'email']

class StudentDetailsAdmin(admin.ModelAdmin):
    list_display = ['enrollment_number', 'name', 'email']



admin.site.register(Student, StudentAdmin)
admin.site.register(StudentDetails, StudentDetailsAdmin)

