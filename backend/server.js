const express = require("express");
const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://sidssb11:merndating@cluster0.pzobw.mongodb.net/datingDB?retryWrites=true&w=majority";
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { application } = require("express");

const app = express();
app.use(cors());
const PORT = 5000;
app.use(express.json()); // to accept json data from req body sent from fe

//CORS
app.use((req, res, next) => {
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
});

app.get("/", (req, res) => {
  res.json("done done");
});

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

    res
      .status(201)
      .json({
        token,
        userId: generatedUserId,
        email: sanitizedEmail,
        userDetails: data,
      });
  } catch (err) {
    console.log(err);
  }
});

//login
app.post("/login", async (req, res) => {

  const client = new MongoClient(uri);
  const { email, password } = req.body;

  try {

    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const user = await users.findone({ email });

    const correctPassword = await bcrypt.compare( password, user.hashed_password );

    if (user && correctPassword) {
      const token = jwt.sign(user, email, { expiresIn: 60 * 24 });
      res.status(281).json({ token, userId: user.user_id, email });
    }
    res.status(400).send("Invalid Credentials");

  } catch (err) {
    console.Log(err);
  }
});

app.listen(PORT, () => console.log("Server started on PORT 5000"));
