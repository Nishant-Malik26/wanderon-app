const express = require("express");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwttoken = require("jsonwebtoken");
const router = express.Router();

const passwordRegex =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

// @GET to fetch user
router.get("/", auth, async (req, res) => {
  try {
    // fetch user
    const user = await User.findById(req.user.id).select("-password");
    // check if user is available
    if (!user) {
      return res.status(400).json({ msg: "User Not Found" });
    } else return res.status(200).json({ user });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// @POST to login
router.post(
  "/",
  [
    check("email", "Email is not in correct format").trim().isEmail(),
    check("password", "Password length should be greater than 6")
      .trim()
      .isLength({ min: 8, max: 16 })
      .withMessage("Password length should be between 8 and 16 characters")
      .matches(passwordRegex)
      .withMessage(
        "Password must contain at least one number, one lowercase letter, one uppercase letter, one special character, and no spaces"
      ),
  ],
  async (req, res) => {
    const error = validationResult(req);
    // checking for errors
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    try {
      const { password, email } = req.body;
      // find user by email id
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User Doesn't Exist" }] });
      }
      // comparing hashed password
      const isPassCorrect = await bcrypt.compare(password, user.password);

      if (isPassCorrect) {
        const payload = {
          user: {
            id: user.id,
          },
        };
        // setting cookies and sending auth token to client
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

              res
                .status(200)
                .json({ msg: "User Succesfully logged in", token });
            }
          }
        );
        // Sending same msg for any error for security reason while logging in
      } else {
        res.status(500).json({ errors: [{ msg: "Incorrect Credentials" }] });
      }
    } catch (err) {
      res.status(500).json({ errors: [{ msg: "Incorrect Credentials" }] });
    }
  }
);

module.exports = router;
