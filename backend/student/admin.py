from django.contrib import admin

from . models import Student, StudentDetails, StudentGroups

class StudentAdmin(admin.ModelAdmin):
    list_display = ['student_id', 'name', 'email']

class StudentDetailsAdmin(admin.ModelAdmin):
    list_display = ['enrollment_number', 'name', 'email']

class StudentGroupsAdmin(admin.ModelAdmin):
    list_display = ['group_name', 'student_id', 'student_name']



admin.site.register(Student, StudentAdmin)
admin.site.register(StudentDetails, StudentDetailsAdmin)
admin.site.register(StudentGroups, StudentGroupsAdmin)

