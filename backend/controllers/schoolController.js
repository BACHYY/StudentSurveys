import SCHOOL from "../models/schoolModel.js";
import asyncHAndler from "express-async-handler";
import bcrypt from "bcryptjs";
import { escapeRegex } from "../utils/utils.js";
import generateToken from "../utils/generateToken.js";

const registerSchool = asyncHAndler(async (req, res) => {
  const { name, city, state, country } = req.body;

  //findOne method from mongooose to get only one document
  //this method takes an object for where clause
  const schoolExists = await SCHOOL.findOne({ name: name });
  console.log({ schoolExists });
  if (schoolExists) {
    res.status(400);
    throw new Error(" School already exists");
    // .json({
    //   error: "",
    // });
  }
  //if the key value pairs are same , write like this
  const school = {
    name,
    city,
    state,
    country,
  };
  //user creation is a Promise, so we have to wrtie it try cathc.
  //and catch the error if something goes wrong
  const createdSchool = await SCHOOL.create(school);

  if (createdSchool) {
    res.status(201).json({
      school: createdSchool,
      msg: "School created",
    });
  }
});

const deleteSchool = asyncHAndler(async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const school = await SCHOOL.findById(id);
  if (school) {
    await school.remove();
    res.json({
      message: "School removed",
    });
  } else {
    res.status(404);
    res.json({
      error: "School not found",
    });
  }
});

const updateSchool = asyncHAndler(async (req, res) => {
  const { id } = req.params;
  const school = await SCHOOL.findById(id);
  if (school) {
    //if user opts to uptae it's name then we will get name from body
    //otherwise we use the same/existing name
    school.name = req.body.name || school.name;
    school.city = req.body.city || school.city;
    school.state = req.body.state || school.state;
    school.country = req.body.country || school.country;

    const updatedSchool = await school.save();

    res.json({
      message: "School details updated successfully",
      school: updatedSchool,
    });
  } else {
    res.status(404);
    res.json({
      error: "School not found",
    });
  }

  //   const user = await USER.findOne({ email });
  //   if (user && (await user.matchPassword(password))) {
  //     res.json({
  //       _id: user._id,
  //       name: user.name,
  //       email: user.email,
  //       isAdmin: user.isAdmin,
  //     });
  //   } else {
  //     res.status(401).json({
  //       error: "Invalid email or password",
  //     });
  //   }
});

const searchSchool = async (req, res, next) => {
  const search = req.query.name; // assuming the search query parameter is named 'name'
  const regex = new RegExp(escapeRegex(search), "gi"); // this makes regex and is provided to the find function to search professors by name
  console.log({ search });
  try {
    // const users = await USER.find({ search: { $regex: search, $options: "i" } }); // using regex to search for searchs that contain the given search query
    // const users = await USER.find({ search: regex });
    let schools = await SCHOOL.find({ $text: { $search: search } });

    console.log({ schools });
    console.log("fullText search");

    if (schools.length === 0) {
      console.log("regex search");
      console.log(regex);
      schools = await SCHOOL.find({
        $or: [{ name: regex }],
      });
    }
    res.status(200).json(schools);
  } catch (error) {
    next(error);
  }
};

export { registerSchool, deleteSchool, updateSchool, searchSchool };
