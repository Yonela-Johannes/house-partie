from rest_framework import serializers
from .models import Room

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'sess_key', 'code', 'host', 'guest_can_pause', 'maximum_guests', 'votes_to_skip', 'created_at']

class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['host', 'maximum_guests','votes_to_skip','guest_can_pause']
