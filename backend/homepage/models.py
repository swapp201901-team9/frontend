from django.db import models
from django.db.models import signals
from django.contrib.auth.models import User
import base64

class Profile(models.Model):
    user = models.OneToOneField('auth.User', on_delete=models.CASCADE,primary_key=True)
#    owner= models.ForeignKey('auth.User', on_delete=models.CASCADE)
    myname = models.TextField()
    mybelong = models.TextField()
    myintro = models.TextField()
    myimage = models.ImageField(upload_to='profiles/', default='default/defaultImage.jpg')

# 클래스 밖에 정의된 함수입니다 
def create_profile(sender, instance, created, **kwargs):
    #create Profile for every new User model
    if created:
        Profile.objects.create(user=instance)
signals.post_save.connect(create_profile, sender='auth.User', weak=False)
#, dispatch_uid='models.create_profile'



