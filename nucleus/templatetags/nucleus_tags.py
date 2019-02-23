from django.conf import settings
from django.template import Library, Node, TemplateSyntaxError

register = Library()


@register.simple_tag(name='sidebar_get_icon')
def sidebar_get_icon(key):
    nucleus = getattr(settings, 'NUCLEUS', {})    

    try:
        return nucleus['sidebar']['navigation'][key]['icon']
    except KeyError:
        return False

    return False


@register.simple_tag(name='sidebar_get_title')
def sidebar_get_title(key):
    nucleus = getattr(settings, 'NUCLEUS', {})    
    
    try:
        return nucleus['sidebar']['navigation'][key]['title']
    except KeyError:
        return False

    return False


@register.filter
def index(items, i):
    if isinstance(items, dict) and i in items:
        return items[i]
    elif isinstance(items, list):
        return items[int(i)]

    return None


@register.tag(name='capture')
def do_capture(parser, token):
    """
    Capture the contents of a tag output.
    Usage:

    .. code-block:: html+django

        {% capture %}..{% endcapture %}                    # output in {{ capture }}
        {% capture silent %}..{% endcapture %}             # output in {{ capture }} only
        {% capture as varname %}..{% endcapture %}         # output in {{ varname }}
        {% capture as varname silent %}..{% endcapture %}  # output in {{ varname }} only

    For example:

    .. code-block:: html+django

        {# Allow templates to override the page title/description #}
        <meta name="description" content="{% capture as meta_description %}{% block meta-description %}{% endblock %}{% endcapture %}" />
        <title>{% capture as meta_title %}{% block meta-title %}Untitled{% endblock %}{% endcapture %}</title>

        {# copy the values to the Social Media meta tags #}
        <meta property="og:description" content="{% block og-description %}{{ meta_description }}{% endblock %}" />
        <meta name="twitter:title" content="{% block twitter-title %}{{ meta_title }}{% endblock %}" />
    """
    bits = token.split_contents()

    # tokens
    t_as = 'as'
    t_silent = 'silent'
    var = 'capture'
    silent = False

    num_bits = len(bits)
    if len(bits) > 4:
        raise TemplateSyntaxError("'capture' node supports '[as variable] [silent]' parameters.")
    elif num_bits == 4:
        t_name, t_as, var, t_silent = bits
        silent = True
    elif num_bits == 3:
        t_name, t_as, var = bits
    elif num_bits == 2:
        t_name, t_silent = bits
        silent = True
    else:
        var = 'capture'
        silent = False

    if t_silent != 'silent' or t_as != 'as':
        raise TemplateSyntaxError("'capture' node expects 'as variable' or 'silent' syntax.")

    nodelist = parser.parse(('endcapture',))
    parser.delete_first_token()
    return CaptureNode(nodelist, var, silent)


class CaptureNode(Node):
    def __init__(self, nodelist, varname, silent):
        self.nodelist = nodelist
        self.varname = varname
        self.silent = silent

    def render(self, context):
        output = self.nodelist.render(context)
        context[self.varname] = output
        if self.silent:
            return ''
        else:
            return output
