const admin = require("../Config/firebaseAdmin");
const User = require("../models/users");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { email, name, role, status, phoneNumber } = req.body;
    const token = req.headers.authorization?.split(" ")[1] || req.body.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - Token missing" });
    }

    console.log("Received Token:", token);

    // Verify Firebase Token
    const decodedToken = await admin.auth().verifyIdToken(token);
    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    console.log("Decoded Token:", decodedToken);

    const { uid } = decodedToken;
    console.log("UID:", uid);

    if (!uid) {
      return res.status(400).json({ message: "UID is missing in the token." });
    }

    console.log("Saving to MongoDB...");

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user in MongoDB
    const newUser = new User({
      firebaseUID: uid, // Ensure UID is included
      email,
      name,
      role,
      status,
      phoneNumber,
    });

    await newUser.save();

    console.log("User registered successfully!");
    res
      .status(201)
      .json({ message: "User registered successfully!", user: newUser });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: error.message });
  }
};
exports.loginUser = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Get token from headers

  if (!token) {
    return res.status(401).json({ error: "Token is missing" });
  }

  try {
    // Verify Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token);
    const firebaseUID = decodedToken.uid;

    // Find user in MongoDB
    let user = await User.findOne({ firebaseUID });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Generate JWT for backend authentication
    const jwtToken = jwt.sign(
      { uid: firebaseUID, role: user.role },
      "secretKey",
      {
        expiresIn: "1h",
      }
    );

    res.json({ token: jwtToken, role: user.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.checkSession = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - Token missing" });
    }

    // Verify Firebase Token
    const decodedToken = await admin.auth().verifyIdToken(token);
    const firebaseUID = decodedToken.uid;

    // Find user in MongoDB
    const user = await User.findOne({ firebaseUID });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    res.json({ user }); // Send user data to frontend
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.logoutUser = (req, res) => {
  res.clearCookie("session");
  res.json({ message: "Logged out successfully" });
};
    exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-__v"); // Exclude `__v` field
    res.status(200).json(users);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

