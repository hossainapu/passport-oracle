# passport-oracle
This is a NodeJS project that can authenticate an user saved in oracle using passportjs

#How to Install NodeJs?
I have been using CentOS machine to run my codes. Here is the steps to follow to install nodeJS on CentOS.

Download nodeJS with following command </br>
 $ cd /opt </br>
 $ wget http://nodejs.org/dist/v7.2.1/node-v7.2.1-linux-x64.tar.gz</br>
 $ tar xvfz node-v7.2.1-linux-x64.tar.gz</br>
 $ mkdir -p /usr/local/nodejs</br>
 $ mv node-v7.2.1-linux-x64/* /usr/local/nodejs</br>
 
 Now open your bashrc file using following command </br>
 vi ~/.bashrc </br>
 add export PATH=$PATH:/usr/local/nodejs/bin this line and save your file.</br>
 Now run $ source ~/.bashrc </br>
 You are done. To verify your nodeJs installation run </br>
 $  node --version</br> 
 $  npm --version</br>
 
 You should see version of nodeJs and npm.</br>

#How to Install oracle driver?</br>
 As this app runs on Oracle database, you have to install oracle driver for nodeJS.</br>
 There are some pre-requirements for installing oracle driver for nodeJS </br>
 1. You should have python2.7.6 installed on your machine</br>
 2. You should have gcc version 4.9.1 on your machine</br>
 3. You should have oracle instantclient installed on your machine</br>
 
#How to install python2.7.6?
Run following commands to install python2.7.6 on CentOS </br>
 $  cd /opt</br>
 $  wget --no-check-certificate https://www.python.org/ftp/python/2.7.6/Python-2.7.6.tar.xz</br>
 $  tar xf Python-2.7.6.tar.xz</br>
 $  cd Python-2.7.6</br>
 $  ./configure --prefix=/usr/local</br>
 $  make && make altinstall</br>
 
 Now add following line in .bashrc </br>
 <b>alias python=/usr/local/bin/python2.7</b> and source this file.</br>
 To verify your python installation run <b> python -V </b> and see your updated python version</br>
 
#How to install gcc-4.9.1 in CentOS?
 Run following commands to install and enable gcc-4.9.1 on your machine <br>
 $  cd /etc/yum.repos.d</br>
 $  wget http://linuxsoft.cern.ch/cern/scl/slc6-scl.repo</br>
 $  yum -y --nogpgcheck install devtoolset-3-gcc devtoolset-3-gcc-c++</br>
 $  scl enable devtoolset-3 bash</br>
 To verify your gcc version update run <b> gcc --version</b> command and see your updated gcc version.</br>
 
#How to install oracle instantclient?
 Follow https://github.com/oracle/node-oracledb/blob/master/INSTALL.md#instzip link to install oracle instantclient.</br>
 
Your are done for your development environment setup.</br>

#How to run passport-oracle app?
 I have used express framework to develop my app and you have to use express to run my project. Here are the simple steps that should follow to run my project.</br>
 
 Run <b> npm install express-generator -g </b> to install express generator to your system. Express generator is an extension of express that can generate basic skeleton of an expree project. </br>
 
 Create a directory <b> $ mkdir passport-oracle </b> and run following commands: </br>
 $  cd passport-oracle </br>
 $  express --view=pug </br>
 $  npm install</br>
Now your have to install some packages that I have used in my project and here are the commands to do so. </br>

 $  npm install express-session </br>
 $  npm install passport</br>
 $  npm install passport-local</br>
 $  npm install connect-flash</br>
 $  npm install log4js </br>
 $  npm install oracledb </br>
 $  npm install md5 </br>
 $  npm install nodemon -g </br>
 
Perform following operations on your project generated by express</br>
./app.js (Replace this file)</br>
./routes/routes.js (Add this file)</br>
Delete all your files from ./view and add all views from my project </br>
Create directories log and config and copy contents from my project to your project. Please dont forget to change path of log configuration file and properties of database connection.</br>
./bin/www (Replace this file)
./start.sh (Copy this file to your directory)

Run ./start.sh (Your app is running on 3000 port to browse http://your_ip:3000/)
 
 
 
