# OpenShield

OpenShield is a full stack web application for managing cyberattacks. This project is part of my masters degree in Electronic & Computer Engineering from the University of Galway

# Project Setup

All scripts should be executed from the root directory
| Command             | Description                                    |
|---------------------|------------------------------------------------|
| `npm install`      | Install the project dependencies            |
| `npm run start`        | Initiate the React development server on port 3000        |
| `mvn spring-boot:run` | Start the Spring Boot application on port 8080 |

# Database Setup
Initiate the environment variables used in [application.properties](https://github.com/aidandempsey/OpenShield/blob/main/src/main/resources/application.properties) to set up the MySQL database connection

| SQL Script             | Description                                    |
|---------------------|------------------------------------------------|
| [1.CreateTables.SQL](https://github.com/aidandempsey/OpenShield/blob/main/sql%20scripts/1.CreateTables.SQL)      | Create MySQL Schema           |
| [2.AddData.SQL](https://github.com/aidandempsey/OpenShield/blob/main/sql%20scripts/2.AddData.SQL)        | Populate the database with fake        |

# Okta Setup
Fill in the values for each property in the [Okta configuration object](https://github.com/aidandempsey/OpenShield/blob/main/src/lib/oktaConfig-template.js).

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/aidandempsey/OpenShield/blob/main/LICENSE) file for details.