# from django.urls import path,include
# from . import views
# from rest_framework.routers import DefaultRouter


# import environ
# # Initialise environment variables
# env = environ.Env()
# environ.Env.read_env()

# router=DefaultRouter()

# router.register('studentfees/',views.studentFeesAdminPanel),
# router.register('fees/',views.feesAdminPanel),
# router.register('splitpayment/',views.splitpayment,basename='splitpayment'),
# router.register('billdeskorder/',views.BilldeskOrdersFunc,basename='billdeskorder'),
# router.register('billdesktransaction/',views.BilldeskTransactionsFunc,basename='billdesktransaction'),


# urlpatterns = [
#     path('display/', views.FeesDisplay.as_view(), name='fees_display'),
#     path('history/', views.StudentFeesView.as_view(), name='fees_history'),
#     path('paid/', views.FeesPaid.as_view(), name='fees_paid'),
#     path('split-payment/', views.SplitPaymentView.as_view(), name='split_payment'),
#     path(f'{env("ORDER_CREATION_ENDPOINT")}/', views.create_billdesk_order, name=f'{env("ORDER_CREATION_ENDPOINT")}'),
#     path(f'{env("S2S_RESPONSE_ENDPOINT")}/', views.billdesk_order_callback, name=f'{env("S2S_RESPONSE_ENDPOINT")}'),
#     path('feerouter/',include(router.urls)),
# ]


