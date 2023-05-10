const jwt = require("jsonwebtoken");

const secret = "mysecretkey"; // replace with your own secret key

// Function to generate a JWT token
const generateToken = (user) => {
  const token = jwt.sign({ userId: user.id }, secret, { expiresIn: "1h" });
  return token;
};

// Middleware function to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  // Get the authorization header from the request
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  // Get the JWT token from the authorization header
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  try {
    // Verify the JWT token
    const decodedToken = jwt.verify(token, secret);
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid authorization token" });
  }
};

module.exports = {
  generateToken,
  isAuthenticated,
};
