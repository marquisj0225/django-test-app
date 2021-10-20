from django.db import models
from django.contrib.auth.models import User

from django.contrib.auth import get_user_model

# Create your models here.

User = get_user_model()

class Skill(models.Model):
    name = models.CharField("Name", max_length=30,  blank=False, null=False)
    used = models.IntegerField("Time Used", default=0)
    
    def __str__(self):
        return self.name
    
    
class Job(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE, default=1, blank=False, null=False)
    title = models.CharField("Title", max_length=50, blank=False, null=False)
    skills = models.ManyToManyField(Skill)
    description = models.TextField("Description", null=False, blank=False, default="")


