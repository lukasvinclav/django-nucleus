from django.conf import settings


def nucleus(request):
    return {
        'nucleus': getattr(settings, 'NUCLEUS', {}),
    }
