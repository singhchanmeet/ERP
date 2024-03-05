from django.urls import path
from . import views

import environ
# Initialise environment variables
env = environ.Env()
environ.Env.read_env()

urlpatterns = [
    path('display/', views.FeesDisplay.as_view(), name='fees_display'),
    path('split-payment/', views.SplitPaymentView.as_view(), name='split_payment'),
    path(f'{env("ORDER_CREATION_ENDPOINT")}/', views.create_billdesk_order, name=f'{env("ORDER_CREATION_ENDPOINT")}'),
    path(f'{env("S2S_RESPONSE_ENDPOINT")}/', views.billdesk_order_callback, name=f'{env("S2S_RESPONSE_ENDPOINT")}'),
]


