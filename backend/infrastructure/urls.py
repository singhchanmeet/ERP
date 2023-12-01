from django.urls import path
from . import views


urlpatterns = [    
    path('submit-form/', views.InfrastructureFormView.as_view(), name='submit_infra_form'),
]