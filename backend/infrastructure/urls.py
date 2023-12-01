from django.urls import path
from . import views


urlpatterns = [    
    path('submit-form/', views.InfrastructureFormView.as_view(), name='submit_infra_form'),
    path('dropdown-data/', views.InfrastructureCategoriesView.as_view(), name='infra_dropdown_data'),
]