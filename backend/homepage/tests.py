from django.test import TestCase
from .models import Group

class GroupTestCase(TestCase):
    def setUp(self):
        Group.objects.create(group_type = "major", group_name="cse")
    
    def test_group_type_created(self):
        """if group type has the unified name protocol"""
        cse = Group.objects.get(group_name= "cse")
        self.assertEqual(cse.group_type, "major")