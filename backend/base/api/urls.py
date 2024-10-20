from django.urls import path
from .views import (
    MyTokenObtainPairView,
    LoginView,
    RegisterView,
    ProfileView,
    ProfileUpdateView,
    AdminLoginView,
    UserListingView,
    UserDeleteView,
    UserDeatailView,
    UserUpdateView,InboxView,GetMessagesView,SendMessageView,SearchUserView
)
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("login/", LoginView.as_view(), name="login"),
    path("register/", RegisterView.as_view(), name="Register"),
    path("profile/", ProfileView.as_view(), name="profile"),
    path("profile/update", ProfileUpdateView.as_view(), name="profile_update"),

    #Admin urls
    path("admin/login/", AdminLoginView.as_view(), name="Admin_login"),
    path("admin/users", UserListingView.as_view(), name="User_lisiting"),
    path("admin/user/delete/<pk>", UserDeleteView.as_view(), name="user_delete"),
    path("admin/user/detail/<pk>", UserDeatailView.as_view(), name="user_detail"),
    path('admin/user/update/<pk>', UserUpdateView.as_view(), name='user_update'),
    
    #chat urls
    path('inbox/<user>',InboxView.as_view(),name='inbox'), 
    path('get-messages/<sender_id>/<receiver_id>',GetMessagesView.as_view(),name='get_messages'),
    path('send-message/',SendMessageView.as_view(),name='send_message'),
    path('search/<username>',SearchUserView.as_view(),name='search_user'),
    
]
