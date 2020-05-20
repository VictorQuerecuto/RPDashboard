Application for viewing, organizing, and creating internal orders.

*------- Setting Database Instance -------*

1. Open MySQL database with choice of application (i.e. MySQLWorkbench)

2. Open and execute OrderSystemSchema.sql in MySQLWorkbench

3. If your database server has a password update the password field in the "server.js" file found on /server/server.js with the password for your db connection

*------- Installing Vue dependencies -------*

1. Change directories to client (/RPDashboard-master/client)

2. run "npm install --save axios vue-router" This will still the routers Vue uses to call the endpoints

*------- Directions on running application -------*

1. Open TWO terminal windows

2. In the first terminal change directories to client (/RPDashboard-master/client)

3. Run "npm run serve" (If sucessful you should get a localhost:8081)

4. In the second terminal change directories to server (/RPDashboard-master/server)

5. Run "node server.js"

6. Open browser and navigate to "localhost:8081"