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

class OrderSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderAddress
        fields=['id','order_number','address','order_time']

class OrderDetailSerializer(serializers.ModelSerializer):
    user_full_name=serializers.CharField(source='user.full_name')
    user_email=serializers.EmailField(source='user.email')
    user_mobile=serializers.CharField(source='user.mobile')
    class Meta:
        model = OrderAddress
        fields=['id','order_number','address','order_time','order_final_status'
                ,'user_full_name','user_email','user_mobile']


class OrderFoodSerializer(serializers.ModelSerializer):
    item_name=serializers.CharField(source='food.item_name')
    item_price=serializers.DecimalField(source='food.item_price',max_digits=10,decimal_places=2)
    image=serializers.ImageField(source='food.image')
    class Meta:
        model = Order
        fields=['item_name','item_price','image']

class FoodTrackingSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodTracker
        fields=['remark','status','order_cancelled_by_user','status_date']