from django.urls import path
from . import views


urlpatterns = [
    path('index/', views.handle_ms_login, name='index'),     # ms azure will redirect to /index after successful sign in/out   
    path('user-details/', views.UserDetails.as_view(), name='user_details'),
]