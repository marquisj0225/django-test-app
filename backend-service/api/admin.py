from django.contrib import admin

from .models import Job, Skill

# Register your models here.

admin.site.register((Job, Skill))

