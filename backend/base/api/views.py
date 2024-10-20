from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework.exceptions import ParseError, AuthenticationFailed
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework import status
from .serializer import (
    UserRegisterSerializer,
    UserDetailsUpdateSerializer,
    UserSerializer,
    UpdateUserDetial
)
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from .serializer import MyTokenObtainPairSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.generics import UpdateAPIView

User = get_user_model()


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["GET"])
def getRoutes(request):
    routes = ["api/token", "api/token/refresh"]
    return Response(routes)


# LoginView
class LoginView(APIView):
    def post(self, request):
        try:
            email = request.data["email"]
            password = request.data["password"]

        except KeyError:
            raise ParseError("All Fields Are Required")

        if not User.objects.filter(email=email).exists():
            raise AuthenticationFailed("Invalid Email Address")

        if not User.objects.filter(email=email, is_active=True).exists():
            raise AuthenticationFailed(
                "You are blocked by admin ! Please contact admin"
            )

        user = authenticate(username=email, password=password)
        if user is None:
            raise AuthenticationFailed("Invalid Password")

        refresh = RefreshToken.for_user(user)
        refresh["first_name"] = str(user.first_name)
        refresh["is_superuser"] = user.is_superuser
        content = {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "isAdmin": user.is_superuser,
        }

        return Response(content, status=status.HTTP_200_OK)


# registerView
class RegisterView(APIView):
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

        else:
            return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)
        content = {"message": "Accoutn created successfully!"}
        return Response(content)


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = User.objects.get(id=request.user.id)
        data = UserSerializer(user).data

        try:
            profile_pic = user.profile_pic
            data["profile_pic"] = request.build_absolute_uri("/")[:-1] + profile_pic.url
        except:
            data["profile_pic"] = ""
        return Response(data)


class ProfileUpdateView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        data = request.data
        user = User.objects.get(id=request.user.id)
        user_update_details_serializer = UserDetailsUpdateSerializer(
            user, data, partial=True
        )
        if not request.FILES:
            user_update_details_serializer.fields.pop("profile_pic", None)

        if user_update_details_serializer.is_valid():
            user_update_details_serializer.save()
            return Response(
                user_update_details_serializer.data, status=status.HTTP_201_CREATED
            )
        else:
            return Response(
                user_update_details_serializer.errors,
                status=status.HTTP_400_BAD_REQUEST,
            )


class AdminLoginView(APIView):
    def post(self, request):
        try:
            email = request.data["email"]
            password = request.data["password"]
        except:
            raise ParseError("All Fields Are Required")

        if not User.objects.filter(email=email).exists():
            raise AuthenticationFailed("Invalid Email Address")

        if not User.objects.filter(email=email, is_superuser=True).exists():
            raise AuthenticationFailed("You do not ahve the permission to login!")

        user = authenticate(username=email, password=password)
        if user is None:
            raise AuthenticationFailed("Invalid Password")

        refresh = RefreshToken.for_user(user)
        refresh["is_superuser"] = user.is_superuser
        content = {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "isAdmin": True,
        }

        return Response(content, status=status.HTTP_200_OK)

class UserListingView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        users = User.objects.filter(is_superuser = False)
        serializer = UserDetailsUpdateSerializer(users, many=True)  # Use many=True for a queryset
        serialized_data = serializer.data  
        return Response(serialized_data)

class UserDeleteView(APIView):
    def delete(self,request, pk):
        User.objects.get(id = pk).delete()
        data = {
            'id':pk,
            'messsage': 'Deleted successfully '
        }
        return Response(data, status=status.HTTP_204_NO_CONTENT)
    
class UserDeatailView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, pk):
        try:
            user = User.objects.get(id = pk)
        except User.DoesNotExist:
            message = "User not found"
            return Response({"detail": message}, status=status.HTTP_404_NOT_FOUND)
                
        serializer = UserDetailsUpdateSerializer(user, many=False)
        
        serialized_data = serializer.data
        
        return Response(serialized_data, status=status.HTTP_200_OK)
    
    
class UserUpdateView(UpdateAPIView):
    permission_classes = [IsAdminUser]
    queryset = User.objects.all()
    serializer_class = UpdateUserDetial
    lookup_field = "pk"
    


