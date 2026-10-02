from django.shortcuts import render
from .models import *
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view,parser_classes
from rest_framework.response import Response
from .serializers import *

# Create your views here.

@api_view(['POST'])
def admin_login_api(request):
    username=request.data.get('Username')
    password=request.data.get('Password')
    user=authenticate(username=username,password=password)
    if user and user.is_staff:
        return Response({
            'message':'login successfully',
            'username':username
            },status=200)
    return Response({
        'message':'user not found ! try again'
    },status=400)

@api_view(['POST'])
def add_category(request):
    try:
        category=request.data
        Category.objects.create(
            category_name=category
        )
        return Response({
            'message':'Category Created Successfully'
        },status=201)
    except Exception as e:
        return Response({
            'message':'Something Went Wrong ! Please Try Again'
        },status=401)

@api_view(['GET'])
def category_list(request):
    categories=Category.objects.all()
    serializer=CategorySerializers(categories,many=True)
    return Response(serializer.data)


from rest_framework.parsers import MultiPartParser,FormParser

@api_view(['POST'])
@parser_classes([MultiPartParser,FormParser])
def add_food_item(request):
    serializer=FoodSerializers(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'message':"Food Item Created Successfully"
        },status=201)

    print(serializer.errors)
    return Response({
        'message':"Something Went Wrong",
        'errors': serializer.errors
    },status=401)


@api_view(['GET'])
def Foods_list(request):
    foods=Food.objects.all()
    serializer=FoodSerializers(foods,many=True)
    print(serializer)
    return Response(serializer.data)

@api_view(['GET'])
def Foods_search(request):
    query=request.GET.get('q')
    foods=Food.objects.filter(item_name__icontains=query)
    serializer=FoodSerializers(foods,many=True)
    return Response(serializer.data)

import random
@api_view(['GET'])
def Foods_random(request):
    foods=list(Food.objects.all())
    random.shuffle(foods)
    random_food = foods[0:9]
    serializer=FoodSerializers(random_food,many=True)
    return Response(serializer.data)