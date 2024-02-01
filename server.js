// Import required modules
const express = require('express');
const cookieSession = require('cookie-session');
const cors = require('cors');
const db = require('./app/models'); // Import the models

// Create an Express app
const app = express();

// Initialize Sequelize and the models
db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

// Middleware setup
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests
app.use(cors()); // Enable CORS
app.use(
  cookieSession({
    name: 'session',
    keys: ['your-secret-key'],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

// Define a simple GET route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to your Node.js server!' });
});

// Import and use the authentication and authorization routes
require('./app/routes/auth.routes.js')(app);
require('./app/routes/user.routes.js')(app);
function initial() {
  db.role.create({
    id: 1,
    name: "user"
  });

  db.role.create({
    id: 2,
    name: "moderator"
  });

  db.role.create({
    id: 3,
    name: "admin"
  });
}


// Listen on port 8080 for incoming requests
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
