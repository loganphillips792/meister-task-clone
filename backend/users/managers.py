from django.contrib.auth.base_user import BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password=None):
        if not username:
            raise ValueError('The username must be set')

        if not email:
            raise ValueError('The email must be set')

        email = self.normalize_email(email)

        user = self.model(username=username, email=email)
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self, username, email, password):
        user = self.create_user(username, email, password)
        user.is_active = True
        user.is_staff = True
        user.is_superuser = True
        user.save()
        return user
