from rest_framework import serializers
from .models import Placements, Announcement

class PlacementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Placements
        fields = '__all__'

# class PastPlacementSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = PastPlacements
#         fields = '__all__'

# class ActivePlacementSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ActivePlacements
#         fields = '__all__'

class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = '__all__'

# class PlacementOfficerSerializer(serializers.ModelSerializer):
#     model = Announcement
#     fields = '__all__'
