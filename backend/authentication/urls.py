from django.urls import path,include
from . import views

from rest_framework import routers
from rest_framework_simplejwt.views import TokenRefreshView

# router=routers.DefaultRouter()
# router.register(r'account_details', accountsviewsets, basename='accounts')

urlpatterns = [
    path('index/', views.handle_ms_login, name='index'),     # ms azure will redirect to /index after successful sign in/out
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),     
    path('user-details/', views.UserDetails.as_view(), name='user_details'),
    path('accounts/',views.accounts.as_view()),
]