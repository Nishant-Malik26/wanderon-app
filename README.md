# Design cosideration
-For backend services Nodejs is used in addition express,
 -express-validator - for valudation
 -cookie-js- for setting cookie 
 -mongoose is used for protecting against injection attacks
 -jsonwebtoken - for generating JWT token 
 -bcryptjs - for hashing password
-For Database, mongoDB is used
-For frontend, React is used in addition 
 -react-router-dom - for routing of web pages
 -redux-toolkit - for maintaing central store of state of all components
 -dompurify- Sanitising user input to protect against xss attacks
 -cookie-parser - parsing cookies
 -cors -modifying cors options and enabling cors access for deployed url
 -axios is used fetching data from backend

# Application Structure
-backend folder has the backend code
    -Server.js
        -server file is the starting point
        -cors is enabled for the deployed url
    -config
        -DB url
        -funtion for DB connection
    -middleware
        -middleware for checking authentication token for protected endpoints
        -more middlewares can be added as per requirement
    -models
        -User model is added
        -more models can be added
    -routes/api
        -Auth.js
            -Service for registering user is implemented
            -validation is done using express-validator
        -Users.js
            -Service for login user is implemented
-client folder has the frontend code
    -src
        -components
            -auth
                -Login.js
                    -Login screen of app
                -Register.js
                    -Registration page for user
            -dashboard
                -landing page after login
            -layout
                -Notification, landing page, and navbar
            -routing
                -Private routes for pages after login
            -img
                -background image for landing page
            -reducers
                -redux toolkit is used for managing central state of app
                -alert, user registration, login and logut state is managed
                -more reducers can be added as per requirement
            -App.js
                -all the components are rendered as per requirement
                -more routes can be added as per requirement
             