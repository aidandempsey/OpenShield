# OpenShield

OpenShield is a full stack web application for managing cyberattacks. This project is part of my masters degree in Electronic & Computer Engineering from the University of Galway

# Database Setup
Initiate the environment variables used in [application.properties](https://github.com/aidandempsey/OpenShield/blob/main/src/main/resources/application.properties) to set up the MySQL database connection

| SQL Script             | Description                                    |
|---------------------|------------------------------------------------|
| [1.CreateTables.SQL](https://github.com/aidandempsey/OpenShield/blob/main/sql%20scripts/1.CreateTables.SQL)      | Create MySQL Schema           |
| [2.AddData.SQL](https://github.com/aidandempsey/OpenShield/blob/main/sql%20scripts/2.AddData.SQL)        | Populate the database with fake        |

# Project Setup
All scripts should be executed from the root directory
| Command             | Description                                    |
|---------------------|------------------------------------------------|
| `npm install`      | Install the project dependencies            |
| `npm run start`        | Initiate the React development server on port 3000        |
| `mvn spring-boot:run` | Start the Spring Boot application on port 8080 |


# Firebase Authentication Setup

To set up Firebase Authentication, go to the [Firebase Console](https://console.firebase.google.com/) to create and register your app.  Once your project is created, click on "Add app" and select the web platform. Copy your configuration object into the [firebase/config.js](https://github.com/aidandempsey/OpenShield/blob/main/src/frontend/firebase/config.js) file

```javascript
     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID",
     };
```

Enable the authentication providers you want to use. This project uses email/password.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/aidandempsey/OpenShield/blob/main/LICENSE) file for details.