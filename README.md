# example-rest-api-fastify-mysql

## How to Install
1. npm install
2. create .env file
```
A. Start XAMPP Services
    Open the XAMPP Control Panel.
    Start both Apache and MySQL modules.
B. Access phpMyAdmin
    Open your browser and go to http://localhost/phpmyadmin/
    http://localhost/phpmyadmin/
C. Create a New Database
    Click on the "Databases" tab.
    Enter the name of your database (e.g., test_db).
    Click "Create".
D. Import the Database
    Select the database you just created from the left sidebar.
    Click on the "Import" tab.
    Click "Choose File" and select your SQL file (e.g., database.sql) from your computer.
    Scroll down and click "Go" to start the import.
E. Verify the Import
    Once the process completes, check for any errors.
    If successful, you’ll see the imported tables listed under the database.
F. Access Your Application
    ensure your .env file has the correct database credentials:
    SERVER_PORT=3000
    DB_HOST=localhost
    DB_USER=YOUR_DB_USER
    DB_PASSWORD=YOUR_PASSWORD
    DB_NAME=YOUR_DATABASE
    DB_PORT=3306
```
3. node server.js

## Read Detail Article
https://omadijaya.id/nodejs-simple-rest-api-with-fastify-and-mysql/
