from django.contrib import admin
from . models import Fees
from import_export.admin import ExportActionMixin

class FeesAdmin(ExportActionMixin, admin.ModelAdmin):
    list_display = ['batch', 'total_fee']

admin.site.register(Fees, FeesAdmin)