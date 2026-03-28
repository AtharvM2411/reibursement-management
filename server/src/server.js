const app = require('./app');
const dotenv = require('dotenv');
const db = require('./config/db');

dotenv.config();

const PORT = process.env.PORT || 3001;

// Connect to database
db.connect();

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
