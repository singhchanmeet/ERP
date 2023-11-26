from django.contrib import admin

from . models import User
from django.contrib.auth.models import Group

class UserAdmin(admin.ModelAdmin):
    list_display = ['user_id', 'name', 'role']



admin.site.register(User, UserAdmin)

admin.site.unregister(Group)


admin.site.site_header = "MAIT - ERP"
admin.site.index_title = "MAIT - ERP"
admin.site.site_title = "Admin"