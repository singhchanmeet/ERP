from django.contrib import admin

from . models import Groups

class GroupsAdmin(admin.ModelAdmin):
    list_display = ['group_name' ]

admin.site.register(Groups, GroupsAdmin)