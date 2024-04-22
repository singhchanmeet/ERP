from django.contrib import admin
from . models import Fees, StudentFees, SplitPayment, BilldeskOrders, BilldeskTransactions
from import_export.admin import ExportActionMixin
from . admin_utils import generate_fees_report


class SplitPaymentAdmin(ExportActionMixin, admin.ModelAdmin):
    list_display = ['student', 'application', 'allow_split_payment']
    list_editable = ['allow_split_payment']

class FeesAdmin(ExportActionMixin, admin.ModelAdmin):
    list_display = ['batch', 'total_fee']
    
class BilldeskOrdersAdmin(admin.ModelAdmin):
    list_display = ['order_id', 'bd_order_id', 'order_amount', 'order_time']
    
    # This will disbale add functionality
    def has_add_permission(self, request):
        return False
    
    # This will disable delete functionality
    def has_delete_permission(self, request, obj=None):
        return False
    
    # This will disable change functionality
    def has_change_permission(self, request, obj=None):
        return False
    
class BilldeskTransactionsAdmin(admin.ModelAdmin):
    list_display = ['order_id', 'transaction_id', 'transaction_amount', 'transaction_status', 'payment_method', 'transaction_time']
    
    # This will disbale add functionality
    def has_add_permission(self, request):
        return False
    
    # This will disable delete functionality
    def has_delete_permission(self, request, obj=None):
        return False
    
    # This will disable change functionality
    def has_change_permission(self, request, obj=None):
        return False

class StudentFeesAdmin(admin.ModelAdmin):
    list_display = ['enrollment_number', 'group', 'transaction_id', 'transaction_amount', 'transaction_status']
    list_filter = ['group', 'batch', 'branch']
    
    actions = [generate_fees_report,]

admin.site.register(Fees, FeesAdmin)
admin.site.register(StudentFees, StudentFeesAdmin)
admin.site.register(SplitPayment, SplitPaymentAdmin)
admin.site.register(BilldeskOrders, BilldeskOrdersAdmin)
admin.site.register(BilldeskTransactions, BilldeskTransactionsAdmin)

