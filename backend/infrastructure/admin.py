from django.contrib import admin
from . models import InfrastructureForm, Institutes, Departments, Rooms, RoomCategories, ItemTypes, InstituteDepartments, DepartmentRooms
from import_export.admin import ExportActionMixin

class InfrastructureFormAdmin(ExportActionMixin, admin.ModelAdmin):
    list_display = ['item_id', 'item_type', 'status'] 
    list_filter = ['status'] 

class InstitutesAdmin(admin.ModelAdmin):
    list_display = ['institute']

class DepartmentsAdmin(admin.ModelAdmin):
    list_display = ['department']

class RoomsAdmin(admin.ModelAdmin):
    list_display = ['room_number']

class RoomCategoriesAdmin(admin.ModelAdmin):
    list_display = ['room_category']

class ItemTypesAdmin(admin.ModelAdmin):
    list_display = ['item_type']

class InstituteDepartmentsAdmin(admin.ModelAdmin):
    list_display = ['institute', 'department']

class DepartmentRoomsAdmin(admin.ModelAdmin):
    list_display = ['department', 'room_number']


admin.site.register(InfrastructureForm, InfrastructureFormAdmin)
admin.site.register(Institutes, InstitutesAdmin)
admin.site.register(Departments, DepartmentsAdmin)
admin.site.register(Rooms, RoomsAdmin)
admin.site.register(RoomCategories, RoomCategoriesAdmin)
admin.site.register(ItemTypes, ItemTypesAdmin)
admin.site.register(InstituteDepartments, InstituteDepartmentsAdmin)
admin.site.register(DepartmentRooms, DepartmentRoomsAdmin)
