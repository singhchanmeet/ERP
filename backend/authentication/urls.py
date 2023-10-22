from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('index/', views.index, name='index'),     # ms azure will redirect to /index after successful sign in/out
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),     
    path('user-details/', views.UserDetails.as_view(), name='user_details'),
]