from django.db import models
import uuid
from profile.models import Profile

class Section(models.Model):
    name = models.CharField(max_length=30)
    # To save order of sections on UI, should we add a 'Sequence #' field?
    description = models.CharField(max_length=300, null=True)
    color = models.CharField(max_length=7)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table="sections"

class Task(models.Model):
    #id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=250)
    description = models.CharField(max_length=1000, null=True)
    section = models.ForeignKey(Section, on_delete=models.CASCADE)
    due = models.DateField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    completed_at = models.DateTimeField(auto_now=True, null=True)
    assigned_to_id = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f"Task ID: {self.id}"

    class Meta:
        db_table="tasks"

class Note(models.Model):
    task = models.ForeignKey(
        Task, 
        on_delete=models.CASCADE, 
        null=True
    )

    content = models.CharField(max_length=1000)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Note ID: {self.id}"

    class Meta:
        db_table="notes"