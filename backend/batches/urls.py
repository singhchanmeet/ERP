from django.urls import path
from . import views


urlpatterns = [
    path('get-all/', views.GetAllBatches.as_view())
]
