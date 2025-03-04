// const admin = require("../Config/firebaseAdmin");

// const verifyToken = async (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1]; // Extract token

//   if (!token) return res.status(401).json({ message: "Unauthorized - No token provided" });

//   try {
//     const decodedToken = await admin.auth().verifyIdToken(token);
//     req.user = decodedToken; // Attach user data to the request
//     next();
//   } catch (error) {
//     console.error("Token verification failed:", error);
//     res.status(403).json({ message: "Invalid or expired token" });
//   }
// };

// module.exports = verifyToken;
const admin = require("../Config/firebaseAdmin");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Authorization Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Extracted Token:", token);

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log("Decoded Token:", decodedToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Token Verification Failed:", error);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
module.exports = verifyToken;
