from rest_framework import serializers
from meetings.models import Meeting
from django.contrib.auth.models import User


class MeetingSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.id')

    class Meta:
        model = Meeting
        fields = ('id', 'created', 'sinceWhen', 'tilWhen', 'user')

    def validate(self, data):
        # 'sinceWhen' should be earlier than 'tilWhen'
        if data.get('sinceWhen') >= data.get('tilWhen'):
            raise serializers.ValidationError("Invalid meeting hour")

        # a new reservation should not overlap existing reservations
        for m in Meeting.objects.all():
            # an updating reservation may overlap the original one
            if (self.instance and self.instance.id == m.id):
                continue
            if (data.get('tilWhen') <= m.sinceWhen or
                m.tilWhen <= data.get('sinceWhen')):
                continue
            raise serializers.ValidationError("Already reserved")

        return data

class UserSerializer(serializers.ModelSerializer):
    meetings = serializers.PrimaryKeyRelatedField(many=True, queryset=Meeting.objects.all())

    class Meta:
        model = User
        fields = ('id', 'username', 'meetings')
