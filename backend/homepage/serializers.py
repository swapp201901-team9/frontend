from rest_framework import serializers
from django.contrib.auth.models import User
from homepage.models import *
from django.db.models import Sum, Q
import base64
from django.conf import settings

class UserSerializer(serializers.ModelSerializer):
    '''
    def create(self, validated_data):
        profile_data = validated_data.pop('profile', None)
        user = super(UserSerializer, self).create(validated_data)
        self.update_or_create_profile(user, profile_data)
        return user
    '''
    def update(self, instance, validated_data):
        instance.set_password(validated_data['password'])
        instance.save()
        return instance
    '''
    def update_or_create_profile(self, user, profile_data):
        Profile.objects.update_or_create(user=user, defaults=profile_data)
    '''
    class Meta:
        model = User
        #article
        fields = ('id','username','password')



class ProfileSerializer(serializers.ModelSerializer):
    user= serializers.ReadOnlyField(source='user.username')
    domain = serializers.SerializerMethodField()
    def get_domain(self, obj):
        return 'http://'+self.context['domain']+obj.myimage.url
    class Meta:
        model = Profile
        fields = ('user','myname','mybelong','myintro', 'myimage', 'domain')

class GroupSerializer(serializers.ModelSerializer):
    domain = serializers.SerializerMethodField()
    def get_domain(self, obj):
        return 'groupdetail/'+str(obj.id)+'/'
    class Meta:
        model = Group
        fields = ('group_type','group_name','domain')

class UserDesignSerializer(serializers.ModelSerializer):
    '''
    def create(self, validated_data):
        profile_data = validated_data.pop('profile', None)
        user = super(UserSerializer, self).create(validated_data)
        self.update_or_create_profile(user, profile_data)
        return user
    '''
    '''
    def update(self, instance, validated_data):
        instance.set_password(validated_data['password'])
        instance.save()
        return instance
    '''
    '''
    def update_or_create_profile(self, user, profile_data):
        Profile.objects.update_or_create(user=user, defaults=profile_data)
    '''
    class Meta:
        model = Design
        fields = '__all__'

class GroupDesignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Design
        fields = '__all__'