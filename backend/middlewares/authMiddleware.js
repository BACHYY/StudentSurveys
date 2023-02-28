import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// it verifies the login token proviided by the JWT
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    console.log("tokennn");
    console.log(req.headers.authorization);
    ///Beare djdjffjfjfjfjfjfjfj
    //["Bearer", "sjjdjdjdjjfjdjdj"]
    try {
<<<<<<< HEAD
      token = req.headers.authorization.split(" ")[-1];
=======
      token = req.headers.authorization.split(" ")[1];
>>>>>>> 3a2e329226b8cf346972b974527084079668ac34

      //we verify the coming token with JWT Secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log({ decoded });
      //appending the request object with USER
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { protect, admin };
