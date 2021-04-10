from rest_framework import serializers 
from tasks.models import Section
import logging

logger = logging.getLogger(__name__)

class TaskSerializer(serializers.Serializer):
    # id is automatically created, so don't need to write it
    id = serializers.IntegerField(source="pk", read_only=True)
    name = serializers.CharField(max_length=1000, trim_whitespace=False)
    description = serializers.CharField(max_length=1000, allow_null=True)
    section_id = serializers.IntegerField(write_only=True)
    due = serializers.DateField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)  
    completed_at = serializers.DateTimeField(allow_null=True)
    assigned_to_id = serializers.IntegerField()

    def create(self, validated_data):
        return Task.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.section_id = validated_data.get('section_id', instance.section_id)
        instance.due = validated_data.get('due', instance.due)
        instance.content = validated_data.get('content', instance.content)
        instance.save()

    def validate(self, data):
        print("valdiated data is")
        print(data)
        return data

class SectionSerializer(serializers.Serializer):
    id = serializers.IntegerField(source="pk", read_only=True)
    name = serializers.CharField(max_length=30)
    color = serializers.CharField(max_length=7, default='#FFD500')
    description = serializers.CharField(max_length=300, required=False, allow_null=True)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)
    task_set = TaskSerializer(read_only=True, many=True)

    def validate_color(self, value):
        logger.info("Validating color field...")
        if value[0] != '#':
            raise serializers.ValidationError("Color does not contain #")
        return value

    def create(self, validated_data):
        return Section.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.color = validated_data.get('color', instance.color)
        instance.description = validated_data.get('description', instance.description)
        instance.created_at = validated_data.get('created_at', instance.created_at)
        instance.updated_at = validated_data.get('updated_at', instance.updated_at)
        instance.save()
        return instance

class NoteSerializer(serializers.Serializer):
    # id is automatically created, so don't need to write it
    id = serializers.IntegerField(source="pk", read_only=True)
    audio_id = serializers.IntegerField(write_only=True)
    id_of_task_note_belongs_to = serializers.IntegerField(source='task_id', read_only=True)
    content = serializers.CharField(max_length=1000, trim_whitespace=True)
    date_created = serializers.DateTimeField(read_only=True)
    date_updated = serializers.DateTimeField(read_only=True)

    def create(self, validated_data):
        return Note.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.content = validated_data.get('content', instance.content)
        instance.save()

    def validate(self, data):
        print("valdiated data is")
        print(data)
        return data