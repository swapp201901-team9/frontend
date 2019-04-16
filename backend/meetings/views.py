from rest_framework import generics, permissions
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from meetings.models import Meeting
from meetings.serializers import MeetingSerializer, UserSerializer
from meetings.permissions import IsOwner
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import login
from rest_framework.decorators import api_view
import json

class MeetingList(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class MeetingDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (
            permissions.IsAuthenticatedOrReadOnly,
            IsOwner
            )
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer

class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveAPIView):
    permission_classes = (IsOwner,)
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = User.objects.all()
    serializer_class = UserSerializer

@api_view(['GET'])
def test(request):
    print(request.user)
    return HttpResponse(status=200)

@csrf_exempt
def login_user(request):
    body = json.loads(request.body)
    username = body['username']
    pwd = body['password']

    try:
        user = User.objects.get(username=username)

        if not user.check_password(pwd):
            return HttpResponse(status=404)

        login(request, user)
        token, _ = Token.objects.get_or_create(user=user)

        return JsonResponse({'token': token.key, 'user': user.id})
    except Exception as e:
        return HttpResponse(status=404)
