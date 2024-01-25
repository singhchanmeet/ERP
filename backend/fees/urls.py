from django.urls import path
from . import views


urlpatterns = [
    path('', views.fees_login, name='fees_login'),
    path('display/<int:batch>/', views.fees_display, name='fees_display'),
    path('create_billdesk_order/', views.create_billdesk_order, name='create_billdesk_order'),
    # path('billdesk_order_callback/', views.billdesk_order_callback, name='billdesk_order_callback'),
]