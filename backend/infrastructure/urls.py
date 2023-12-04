from django.urls import path
from . import views
from . import admin_utils

urlpatterns = [    
    path('submit-form/', views.InfrastructureFormView.as_view(), name='submit_infra_form'),
    path('dropdown-data/', views.DropdownValuesView.as_view(), name='infra_dropdown_data'),
    path('all-data/', views.InfrastructureAllRecords.as_view(), name='infra_all_data'),
    path('handle-excel/', admin_utils.ExcelUploadView.as_view(), name='handle_excel_upload'),
    path('add-rooms/', admin_utils.bulk_rooms_add, name='add_bulk_rooms'),
]