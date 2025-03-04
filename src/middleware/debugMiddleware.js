const debugAuthHeader = (req, res, next) => {
  console.log("Authorization Header:", req.headers.authorization || "None");
  next();
};
module.exports = debugAuthHeader;
