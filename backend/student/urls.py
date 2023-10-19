from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.StudentRegister.as_view(), name='student_register'),
    path('login/', views.StudentLogin.as_view(), name='student_login'),
    path('personal-details/', views.StudentDetailsView.as_view(), name='student_details'),
]