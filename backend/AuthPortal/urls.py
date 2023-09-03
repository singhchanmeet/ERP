from django.urls import path
from .views import student_views, employee_views

urlpatterns = [
    path('student/register/', student_views.StudentRegister.as_view(), name='student_register'),
    path('student/login/', student_views.StudentLogin.as_view(), name='student_login'),
    path('student/logout/', student_views.StudentLogout.as_view(), name='student_logout'),
    # path('employee/register/', employee_views.EmployeeRegister.as_view(), name='employee_register'),
    # path('employee/login/', employee_views.EmployeeLogin.as_view(), name='employee_login'),
    # path('employee/logout/', employee_views.EmployeeLogout.as_view(), name='employee_logout'),
]