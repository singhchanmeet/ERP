from django.contrib import admin
from . models import Branches


class BranchesAdmin(admin.ModelAdmin):
    list_display = ['branch' ]
 


admin.site.register(Branches, BranchesAdmin)
 