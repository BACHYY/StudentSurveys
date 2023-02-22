import mongoose from "mongoose";

//what is synchronous JS
//async is all about promise
//what is asynchornous JS

//connecting to the mongoDb Database using mongoose
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://ahmed:123@fypcluster.1p3qom1.mongodb.net/?retryWrites=true&w=majority",
      {}
    );
    console.log("MongoDB connected", conn.connection.host);
  } catch (err) {
    console.log(err);
  }
};

//by exporting , this function becmoes available in other files to use
export default connectDB;
