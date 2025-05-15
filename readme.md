# Chat Application

This is a basic chat application with user login, register, chat window features have been implemented. Authentication has been handled with JsonWebtoken.

## Tech Stack

**Client:**
| ![React](https://img.shields.io/badge/React-212121?logo=react&labelColor=black) | ![Bootstrap](https://img.shields.io/badge/Bootstrap-212121?logo=bootstrap&labelColor=white) | ![HTML5](https://img.shields.io/badge/HTML-212121?logo=html5&labelColor=white) | ![CSS](https://img.shields.io/badge/CSS-212121?logo=css3&labelColor=grey) | ![JavaScript](https://img.shields.io/badge/JavaScript-212121?logo=javascript&labelColor=grey) |
|---|---|---|---|---|

**Server:**
| ![NodeJS](https://img.shields.io/badge/NodeJS-212121?logo=nodedotjs&labelColor=grey) | ![ExpressJS](https://img.shields.io/badge/ExpressJS-212121?logo=express&labelColor=grey) | ![JWT](https://img.shields.io/badge/JWT-212121?logo=auth0&labelColor=white) | ![Bcrypt](https://img.shields.io/badge/Bcrypt-212121?logo=cryptpad&labelColor=whiblablackckte) | ![Mongoose](https://img.shields.io/badge/Mongoose-212121?logo=mongoose&labelColor=black) |
|---|---|---|---|---|

**Database:**
| [![Static Badge](https://img.shields.io/badge/MongoDB-212121?logo=mongodb&labelColor=grey)](#) |
|---|

## Features

**Frontend:-**

-   **Authentication Page**

    ☑ Login and Register form with username and Password fields.

-   **Chat Messages Page**

    ☑ Individual inbox for all the available Users.

    ☑ Each inbox contains one message box where user will be able to type message and there will be one Send button to send message.

    ☑ The messages will be arranged based on sender and receiver for each inbox.

**Backend:-**

-   **Authentication Routes**

    ☑ While registering the user username and password fields are required.

    ☑ Username should be unique all over the application.

    ☑ Password needs to be encrypted.

    ☑ In login route user validation must be done.

-   **Messages Route**

    ☑ In this route server connection needs to be done with socket.io library.

    ☑ Once an user logs in messages for the same user needs to be fetched.

-   **Users Route**
    ☑ In this route all the available user needs to be fetched.
