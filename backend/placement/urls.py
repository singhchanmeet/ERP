from django.urls import path,include
from .views import *
from rest_framework.routers import DefaultRouter

import environ
# Initialise environment variables
env = environ.Env()
environ.Env.read_env()

router = DefaultRouter()

router.register('all-placements' , AllPlacementRecords , basename='placements'),
router.register('past-placements' , PastPlacementRecords , basename='pastplacements'),
router.register('active-placements', ActivePlacementRecords , basename='activeplacements'),
router.register('announcement',ViewAnnouncement, basename= 'announcements' )

urlpatterns = [
    path('',include(router.urls))
]