from django.conf.urls import url, include
from django.urls import path

from rest_framework.urlpatterns import format_suffix_patterns
from homepage import views
from django.conf import settings
from django.conf.urls.static import static

app_name = 'gwajams'
urlpatterns = [
    url(r'^auth/$', views.AuthList.as_view()),
    url(r'^users/$', views.user_list),
    url(r'^users/(?P<username>\w+)/$', views.user_detail),
    
    url(r'^profile/$',views.profile_list),
    url(r'^users/(?P<username>\w+)/profile/$',views.profile),
    
    path('groupdetail/<int:group_id>/', views.group_detail, name='group_detail'),
    url(r'^create_group/$', views.create_group, name='create_group'),
    url(r'', views.main, name='main'),
    # url(r'login/', views.login.as_view(), name='login'),
    # url(r'logout/', views.logout.as_view(), name='logout'),
    # url(r'join/', views.join.as_view(), name='join'),
    # url(r'mypage/', views.mypage.as_view(), name='mypage'),
    ]

urlpatterns = format_suffix_patterns(urlpatterns)
urlpatterns += [
    url(r'^api-auth/', include('rest_framework.urls', namespace = 'rest_framework')),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
