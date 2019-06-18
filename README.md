# Team 9 (SWPP201901)
![icon](https://github.com/swapp201901-team9/frontend/blob/master/icon.jpg)
![User Interface](https://github.com/swapp201901-team9/frontend/blob/master/documents/user%20interface.jpeg)
We are Team 9 taking 'software development principles and design' course
held in 2019-01.

This is a long-term group project creating online web service.
We use React, React-Redux, Redux-Saga, Django, Django-Rest Framework.

We are trying to create a web service for designing and simulating 
uniforms for organizations/communities/schools/clubs etc. 
(Or so called "과잠" in South Korea.)

This web service also provides 
individual/group identification and group voting systems.

## Abstract

Please reference our github wiki page for more information about the project.
(https://github.com/swapp201901-team9/full-stack-web-development/wiki)

## Demo

http://ec2-13-125-245-176.ap-northeast-2.compute.amazonaws.com:3000/

## Getting Started

### [Frontend] (https://github.com/swapp201901-team9/frontend)

0) Install [NodeJs](https://nodejs.org/en/)

1) Fork [Frontend](https://github.com/swapp201901-team9/frontend) repository on Github

2) Clone your fork to your local machine
  ```bash
   git clone git@github.com:<yourname>/frontend.git
   ```
3) Go to the project root directory
   ```bash
   cd frontend
   ```
4) erase all unnecessary data 
  ```bash
   rm package-lock.json
   rm -r node_modules 
   ```
4) install node dependencies 
 ```bash
  sudo npm install
  ```
  *do not "sudo npm audit fix"
5) start 
```bash
  sudo npm start 
  ```

### [Backend] (https://github.com/swapp201901-team9/backend)

0)install pip3, python3 
*for linux
```bash
  - sudo apt-get update
  - sudo apt-get install python3.5
  - sudo apt-get -y install python3-pip python-dev
  - sudo python3 -m pip install --upgrade pip
  - sudo pip3 install -U setuptools
  - python3 -V
  - pip3 -V 
  ```
1) Fork [Backend](https://github.com/swapp201901-team9/backend) repository on Github

2) Clone your fork to your local machine
  ```bash
   git clone git@github.com:<yourname>/backend.git
   ```
3) Go to the project root directory
   ```bash
   cd backend
   ```
4) erase all unnecessary data and migrate 
  ```bash
   rm -r homepage/migrations
   python3 manage.py makemigrations homepage
   python3 manage.py migrate
   ```
4) install node dependencies 
 ```bash
  sudo pip3 install -r requirements.txt
  ```
5) start 
```bash
  sudo python3 manage.py runserver
```


