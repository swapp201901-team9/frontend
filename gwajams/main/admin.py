from django.contrib import admin
from main.models import Design, GwajamUser, Group

admin.site.register(Group)
admin.site.register(GwajamUser)
admin.site.register(Design)