#https://docs.djangoproject.com/en/2.2/topics/class-based-views/generic-editing/ 이거보고 수정
from django.shortcuts import render
from django.views.generic.base import TemplateView
from django.views.generic import View, ListView, DetailView
from django.http import HttpResponseRedirect, HttpResponse
from .forms import DesignForm
from main.models import Design, GwajamUser, Group

class index(TemplateView):
    template_name = 'main/index.html'

    def post(self, request):
        form = DesignForm(request.POST)
        if form.is_valid():
            design = Design()
            design.user = GwajamUser.objects.get(pk=self.request.session['username'])
            design.group = Group.objects.get(pk=self.request.session['group'])
            design.detail_body = form.cleaned_data['body']
            design.detail_sleeve = form.cleaned_data['sleeve']
            design.save()
        return HttpResponseRedirect('/community/'+str(self.request.session['group']))

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        
        if 'is_loggedin' not in self.request.session:
            
            self.request.session['is_loggedin'] = False
        context['is_loggedin'] = self.request.session['is_loggedin']
        
        if self.request.session['is_loggedin']:
            context['username'] = str(GwajamUser.objects.get(pk=self.request.session['username']))
        
        context['form'] = DesignForm()
        return context

class login(View):
    def get(self, request):
        self.request.session['username'] = 1
        self.request.session['group'] = 1 
        self.request.session['is_loggedin'] = True
        return HttpResponseRedirect('/')
    

class logout(TemplateView):
    def get(self, request):
        self.request.session.flush()
        self.request.session['is_loggedin'] = False
        return HttpResponseRedirect('/')

class join(View):
    def get(self, request):
        return HttpResponse('Not Ready Yet')

class mypage(View):
    def get(self, request):
        return HttpResponse('Not Ready Yet')

class feed(ListView):
    template_name = 'main/feed.html'
    context_object_name = 'Design Feed'
    def get_queryset(self):
        return Design.objects.filter(group__id=self.request.session['group'])

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
 
        context['is_loggedin'] = self.request.session['is_loggedin']
        context['username'] = str(GwajamUser.objects.get(pk=self.request.session['username']))
        
        return context


class detail(View):
    def get(self, request):
        return HttpResponse('Not Ready Yet')
    