- create a repository
- Initialize the repository
- Node Modules, package.json, package-lock.json
- Install Express
- Create a server
- Listen to port 3000
- Write request handelerfor /test, /hello
- Install nodemon and update script inside packag.json
- What are dependencies
- What is the use off "-g" while npm install
- Diffrencs b/w caret and tilda (^ V/S ~)

---

- Intilize git
- .gitignore
- Create a remote repo on gitbub
- Push all code to remote origin
- play with routes and routes extenstions ex. /hello, /, hello/2, /xyz
- oder of routes matters a lot
- install postman app make workspace and collection > test api call
- Write a logic to handelGET, POST, PATCH, DELETE Api calls and test them on postman
- Expolre routing and use of ?,+ , (), \* in the routes
- Useof regex in routes /a/ ,/.\*fly$/
- Reading the query parmas in the routes
- Reading the Dynamic Routes in the routes

- create a free cluster on mongodb official website(MOngo Atlasa )
- install mongoose library
- connect your application to database <"Conection url">/devTinder
- call connectDb function and connectto database beforestarting your application on 3000
- create a userSchema & Model
- create /signup Api to add data to databse
- push some documents suing API calls from postman
- Error handling using try, catch
- Js Object VS JSON Data
- add the express.json middleware to your app
- make your singup API dynamic to recive data from end user
- user.findOne with duplicate email ids, which object will it find and returned
- get user by email
- get all the user using feed api
- create an api get By ID
- create delete api using findByIdAndDelete
- diff PATCH AND PUT
- Api - update a user
- explore the mongoose documnets for model
- what are options in a model.findOneAndUpdate api
- Api - Update the user using email ID
- explore schema type options from the documents
- add requird ,unique,lowercase and uppercase, min,minlenth, maxlenth, max, default,trim, create a custom validate function for gender
- improve the db schema put all the appropriate validations on each field in schema
- add timestamps to the schema
- Add api level validation on patch api and signup api
- Data Sanitizarion -add api validations for each field
- install the validator
- explore the valitdaor libarey password, email, phtourl
- never trust req.body
- validate the signup data with util/validator.js
- install bcrypt
- create passwordhash using bcrypt.hash & save the user with encrypted password
- create login api
- compare passwords and throw errors if email or passwords is invalid
- Install Cookie-Parser
- Jsut send a dummy cookie to user
- create get/profile api and check if you get cookie back
- install jwt jsonwebtoken
- in Login api, after email and password validation, create a jwt token and send it user in cookies
- read the cookies inside your profile API and find the logged in user
- userAuth middleware
- Add the userauth middleware in profile api and new connectionrequestapi
- set the expiry of jwt token and cookies to 7 days
- create userscema method to getJWt()
- create userschema method to comparePassword(passwordInputByUser)

---

- Explore tinder apis
- create a list of all api you can think of dev api
- group multiple routes under respective routes

- Explore read documnetaion for express router
- create routes folder for managing auth, profile, request routers
- create authrouter ,ProfileRouter, requestRouter
- import those routers in app.js

- Create Post/ Logout api
- create Patch /profile/edit
- create PAtch /profile/password api => forgot password api
- make sure validate all data in every post patch api

- Create a connection request schema,
- Send connection request API
- add proper validation of data
- Think about all corner cases and handel then
- $Or query Read more
- Scchema.Pre("Save);
- Read more about indexes in mongodb
- Read more about this url https://www.mongodb.com/docs/manual/core/indexes/index-types/index-compound/
- Why do we need indexs
- What is the advantage and disadvantage of creating indexs
- Alwasys Think about corner cases
