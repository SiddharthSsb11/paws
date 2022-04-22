const path = require("path");
const express = require("express");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
//const cors = require("cors");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const HttpError = require("./http-error");

//const { application } = require("express");
dotenv.config();
const uri = process.env.URI;
const app = express();
//app.use(cors());
app.use(express.json()); // to accept json data from req body sent from fe
//const PORT = process.env.PORT || 5000;

//CORS
/* app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT"
  );

  next();
});  */ 

app.get("/users", async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("datingDB");
    const users = database.collection("users");
    const returnedUsers = await users.find().toArray();
    //const returnedUsers = await users.find();
    res.json(returnedUsers); //res.send(returnedUsers);
  } finally {
    await client.close();
  }
  //res.json
});

//Signup
app.post("/signup", async (req, res) => {
  const client = new MongoClient(uri);
  const {
    name,
    email,
    password,
    about,
    day,
    month,
    year,
    genderShow,
    gender,
    species,
    speciesInterest,
    imageUrl,
    matches,
  } = req.body;

  //console.log("body data snt from fe",req.body);

  const generatedUserId = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await client.connect();
    const database = client.db("datingDB");
    const users = database.collection("users");

    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return res.status(400).send("User already exist.");
    }
    const sanitizedEmail = email.toLowerCase();

    const data = {
      user_id: generatedUserId,
      email: sanitizedEmail,
      hashed_password: hashedPassword,
      name: name,
      about,
      day,
      month,
      year,
      genderShow,
      gender,
      species,
      interest: speciesInterest,
      url: imageUrl,
      matches,
    };

    const insertedUser = await users.insertOne(data);
    //console.log("user details being saved", data);

    const token = jwt.sign(insertedUser, sanitizedEmail, {
      expiresIn: 60 * 24,
    });

    res.status(201).json({
      token,
      userId: generatedUserId,
      email: sanitizedEmail,
      userDetails: data,
    });
  } catch (err) {
    console.log(err);
  }finally {
    await client.close();
  }
});

//login
app.post("/login", async (req, res, next) => {
  const client = new MongoClient(uri);
  const { email, password } = req.body;

  try {
    await client.connect();
    const database = client.db("datingDB");
    const users = database.collection("users");

    const user = await users.findOne({ email });
    //console.log("user found", user);
    const correctPassword = await bcrypt.compare(
      password,
      user.hashed_password
    );

    if (user && correctPassword) {
      const token = jwt.sign(user, email, { expiresIn: 60 * 24 });
      return res
        .status(201)
        .json({ token, userId: user.user_id, email, userDetails: user });
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    /* return next(
      new HttpError("Logging in failed, please try again later.", 500)
    ); */
    console.log(err);
  }finally {
    await client.close();
  }
});

//getting user
app.get("/user", async (req, res) => {
  const client = new MongoClient(uri);
  const userId = req.query.userId; //req.params.userId //try sendign within the req url frm fe

  try {
    await client.connect();
    const database = client.db("datingDB");
    const users = database.collection("users");

    const query = { user_id: userId };
    const user = await users.findOne(query);
    //console.log(user);
    res.send(user);
  } finally {
    await client.close();
  }
});

//PREFFERED USERS
app.get("/preferredUsers", async (req, res) => {
  const client = new MongoClient(uri);
  const interest = req.query.interest;
  console.log("interest ", interest);

  try {
    await client.connect();
    const database = client.db("datingDB");
    const users = database.collection("users");

    const query = { species: interest }; // species: { $eq : 'dog'} // species: interest
    const preferredUsers = await users.find(query).toArray();
    //console.log("prefered users",preferredUsers)
    res.send(preferredUsers);
  } finally {
    await client.close();
  }
});


//ADDING A MATCH
app.put("/addmatch", async (req, res) => {
  const client = new MongoClient(uri);
  const { userId, matchedUserId } = req.body;

  try {
    await client.connect();
    const database = client.db("datingDB");
    const users = database.collection("users");

    const query = { user_id: userId };
    const updateDocument = { $push: { matches: { user_id: matchedUserId } } };
    const user = await users.updateOne(query, updateDocument);
    const updatedUserWithMatches = await users.findOne(query);
    //console.log(updatedUserWithMatches);

    //res.send(user);
    res.send(updatedUserWithMatches);
  } finally {
    await client.close();
  }
});

//deleting a matched
app.put("/deletematch", async (req, res) => {
  const client = new MongoClient(uri);
  const { userId, deleteMatchId } = req.body;

  try {
    await client.connect();
    const database = client.db("datingDB");
    const users = database.collection("users");

    const query = { user_id: userId };

    /*     const user = await users.findOne(query);
    user.matches = user.matches.filter( ({ user_id }) => user_id !== deleteMatchId );
    await user.save();
    console.log(user); */

    const updateDocument = { $pull: { matches: { user_id: deleteMatchId } } };
    const user = await users.updateOne(query, updateDocument);
    const updatedUser = await users.findOne(query);
    //console.log("match removed", updatedUser);

    res.send(updatedUser);
  } finally {
    await client.close();
  }
});

//getting matchedProfiles
app.get("/matchedusers", async (req, res) => {
  const client = new MongoClient(uri);
  const matchedUsersIds = JSON.parse(req.query.matchedUsersIds);
  //console.log(matchedUsersIds);
  try {
    await client.connect();
    const database = client.db("datingDB");
    const users = database.collection("users");

    const pipeline = [
      {
        $match: {
          user_id: {
            $in: matchedUsersIds,
          },
        },
      },
    ];

    const matchedUsers = await users.aggregate(pipeline).toArray();
    //console.log("matched users",matchedUsers);
    res.send(matchedUsers);
  } finally {
    await client.close();
  }
});

//getting messages
app.get("/messages", async (req, res) => {
  const client = new MongoClient(uri);
  const { userId, correspondingUserId } = req.query;
  //console.log(userId, correspondingUserId);

  try {
    await client.connect();
    const database = client.db("datingDB");
    const messages = database.collection("messages");
    const query = {
      from_userId: userId,
      to_userId: correspondingUserId,
    };
    const foundMessages = await messages.find(query).toArray();
    res.send(foundMessages);
  } finally {
    await client.close();
  }
});

//adding a message
app.post("/message", async (req, res) => {
  const client = new MongoClient(uri);
  const message = req.body.message;

  try {
    await client.connect();
    const database = client.db("datingDB");
    const messages = database.collection("messages");

    const adddedMessage = await messages.insertOne(message);
    //console.log(adddedMessage);
    res.send(adddedMessage);

  } finally {
    await client.close();
  }
});


///deployment
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );

} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

//Unknow route error handling
/* app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});


app.use((error, req, res) => {
  /* if (res.headerSent) {
    console.log(error);
  } */
  ///this check is necessary for scenarios where a response header has already been sent but you encounter
  //an error while streaming the response to a client
  //Then, you forward the error encountered to the default express error handler that will handle it for you

  //res.status(error.code || 500);
  //res.json({ message: error.message || "An unknown error occurred!" });
//}); */

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("Server started on PORT 5000"));
