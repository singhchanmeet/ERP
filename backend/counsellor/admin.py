from django.contrib import admin

from . models import CounsellorGroups

class CounsellorGroupsAdmin(admin.ModelAdmin):
    list_display = ['group_name', 'counsellor_id', 'counsellor_name']

admin.site.register(CounsellorGroups, CounsellorGroupsAdmin)