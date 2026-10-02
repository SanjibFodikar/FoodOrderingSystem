#  convert django model to json (serialization)
#  convert json in model (Deserialization)

from .models import *
from rest_framework import serializers

class CategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'  

class FoodSerializers(serializers.ModelSerializer):
    category_name=serializers.CharField(source="category.category_name",read_only=True)
    image=serializers.ImageField(required=False)
    is_available=serializers.BooleanField(required=False,default=True)
    class Meta:
        model=Food
        fields=['id','category','category_name','item_name','item_price','item_description','item_quantity','image','is_available']
