from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class MyAccountManager(BaseUserManager):

    def create_user(self, first_name, last_name, phone_number, email, password=None):
        if not email:
            raise ValueError("Email address is mandatory")
        if not password:
            raise ValueError("password is mandatory")

        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            phone_number=phone_number,
        )
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(
        self, first_name, last_name, phone_number, email, password=None
    ):
        user = self.create_user(
            email=self.normalize_email(email),
            password=password,
            first_name=first_name,
            last_name=last_name,
            phone_number=phone_number,
        )
        user.is_active = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class Account(AbstractBaseUser):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=100, unique=True)
    phone_number = models.CharField(max_length=50, unique=True)
    profile_pic = models.ImageField(
        upload_to="user/profile_pic/", null=True, blank=True
    )

    # required
    date_joined = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name", "phone_number"]

    objects = MyAccountManager()

    def __str__(self):
        return self.email

    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, add_label):
        return True


class ChatMessage(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE, related_name="user")
    sender = models.ForeignKey(Account, on_delete=models.CASCADE, related_name="sender")
    reciever = models.ForeignKey(
        Account, on_delete=models.CASCADE, related_name="reciever"
    )
    message = models.CharField(max_length=500)
    is_read = models.BooleanField(default=False)
    time = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-time"]
        verbose_name = "Message"
        
    def __str__(self):
        return f"{self.sender} - {self.reciever}"
    
    @property
    def sender_profile(self):
        return Account.objects.get(email=self.sender)
    
    @property
    def reciever_profile(self):
        return Account.objects.get(email=self.reciever)