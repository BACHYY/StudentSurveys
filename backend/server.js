//Following is the new way of importing packages
//ES6 Module syntax
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/dbConnection.js";
import userRoutes from "./routes/userRoutes.js";
// dotenv.config();
// Fix env configuration

//This is an Express App
const app = express();
connectDB();
// console.log(process.env.mongoURI);

//tales 2 arguments
//1: Route name
//2: Callback function that gets executed when a request is received
app.get("/user", (req, res) => {
  console.log(typeof req);
  console.log(typeof res);
  //create user object
  const user = {
    name: "Ahmed",
    email: "ahmed@gmail.com",
  };

  res.status(200).json(user);

  //   console.log("USER ");
});

//request for root server adrees

app.use(userRoutes);
//this app is an EXpress APP ,

app.listen(8000, () => console.log("Server is listening on PORT 8000"));
