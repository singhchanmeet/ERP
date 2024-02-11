from django.urls import path
from . import views

import environ
# Initialise environment variables
env = environ.Env()
environ.Env.read_env()

urlpatterns = [
    path('display/', views.FeesDisplay.as_view(), name='fees_display'),
    path(f'{env("ORDER_CREATION_ENDPOINT")}/', views.create_billdesk_order, name=f'{env("ORDER_CREATION_ENDPOINT")}'),
]


"""
To make these urls work, just prefix them with '/fee'
"""