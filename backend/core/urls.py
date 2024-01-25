from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static

from ms_identity_web.django.msal_views_and_urls import MsalViews
from . import settings

# For MS Teams authentication
msal_urls = MsalViews(settings.MS_IDENTITY_WEB).url_patterns()

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('authentication.urls')),   
    path(f'{settings.AAD_CONFIG.django.auth_endpoints.prefix}/', include(msal_urls)),    # for ms teams authentication   
    path('student/', include('student.urls')),
    path('employee/', include('employee.urls')),
    path('infra/', include('infrastructure.urls')),
    path('fee/', include('fees.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static('serve-static', document_root='serve-static')   #for serving static files (like admin panel css) and media files (uploaded by user)
