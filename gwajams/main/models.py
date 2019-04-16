from django.db import models
from django.contrib.auth.models import User

class Group(models.Model):
    group_type = models.CharField(max_length=50)
    group_name = models.CharField(max_length=50)

    def __str__(self):
        return self.group_name

class User(models.Model):
    username = models.OneToOneField(User, on_delete=models.CASCADE)
    groups = models.ManyToManyField('Group')

    def __str__(self):
        return str(self.username)

class Design(models.Model):
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
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
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
        return str(self.group)+'_'+str(self.user)+"_"+str(self.id)
