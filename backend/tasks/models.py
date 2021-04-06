from django.db import models
import uuid

class Section(models.Model):
    name = models.CharField(max_length=30)
    color = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table="sections"

class Task(models.Model):
    #id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    def __str__(self):
        return f"Task ID: {self.id}"

    class Meta:
        db_table="tasks"