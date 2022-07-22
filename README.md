# This is a Shift Management Web app for a securtiy company i'm working at.
### The Stack used in this Web app is Express and Mongo in the Back-end with passport js for client side auth and Mongo DB with Mongosh for the Database. For the Front-end I use Vanila JavaScript Bootsrap 5 and a Canvas js Dependancy to paint and download the HTML/CSS calander.

## Steps to run the app:
1. Clone the repository.
2. Install all the Dev Dependansies with " npm install " in a Terminall ps. Make sure you are in the right Directory.
3. Make a new file with the named .env in the root directory.
4. Paste These vars in the .env file
```
DB_STRING=mongodb://localhost/group8
SECRET=PASTE KEY HERE <==
```
5. Generate a auth key from [randomkeygen.com](randomkeygen.com) the "128-bit WEP Key" will do any string will actualy do.
6. Paste yoor secret key next to the SECRET env var.
7. Make sure you have Mongodb installed and the service worker is running. You could verify this in Taskmanager on windows.
8. Run " node app " in your terminal in the app directory.



