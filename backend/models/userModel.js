import bcryptjs from "bcryptjs";
import mongoose from "mongoose";
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
    securityQuestion: {
      type: String,
      required: true,
    },
    securityAnswer: {
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
    bookmarkedReviews: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

//attaching a matchPassword method to the user schema to match passwords
//returns a boolean
//this method is called from userRoutes LOGIN API

userSchema.methods.matchPassword = async function (enteredPassword) {
  const isMatch = await bcryptjs.compare(enteredPassword, this.password);
  console.log({ isMatch, thisPassword: this.password, enteredPassword });
  return isMatch;
};

//For Hashing a passowrd before it is saved to the DB
//returns a HASH
//this method is called from userRoutes SIGNUP API

userSchema.pre("save", async function (next) {
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

const USER = mongoose.model("Users", userSchema);

export default USER;
