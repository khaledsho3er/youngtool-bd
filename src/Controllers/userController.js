const admin = require("../Config/firebaseAdmin");
const User = require("../models/users");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { email, name, role, status, phoneNumber } = req.body;
    const token = req.headers.authorization?.split(" ")[1] || req.body.token;

    // Verify Firebase Token
    const decodedToken = await admin.auth().verifyIdToken(token);
    if (!decodedToken)
      return res.status(401).json({ message: "Unauthorized - Invalid token" });

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Save to MongoDB
    const newUser = new User({
      firebaseId: decodedToken.uid,
      email,
      name,
      phoneNumber,
      role,
      status,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully!", user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { firebaseToken } = req.body;

  try {
    // Verify Firebase token
    const decodedToken = await admin.auth().verifyIdToken(firebaseToken);
    const firebaseUID = decodedToken.uid;

    // Find user in MongoDB
    let user = await User.findOne({ firebaseUID });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Generate JWT for backend authentication
    const token = jwt.sign({ uid: firebaseUID, role: user.role }, "secretKey", {
      expiresIn: "1h",
    });

    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-__v"); // Exclude `__v` field
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
