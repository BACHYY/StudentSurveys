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
  },
  {
    timeStamps: true,
  }
);

//attaching a matchPassword method to the user schema to match passwords
//returns a boolean
//this method is called from userRoutes LOGIN API
// userSchema.methods.matchPassword =
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcryptjs.compare(enteredPassword, this.password);
// };

//For Hashing a passowrd before it is saved to the DB
//returns a HASH
//this method is called from userRoutes SIGNUP API

userSchema.pre("save", async function (next) {
  const salt = await bcryptjs.genSalt(10);
  this.password = bcryptjs.hash(this.password, salt);
});

const USER = mongoose.model("Users", userSchema);

export default USER;
