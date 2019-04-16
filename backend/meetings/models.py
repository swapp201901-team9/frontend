from django.db import models


class Meeting(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    sinceWhen = models.DateTimeField()
    tilWhen = models.DateTimeField()
    user = models.ForeignKey('auth.User', related_name='meetings', on_delete=models.CASCADE)

    class Meta:
        ordering = ('created',)
