from django.urls import path
from .views import students, ms_azure

urlpatterns = [
    path('index', ms_azure.index, name='index'),     # ms azure will redirect to /index after successful sign in/out
    path('student/register/', students.StudentRegister.as_view(), name='student_register'),
    path('student/login/', students.StudentLogin.as_view(), name='student_login'),
    path('student/logout/', students.StudentLogout.as_view(), name='student_logout'),
    # path('employee/register/', employees.EmployeeRegister.as_view(), name='employee_register'),
    # path('employee/login/', employees.EmployeeLogin.as_view(), name='employee_login'),
    # path('employee/logout/', employees.EmployeeLogout.as_view(), name='employee_logout'),
]