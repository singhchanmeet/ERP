from django.urls import path
from . import views
from . import admin_utils

urlpatterns = [
    path('register/', views.StudentRegister.as_view(), name='student_register'),
    path('login/', views.StudentLogin.as_view(), name='student_login'),
    path('personal-details/', views.StudentDetailsView.as_view(), name='student_details'),
    path('allot-groups/', admin_utils.allot_group_to_students, name='allot_groups'),
    path('handle-allot-groups/', admin_utils.handle_group_allotment, name='handle_group_allotment'),
]