from django.shortcuts import render
from django.views.generic.base import TemplateView

class index(TemplateView):
    template_name = 'main/index.html'

class login(TemplateView):
    template_name = 'main/index.html'

class join(TemplateView):
    template_name = 'main/index.html'

class mypage(TemplateView):
    template_name = 'main/index.html'

class feed(TemplateView):
    template_name = 'main/index.html'

class detail(TemplateView):
    template_name = 'main/index.html'
    