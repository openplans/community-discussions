from django.conf import settings
from pybb.views import ForumView as PybbForumView


class ForumView (PybbForumView):

    def dispatch(self, *args, **kwargs):
        if not hasattr(settings, 'FORUM_ID'):
            raise ImproperlyConfigured('You must provide a FORUM_ID setting')
        return super(ForumView, self).dispatch(
            pk=settings.FORUM_ID, *args, **kwargs)
