from registration.backends.default import DefaultBackend
from registration_backends.community_discussions.forms import CommunityDiscussionsRegistrationForm

class CommunityDiscussionsBackend (DefaultBackend):
    def get_form_class(self, request):
        return CommunityDiscussionsRegistrationForm
