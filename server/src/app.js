require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database');

// Initialize express
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());

// Database synchronization and server start
async function startServer() {
    try {
      await sequelize.sync({ logging: console.log });
      console.log('Database synchronized successfully');
      app.listen(PORT, () => {
        console.log(`Server is running and listening on port ${PORT}`);
      });
    } catch (error) {
      console.error('Error occurred while synchronizing database:', error);
    }
  }
  
  startServer();