#  convert django model to json (serialization)
#  convert json in model (Deserialization)

from .models import *
from rest_framework import serializers
class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

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


class CartOrderSerializers(serializers.ModelSerializer):
    food=FoodSerializers()
    class Meta:
        model = Order
        fields = ['id','food','quantity']

class MyorderSerializer(serializers.ModelSerializer):
    order_final_status=serializers.SerializerMethodField()
    class Meta:
        model=OrderAddress
        fields=['id','order_number','address','order_time','order_final_status']
    def get_order_final_status(self,obj):
        return obj.order_final_status or "Waiting For Restuarent Confirmation"


class OrderSerializers(serializers.ModelSerializer):
    food=FoodSerializers()
    class Meta:
        model = Order
        fields = ['id','food','quantity']

class OrderAddressSerializer(serializers.ModelSerializer):
    payment_mode=serializers.SerializerMethodField()
    class Meta:
        model = OrderAddress
        fields=['id','order_number','address','order_time','order_final_status','payment_mode']

    def get_payment_mode(self,obj):
        try:
            payment=PaymentDetails.objects.get(order_number=obj.order_number)
            return payment.payment_mode
        except Exception as e:
            return None
