const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var { randomBytes } = require("crypto");
const { isNullOrEmpty } = require("../utils/utils");

module.exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("Invalid email or password.");
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).send("Invalid email or password.");

    const refreshToken = jwt.sign(
      { _id: user._id },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // Generate access token
    const accessToken = jwt.sign(
      { _id: user._id },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: "15m",
      }
    );

    res.cookie("Cookie", refreshToken, {
      httpOnly: true, //optinal keep it true
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      secure: true, // optinal
      sameSite: "strict",
      path: "/",
      // domain: "*http://localhost:3000", //optional
    });

    const session = await {
      ...req,
      session: { csrf: randomBytes(100).toString("base64") },
    };
    return res.json({ accessToken, message: "login successfully" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports.signup = async (req, res) => {
  const { name, password, email, phone, address } = req.body;
  try {
    // Check if user with the given email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ error: "User with the given email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await User.create({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    });
    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
