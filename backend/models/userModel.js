import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
// defining a structure of user collection
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timeStamps: true,
  }
);

//attaching a matchPassword method to the user schema to match passwords
//returns a boolean
//this method is called from userRoutes LOGIN API

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

//For Hashing a passowrd before it is saved to the DB
//returns a HASH
//this method is called from userRoutes SIGNUP API

userSchema.pre("save", async function (next) {
  const salt = await bcryptjs.genSalt(10);
  console.log(salt);
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

const USER = mongoose.model("Users", userSchema);

export default USER;
