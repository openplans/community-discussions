from django.conf import settings
from django.shortcuts import get_object_or_404
from pybb.views import ForumView as PybbForumView
from pybb.views import WatchAreaTopicsView as PybbWatchAreaTopicsView
from pybb.views import AddPostView as PybbAddPostView
from pybb.models import WatchArea


class GlobalForumMixin (object):
    def get_forum_pk(self):
        if not hasattr(settings, 'PYBB_FORUM_ID'):
            raise ImproperlyConfigured('You must provide a PYBB_FORUM_ID setting')
        return settings.PYBB_FORUM_ID


class ForumView (GlobalForumMixin, PybbForumView):

    def dispatch(self, *args, **kwargs):
        forum_pk = self.get_forum_pk()
        return super(ForumView, self).dispatch(
            pk=forum_pk, *args, **kwargs)


class WatchAreaTopicsView (GlobalForumMixin, PybbWatchAreaTopicsView):

    def get_context_data(self, **kwargs):
        forum_pk = self.get_forum_pk()
        context = super(WatchAreaTopicsView, self).get_context_data(**kwargs)
        context['forum'] = {'id': forum_pk}
        return context


class AddPostView (PybbAddPostView):

    def get_initial_watch_area(self):
        pk = self.request.GET.get('start_in_watch_area', None)
        if pk is not None:
            watch_area = get_object_or_404(WatchArea, pk=pk)
            return watch_area

    def get_form_kwargs(self):
        kwargs = super(AddPostView, self).get_form_kwargs()
        watch_area = self.get_initial_watch_area()
        if watch_area is not None:
            kwargs['initial']['place'] = watch_area.fence.centroid
        return kwargs
