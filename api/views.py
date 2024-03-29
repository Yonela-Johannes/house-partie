from django.shortcuts import render
from rest_framework import generics, status
from .serializers import RoomSerializer, CreateRoomSerializer
from .models import Room
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class GetRoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'code'

    def get(self, request, format=None):
        code = request.GET.get(self.lookup_url_kwarg)
        if code != None:
            room = Room.objects.filter(code=code)
            if len(room) > 0:
                data = RoomSerializer(room[0]).data
                data['is_host'] = self.request.session.session_key = room[0].sess_key
                return Response(data, status=status.HTTP_200_OK)
            return Response('Room Not Round', 'Invalid Room Code.', status=status.HTTP_404_NOT_FOUND)
        return Response("Bad Request", 'Code param not found in request', status=status.HTTP_400_BAD_REQUEST)
        
class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def post (self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        print(serializer)
        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            maximum_guests = serializer.data.get('maximum_guests')
            host = serializer.data.get('host')
            sess_key = self.request.session.session_key
            # queryset = Room.objects.filter(host=host)
            # if queryset.exist():
            #     room = queryset[0]
            # room.guest_can_pause = guest_can_pause
            # room.votes_to_skip = votes_to_skip
            # room.host = host
            # room.maximum_guests = maximum_guests
            # room.save(update_fields=['guest_can_pause', 'votes_to_skip', 'maximum_guests'])
            # return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
            # else:
            room = Room(sess_key=sess_key, host=host, guest_can_pause=guest_can_pause, votes_to_skip=votes_to_skip, maximum_guests=maximum_guests)
            room.save()
            return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
            
        return Response({'Bad Request', serializer}, status=status.HTTP_400_BAD_REQUEST)