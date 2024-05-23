const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// Sign Up

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashpassword = bcrypt.hashSync(password);
    const user = new User({ username, email, password: hashpassword });
    await user
      .save()
      .then(() =>
        res.status(200).json({ message: "User has been registered" }),
      );
  } catch (error) {
    console.log(error);
    res
      .status(200)
      .json({ message: "The username/email has already been registered!" });
  }
});

// Sign In

router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(200).json({ message: "Please Signup first!" });
    }

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      res.status(200).json({ message: "Incorrect Password" });
    }

    // To Display every detail of the user other than password
    const { password, ...others } = user._doc;
    res.status(200).json({ others });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
