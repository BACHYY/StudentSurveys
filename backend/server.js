//Following is the new way of importing packages
//ES6 Module syntax
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/dbConnection.js";
import userRoutes from "./routes/userRoutes.js";
import profRoutes from "./routes/professorRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
dotenv.config();
// Fix env configuration

//This is an Express App
const app = express();
connectDB();
//Express middleware to parse the body from the incoming request
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
// console.log(process.env.mongoURI);

//tales 2 arguments
//1: Route name
//2: Callback function that gets executed when a request is received
app.get("/", (req, res) => {
  res.send({
    msg: "Server is running",
  });
});

//request for root server adrees

app.use("/api/users", userRoutes);
app.use("/api/prof", profRoutes);
// app.use("/api/produst", productRoutes);
//this app is an EXpress APP ,
app.use(notFound);
app.use(errorHandler);
app.listen(8000, () => console.log("Server is listening on PORT 8000"));
