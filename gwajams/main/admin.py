from django.contrib import admin
from main.models import Design, User, Group

admin.site.register(Group)
admin.site.register(User)
admin.site.register(Design)