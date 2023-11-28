from django.contrib import admin

from . models import Student, StudentDetails
from . admin_utils import allot_group_to_students

class StudentAdmin(admin.ModelAdmin):
    list_display = ['student_id', 'name', 'email']

    actions = [allot_group_to_students,]


class StudentDetailsAdmin(admin.ModelAdmin):
    list_display = ['enrollment_number', 'name', 'email']


admin.site.register(Student, StudentAdmin)
admin.site.register(StudentDetails, StudentDetailsAdmin)


