# This is a Shift Management Web app for a securtiy company i'm working at.
### [group8-rooster.herokuapp.com](https://group8-rooster.herokuapp.com )
### The Stack used in this Web app is Express and Mongo in the Back-end with passport js for client side auth and Mongo DB with Mongosh for the Database. For the Front-end I use Vanila JavaScript Bootsrap 5 and a Canvas js Dependancy to paint and download the HTML/CSS calander.

#### Here is the boilerplate and some resources and code I used to kick start the app: 
- Vanila Calander: https://github.com/portexe/VanillaCalendar / Youtube: [https://www.youtube.com/watch?v=m9OSBJaQTlM&t=311s](https://www.youtube.com/watch?v=m9OSBJaQTlM&t=311s)
- User Authentication Youtube:  [https://www.youtube.com/watch?v=F-sFp_AvHc8&t=13379s](https://www.youtube.com/watch?v=F-sFp_AvHc8&t=13379s)
- Styling [bootstrap.com](https://getbootstrap.com/docs/5.2/getting-started/introduction/)
- General Dev Skills: [https://www.youtube.com/c/TraversyMedia](https://www.youtube.com/c/TraversyMedia)

## Steps to run the app:
1. Clone the repository.
2. Install all the Dev Dependansies with " npm install " in a Terminall ps. Make sure you are in the right Directory.
3. Make a new file named .env in the root directory.
4. Paste These vars in the .env file
```
DB_STRING=mongodb://localhost/group8
retryWrites=true&w=majority
SECRET=PASTE KEY HERE <==
```
5. Generate a auth key from [randomkeygen.com](https://randomkeygen.com) the "128-bit WEP Key" will do any string will actualy do.
6. Paste yoor secret key next to the SECRET env var.
7. Make sure you have Mongodb installed and the proccess is running. You could verify this in Taskmanager on windows.
8. Run " node app " in your terminal in the app directory.

### If you feel like Crashing your Mac/Linux unix machine or on windows you can use bash terminal that comes with git or on windows sub system for linux basicaly any unix bash terminal run this recursive fork bom or rabbit function that spawns multiple proccesses and grinds your computer to a halt:

#### A( ){ A|A& } ;A



