import os

def invoice_rename(instance, filename):
    return os.path.join('infrastructure/invoice', filename)