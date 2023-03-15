import User from "../models/userModel.js";

export async function forgotPassword(req, res) {
  try {
    const { email } = req.params;

    const securityQuestion = User.findOne({
      email: email,
    }).select("securityQuestion");

    res.status(200).json({
      securityQuestion,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
}

export async function verifyAnswer(req, res) {
  try {
    const { email } = req.params;
    const { securityAnswer } = req.body;

    const answer = await User.findOne({
      email: email,
    }).select("securityAnswer");

    if (answer === securityAnswer) {
      res.status(200).json({
        msg: "Correct Answer",
      });
    } else {
      res.status(400).json({
        msg: "Wrong Answer",
      });
    }
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
}

export async function resetPassword(req, res) {
  try {
    const { email } = req.params;
    const { password } = user.body;
    if (!password) {
      return res.status(400).json({
        error: "Please enter a password",
      });
    }

    const user = User.findOne({
      email: email,
    });

    user.password = password;

    const updatedUser = await user.save();

    res.json({
      message: "User password updated successfully",
      user: updatedUser,
    });

  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
}
