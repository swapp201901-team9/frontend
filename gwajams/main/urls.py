from django.urls import path
from . import views

app_name = 'main'
urlpatterns = [
    path('', views.index.as_view(), name='index'),
    path('member/login/', views.login.as_view(), name='login'),
    path('member/join/', views.join.as_view(), name='join'),
    path('member/mypage/', views.mypage.as_view(), name='mypage'),
    path('community/<int:group_id>/', views.feed.as_view(), name='feed'),
    path('community/<int:group_id>/<int:design_id>/', views.detail.as_view(), name='detail')
]