## 📝 Introduction
 * Welcome to the official repository of **Project ERP** by [Maharaja Agrasen Institute of Technology](http://mait.ac.in). This project is under active development under the guidance of the CSE department at MAIT.  [(https://erp.mait.ac.in)](https://erp.mait.ac.in)
 * If you're a developer looking to contribute to our project, please follow the instructions below.


## ⚙️ Project Setup
### Clone the project repository 
```bash
git clone https://github.com/singhchanmeet/ERP.git
```
### Frontend Setup
 * Navigate to the frontend directory and run the following commands :
```bash
 npm install
 npm run start
```
### Backend Setup
 * In the backend folder, create an aad.config.json file. You can refer to [this guide](https://learn.microsoft.com/en-us/training/modules/msid-django-web-app-sign-in/3-exercise-register-django-web-app) for more information.

 * In the backend/core folder, create a .env file with all the required settings. Use the  <a href="https://github.com/singhchanmeet/ERP/blob/master/backend/core/env.example"> env.example </a> file for reference.

 * Navigate to the backend directory and run the following commands

```bash
 pip install -r requirements.txt
 python manage.py makemigrations
 python manage.py migrate
 python manage.py runserver
```

Go to http://localhost:3000/ to see the running project

## 👨🏻‍💻 Contributors
<a href="https://github.com/singhchanmeet"> Chanmeet Singh </a>, <a href="https://github.com/exploring-solver"> Aman Sharma </a>, <a href="https://github.com/HaarisHuda"> Haaris Huda </a> and <a href="https://github.com/shivankupadhyay-eng"> Shivank Upadhyay </a>
