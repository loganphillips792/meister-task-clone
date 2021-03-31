from django.db import models
import uuid

# Create your models here.
class Task(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    def __str__(self):
        return f"Task ID: {self.id}"

    class Meta:
        db_table="tasks"