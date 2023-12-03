from django.contrib import admin
from . models import Batches


class BatchesAdmin(admin.ModelAdmin):
    list_display = ['batch' ]
 


admin.site.register(Batches, BatchesAdmin)
 