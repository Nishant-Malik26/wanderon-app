const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwttoken = require("jsonwebtoken");
const User = require("../../models/User");
const router = express.Router();

// @POST to register
router.post(
  "/",
  [
    check("name", "Name is required").trim().not().isEmpty(),
    check("email", "Email is not in correct format").trim().isEmail(),
    check("password", "Password length should be greater than 6")
      .trim()
      .isLength({
        min: 6,
      }),
  ],
  async (req, res) => {
    const error = validationResult(req);
    // to check errors
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    try {
      const { name, password, email } = req.body;
      // finding user via email
      let user = await User.findOne({ email });
      // checking if user already exists
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User Already Exists" }] });
      }

      user = new User({
        name,
        password,
        email,
      });
      const salt = await bcrypt.genSalt(10);
      //hashing password
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        user: {
          id: user.id,
        },
      };
      // generating auth token and sending client side
      jwttoken.sign(
        payload,
        "itsasecret",
        { expiresIn: 1800 },
        (err, token) => {
          if (err) {
            throw err;
          } else {
            res.cookie("token", token, {
              httpOnly: true,
              secure: true,
              sameSite: "Strict",
            });
            res.json({ token });
          }
        }
      );
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
