"""core URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from ms_identity_web.django.msal_views_and_urls import MsalViews
from . import settings

# For MS Teams authentication
msal_urls = MsalViews(settings.MS_IDENTITY_WEB).url_patterns()

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('AuthPortal.urls')),
    path('authenticate/', include('AuthPortal.urls')),   # for non ms teams authentication
    path(f'{settings.AAD_CONFIG.django.auth_endpoints.prefix}/', include(msal_urls)),    # for ms teams authentication
    # path('student/', include('Student.urls')),
    # path('employee/', include('Employee.urls')),
]
