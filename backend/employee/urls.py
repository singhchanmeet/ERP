from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.EmployeeRegister.as_view(), name='employee_register'),
    path('login/', views.EmployeeLogin.as_view(), name='employee_login'),
    # path('personal-details/', views.EmployeeDetailsView.as_view(), name='employee_details'),
]