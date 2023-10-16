from django.urls import path
from . import views

urlpatterns = [
    path('index/', views.index, name='index'),     # ms azure will redirect to /index after successful sign in/out
    path('user-details/', views.UserDetails.as_view(), name='user_details'),
]