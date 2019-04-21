from django.conf.urls import url, include

from rest_framework.urlpatterns import format_suffix_patterns
from homepage import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    url(r'^auth/$', views.AuthList.as_view()),
    url(r'^users/$', views.user_list),
    url(r'^users/(?P<username>\w+)/$', views.user_detail),
    
    url(r'^profile/$',views.profile_list),
    url(r'^users/(?P<username>\w+)/profile/$',views.profile),
    
    
    ]

urlpatterns = format_suffix_patterns(urlpatterns)
urlpatterns += [
    url(r'^api-auth/', include('rest_framework.urls', namespace = 'rest_framework')),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
