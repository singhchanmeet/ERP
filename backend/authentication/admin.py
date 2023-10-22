from django.contrib import admin

from .models import User

class UserAdmin(admin.ModelAdmin):
    list_display = ['user_id', 'name', 'role']



admin.site.register(User, UserAdmin)


admin.site.site_header = "MAIT - ERP"
admin.site.index_title = "MAIT - ERP"
admin.site.site_title = "Admin"