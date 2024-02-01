const authController = require('./auth.controller'); // Import the functions

// Example usage in a user authentication function
const token = authController.signToken(userId);

// Example usage in a route that verifies a token
authController.verifyToken(token, (err, decoded) => {
  if (err) {
    // Token verification failed
  } else {
    // Token is valid, and 'decoded' contains the payload
  }
});
