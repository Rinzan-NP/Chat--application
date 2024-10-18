from django.shortcuts import render
from rest_framework.views import APIView
# Create your views here.

class MessageApiView(APIView):
    def post(self, request, *args, **kwargs):
        pass