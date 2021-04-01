from django.db import models
from users.models import CustomUser
from django.contrib.auth.models import AbstractUser
import uuid

# By default, Django will create a table profile_profile
# Models fields reference: https://docs.djangoproject.com/en/2.2/ref/models/fields/
class Profile(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # adds a user_id column to the table
    user = models.OneToOneField(
        CustomUser, 
        on_delete=models.CASCADE, 
        null=True
    )
  
    account_created = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    first_name = models.CharField(null=True, max_length=30)
    last_name = models.CharField(null=True, max_length=30)
    email = models.EmailField(null=False, default=None, max_length=50, unique=True)
    birth_date = models.DateField(null=True)

    class Meta:
        db_table = "profiles"
    
    def __str__(self):
        return "user: {} first_name: {} last_name: {} email: {} birth_date: {} country: {}".format(self.user.get_username(),self.first_name, self.last_name, self.email, self.birth_date, self.country)