//Following is the new way of importing packages
//ES6 Module syntax
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/dbConnection.js";
import userRoutes from "./routes/userRoutes.js";
import profRoutes from "./routes/professorRoutes.js";
import schoolRoutes from "./routes/schoolRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import bookmarkRoutes from "./routes/bookmarkRoutes.js";
import passwordRoutes from './routes/passwordRoutes.js';
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
// ======================>CheckPoint 1<=====================

app.use("/api/users", userRoutes);
app.use("/api/school", schoolRoutes);



app.use("/api/prof", profRoutes);
// ======================>CheckPoint 2<=====================
app.use("/api/reviews", reviewRoutes);



app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/password", passwordRoutes);

// ======================>CheckPoint 3<=====================

// app.use("/api/produst", productRoutes);
//this app is an EXpress APP ,
app.use(notFound);
// so errorHandler give a nice formatting to the erorr
app.use(errorHandler);
app.listen(8000, () => console.log("Server is listening on PORT 8000"));
