from django import forms
from .models import COLOR_CHOICES

class DesignForm(forms.Form):
    body = forms.ChoiceField(choices=COLOR_CHOICES, label="body", initial='', widget=forms.Select(), required=True)
    sleeve = forms.ChoiceField(choices=COLOR_CHOICES, label="sleeve", initial='', widget=forms.Select(), required=True)

class LoginForm(forms.Form):
    username = forms.CharField(label="username", max_length=30, required=True)
    password = forms.CharField(label="password", max_length=30, required=True)
