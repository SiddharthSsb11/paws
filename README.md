# Paws
> Finding Playmates or Dates for your Pets.

A fully-feautred platform for Dating or finding Playmates for your Pets.
Match up with local pets and pet lovers for friendship, play-dates or fun
outdoor playing.
```
Currently working on Client and Server side Code 
for Editing user's profile feature of this application.

In case you find any bugs you can report it to me.
Pull requests are always welcome. For major changes, 
please open an issue first to discuss what you would like to change.
```
### Few Screenshots

![Home](/screenshots/1.png "Home")
![Gallery](/screenshots/2.png "Gallery")
![Register](/screenshots/3.png "Register")
![Dashboard](/screenshots/5.png "Dashboard")
![Dashboard](/screenshots/6.png "Dashboard")

<hr>

### Hosted/Deployed

https://paws-mern-dating.herokuapp.com/


### Demo Video

https://www.loom.com/share/35d07a7c96ed4aa5954b99a05142eada

### Tech Stack

<table width="1000">
	<tr>
		<td align="center"><a href="https://www.mongodb.com/"><img src="https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg" width="80px;" height="75px;" style="border-radius: 8px;" alt="Sass"/><br /><b><font color="#777">MongoDB</font></b></a></td>
        <td align="center"><a href="https://www.apollographql.com/"><img src="https://cdn.worldvectorlogo.com/logos/express-109.svg" width="75px;"  alt="Express JS"/><br /><b><font color="#777">ExpressJS</font></b></a></td>
        <td align="center"><a href="https://reactjs.org/"><img src="https://cdn.worldvectorlogo.com/logos/react-2.svg" width="110px;" height="75px;" alt="Javascript"/><br /><b><font color="#777">React</font></b></a></td>
        <td align="center"><a href="https://nodejs.org/en/"><img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" width="75px;" height="75px;" alt="NodeJS"/><br /><b><font color="#777">NodeJS</font></b></a></td>
		<td align="center"><a href="https://chakra-ui.com/"><img src="https://avatars.githubusercontent.com/u/54212428?s=280&v=4" width="75px;" height="75px;" alt="Socket.IO"/><br /><b><font color="#777">ChakraUI</font></b></a></td>
	</tr>	
</table>

### Features

- Latest features of JavaScript i.e. ES6, ES7, ES8 is used
- [React JS Hooks](https://reactjs.org/docs/hooks-intro.html) are used with Functional components
- ES8 `async/await` is used
- [React Error Boundaries](https://reactjs.org/docs/error-boundaries.html) and [Code Splitting](https://reactjs.org/docs/code-splitting.html) is used for enhancing application performance.
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
 <li> Option for you to choose between to show or not to show your gender on your profile. </li>
 <li> Functionality and features like swipe left and right, view information of desired pets and swipe accordingly. </li>   
 <li> Send messages and have a chat with matched up pets. </li>
 <li> If not sure about your decision, remove the matched up pets. </li>
 <li> All the conversation are stored. matches and onformation in the database i.e. <i>persistant</i>
 
</ul>


## Usage

**Test users**

| Email | Password  |
| -------- | --------- |
| test12@test.com | test |
| duke@test.com | testtest |

``` Or Use the guest user login feature.  ```

### Clone the repository:
```
git clone https://github.com/SiddharthSsb11/mern-project-paws.git
```

### Env Variables

Create a .env file in the root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = <yourMongoDbUri>
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run
Run frontend (:3000) & backend (:5000)
```
# Run frontend only
cd frontend
npm start 

# Run backend only
npm start
```

## Build & Deploy

```
# Create frontend production build
cd frontend
npm run build
```

There is a Heroku postbuild script, so if you push to Heroku, no need to build manually for deployment to Heroku