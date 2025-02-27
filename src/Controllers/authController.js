const admin = require("../Config/firebaseAdmin");

exports.verifyUser = async (req, res) => {
  try {
    const user = req.user; // User data from middleware
    res.json({ message: "User verified", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
