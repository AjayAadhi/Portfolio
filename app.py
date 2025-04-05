import os
import logging
from flask import Flask, render_template, request, flash, redirect, url_for
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key")

from flask_mail import Mail, Message

# Configurations
app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # Or another provider
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'ajayaadhi647@gmail.com'
app.config['MAIL_PASSWORD'] = 'relp vluf qbsb ouih'
app.config['MAIL_DEFAULT_SENDER'] = 'ajayaadhi647@gmail.com'

mail = Mail(app)


# Add template context processor for date functions
@app.context_processor
def inject_now():
    return {'now': datetime.now}

# In-memory storage for contact form submissions
contact_submissions = []

@app.route('/')
def index():
    return render_template('index.html')

# About route removed as requested

@app.route('/skills')
def skills():
    # Redirect to the main page with skills section
    return render_template('index.html')

@app.route('/projects')
def projects():
    # Redirect to the main page with projects section
    return render_template('index.html')

@app.route('/experience')
def experience():
    # Redirect to the main page with experience section
    return render_template('index.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')
        
        if not name or not email or not message:
            flash('Please fill out all fields', 'danger')
            return redirect(url_for('index'))

        # Send email
        try:
            msg = Message(f'New Contact Form Submission from {name}',
                          recipients=['your_destination_email@example.com'])
            msg.body = f"Name: {name}\nEmail: {email}\nMessage:\n{message}"
            mail.send(msg)
            flash('Your message has been sent successfully!', 'success')
        except Exception as e:
            print(e)  # Log the error
            flash('Error sending message. Please try again later.', 'danger')

        # Optionally store it
        contact_submissions.append({
            'name': name,
            'email': email,
            'message': message,
            'timestamp': datetime.now()
        })

        return redirect(url_for('index'))

    return render_template('index.html')


# @app.route('/contact', methods=['GET', 'POST'])
# def contact():
#     if request.method == 'POST':
#         name = request.form.get('name')
#         email = request.form.get('email')
#         message = request.form.get('message')
        
#         if not name or not email or not message:
#             flash('Please fill out all fields', 'danger')
#             return redirect(url_for('index'))
        
#         # Store the submission
#         contact_submissions.append({
#             'name': name,
#             'email': email,
#             'message': message,
#             'timestamp': datetime.now()
#         })
        
#         flash('Your message has been sent successfully!', 'success')
#         return redirect(url_for('index'))
    
#     # Redirect to the main page with contact section
#     return render_template('index.html')

# No need for a separate full-page route

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
