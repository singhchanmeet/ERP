from django.apps import AppConfig


class FeesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'fees'



"""

This is the old fees app which works independetly from ERP
Just prefix this apps urls with '/fee' to make it work

"""