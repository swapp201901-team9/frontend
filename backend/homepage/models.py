from django.db import models
from django.db.models import signals
from django.contrib.auth.models import User
import base64

BLACK = 'BK'
BEIGE = 'BG'
BLUE = 'BL'
IVORY = 'IV'
PINK = 'PK'
RED = 'RD'
WHITE = 'WT'
COLOR_CHOICES = (
    (BLACK, 'Black'),
    (BEIGE, 'Beige'),
    (BLUE, 'Blue'),
    (IVORY, 'Ivory'),
    (PINK, 'Pink'),
    (RED, 'Red'),
    (WHITE, 'White'),
)

class Group(models.Model):
    group_type = models.CharField(max_length=50)
    group_name = models.CharField(max_length=50)

    def __str__(self):
        return self.group_name

class Profile(models.Model):
    user = models.OneToOneField('auth.User', on_delete=models.CASCADE,primary_key=True)
    groups = models.ManyToManyField('Group')

    def __str__(self):
        return str(self.user)

class Design(models.Model):
    owner = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    likes = models.IntegerField(default=0)
    detail_body = models.CharField(
        max_length=2,
        choices=COLOR_CHOICES,
        default=BLACK,
    )
    detail_sleeve = models.CharField(
        max_length=2,
        choices=COLOR_CHOICES,
        default=WHITE,
    )

    def __str__(self):
        return str(self.group)+'_'+str(self.owner)+"_"+str(self.id)

# 클래스 밖에 정의된 함수입니다 
def create_profile(sender, instance, created, **kwargs):
    #create Profile for every new User model
    if created:
        Profile.objects.create(user=instance)
signals.post_save.connect(create_profile, sender='auth.User', weak=False)
#, dispatch_uid='models.create_profile'
