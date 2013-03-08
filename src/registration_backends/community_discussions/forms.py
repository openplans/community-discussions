from registration.forms import RegistrationForm, forms, attrs_dict, _

class CommunityDiscussionsRegistrationForm (RegistrationForm):

    username = forms.RegexField(regex=r'^[\w.@+-]+$',
                                max_length=30,
                                widget=forms.TextInput(attrs=attrs_dict),
                                label=_("Username"),
                                error_messages={'invalid': _("Your username may contain only letters, numbers and @/./+/-/_ characters.")})
