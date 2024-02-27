import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from twilio.rest import Client

# Email configuration
def send_email():
    smtp_server = 'smtp.office365.com'
    smtp_port = 587  # Change if necessary
    sender_email = input("Enter Email:\t")
    password = input("\nEnter Password:\t")

    # Message configuration
    subject = ''
    message_body = ''
    sender_name = ''
    # List of recipient emails
    recipient_emails = [
      # Add recipient emails here
    ]
    # Create MIME message
    msg = MIMEMultipart()
    msg['From'] = f'{sender_name} <{sender_email}>'
    msg['Subject'] = subject
    msg.attach(MIMEText(message_body, 'plain'))

    # Connect to SMTP server
    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls()
        server.login(sender_email, password)
    
        # Send emails to each recipient
        for recipient_email in recipient_emails:
            msg['To'] = recipient_email
            text = msg.as_string()
            server.sendmail(sender_email, recipient_email, text)
            print(f"Email sent successfully to {recipient_email}")
        print("All emails sent successfully.")
def send_sms():
    # Account SID and Auth Token from console.twilio.com
    account_sid = ""
    auth_token  = ""
    client = Client(account_sid, auth_token)
    message_body = input("Enter Your message:")
    recipient_numbers = []               #list of recipients number
    for number in recipient_numbers:
        try:
            message = client.messages.create(
            body=message_body,
            from_='',         # Twilio phone number
            to=number
            )
            print(f"Message sent successfully to {number}, SID: {message.sid}")
        except Exception as e:
            print(f"Failed to send message to {number}: {str(e)}")