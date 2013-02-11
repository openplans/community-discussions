from django.conf import settings
from pybb.views import ForumView as PybbForumView


class ForumView (PybbForumView):

    def dispatch(self, *args, **kwargs):
        if not hasattr(settings, 'PYBB_FORUM_ID'):
            raise ImproperlyConfigured('You must provide a PYBB_FORUM_ID setting')
        return super(ForumView, self).dispatch(
            pk=settings.PYBB_FORUM_ID, *args, **kwargs)
