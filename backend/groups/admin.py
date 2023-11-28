from django.contrib import admin
from . models import Groups, CounsellorGroups, StudentGroups


class GroupsAdmin(admin.ModelAdmin):
    list_display = ['group_name' ]

class CounsellorGroupsAdmin(admin.ModelAdmin):
    list_display = ['group_name', 'counsellor_id', 'counsellor_name']

class StudentGroupsAdmin(admin.ModelAdmin):
    list_display = ['group_name', 'student_id', 'student_name']


admin.site.register(Groups, GroupsAdmin)
admin.site.register(CounsellorGroups, CounsellorGroupsAdmin)
admin.site.register(StudentGroups, StudentGroupsAdmin)