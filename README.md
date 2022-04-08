# Paws

A fully-feautred platform for Dating or finding Playmates for your Pets.
Match up with local pets and pet lovers for friendship, play-dates or fun
outdoor playing made using [React JS](https://reactjs.org/docs/getting-started.html), a JavaScript library to make awesome UI by Facebook, [Node JS](https://nodejs.org/en/docs), [Express JS](https://expressjs.com/en/api.html) and [MongoDB](https://docs.mongodb.com/).

This application uses [React JS](https://reactjs.org/docs/getting-started.html) component oriented UI creation paradigm. All components are written in [JSX](https://reactjs.org/docs/jsx-in-depth.html) and ES6 style and are
combined to get a single build for production purpose using [Webpack 5](https://webpack.js.org/concepts/).

[Chakra-UI](https://chakra-ui.com/guides/getting-started/cra-guide) CSS framework used in this application.

ES6 `module` creation along with `import /export` is used. [Babel](https://babeljs.io/docs/en/babel-preset-react) is used to _transpile_ all [JSX](https://reactjs.org/docs/jsx-in-depth.html) code to vanilla JavaScript code. To install all the dependecies `npm` is used.

Back end is implemented using [Node JS](https://nodejs.org/en/docs), [Express JS](https://expressjs.com/en/api.html) and [MongoDB](https://docs.mongodb.com/). [Atlas](https://www.mongodb.com/cloud/atlas), the _Cloud_ version of [MongoDB](https://docs.mongodb.com/) is used. Communication is done using [Socket.io](https://www.npmjs.com/package/socket.io).

This is a _responsive web application_ for viewing in both Mobile and Desktop.

```
This is still a work in progress.
Backend API logic is yet to be coded.
App is not made responsive yet.
If you find any bugs you can report it to me.
Pull requests are always welcome. For major changes, 
please open an issue first to discuss what you would like to change.

```

### Few Screenshots

![Home](/screenshots/1.png "Home")
![Gallery](/screenshots/2.png "Gallery")
![Register](/screenshots/3.png "Register")
![Dashboard](/screenshots/4.png "Dashboard")


## Features

- Latest features of JavaScript i.e. ES6, ES7, ES8 is used
- [React JS Hooks](https://reactjs.org/docs/hooks-intro.html) are used with Functional components
- ES8 `async/await` is used

<br/>

<ul>
 <li> This is basically like a Tinder platform but for your pets to play and fool around. </li>
 <li> It is a Full Stack Application </li>
</ul>

- All the user details, chats and matches are stored in the [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

<ul>
 <li>Login/Signup as well as Logout feature is added </li>
 <li>Guest User Login added</li>
 <li>Error will be shown if the credentials are not correct</li>

 <li> Choose your gender, species and who do you want to match with. </li>
 <li> Functionality and features like swipe left and right, view information of desired pets and swipe accordingly. </li>   
 <li> Send messages and have a chat with matched up pets. </li>
 <li> If not sure about your decision, remove the matched up pets. </li>
 <li> All the conversation are stored. matches and onformation in the database i.e. <i>persistant</i>
</ul>


## Tech Stack

MongoDB, Express, React, Node, Socket.IO, Chakra-UI