# from rest_framework import serializers
# from .models import Placements, Announcement

# class PlacementSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Placements
#         fields = '__all__'

# # class PastPlacementSerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model = PastPlacements
# #         fields = '__all__'

# # class ActivePlacementSerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model = ActivePlacements
# #         fields = '__all__'

# class AnnouncementSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Announcement
#         fields = '__all__'

# # class PlacementOfficerSerializer(serializers.ModelSerializer):
# #     model = Announcement
# #     fields = '__all__'
from rest_framework import serializers
from .models import Placements, Announcement
from .models import get_current_date

class PlacementSerializer(serializers.ModelSerializer):
    date = serializers.DateField(default=get_current_date)  # Use get_current_date function

    class Meta:
        model = Placements
        fields = '__all__'

class AnnouncementSerializer(serializers.ModelSerializer):
    date = serializers.DateField(default=get_current_date)  # Use get_current_date function

    class Meta:
        model = Announcement
        fields = '__all__'
