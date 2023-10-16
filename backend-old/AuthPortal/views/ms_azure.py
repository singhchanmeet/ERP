from django.http import HttpResponse
import jwt
from django.conf import settings


def index(request):
    print (request.identity_context_data.authenticated)
    print (request.identity_context_data._access_token)
    print (request.identity_context_data.username)
    print (request.identity_context_data.token_cache)
    print (request.identity_context_data.post_sign_in_url)
    print (request.identity_context_data.state)
    print (request.identity_context_data.nonce)
    print(request.identity_context_data._id_token_claims)
    print(request.META['REMOTE_ADDR'])
    # decodedPayload = jwt.decode(str(request.identity_context_data._access_token),key=settings.SECRET_KEY,algorithms=['HS256'])
    # print(decodedPayload)
    return HttpResponse(request.identity_context_data.authenticated)