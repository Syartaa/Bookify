require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database');
const userRoutes = require('../src/routes/user');

const user = require('./models/user');
const book = require('./models/book');
const category = require('./models/category');
const author = require('./models/author');
const loan = require('./models/loan');
const reservation = require('./models/reservation');
const fine = require('./models/fine');
const review = require('./models/review');
const favorite = require('./models/favortie');

const authorRoutes = require('./routes/author');
const categoryRoutes = require('./routes/category');
const bookRoutes = require('./routes/book');
const reservationRoutes = require('./routes/reservation');
const loanRoutes = require('./routes/loan');
const fineRoutes = require('./routes/fine');
const reviewRoutes = require('./routes/review');
const favoriteRoutes = require('./routes/favorite');
const contactRoutes = require('./routes/contactus');

const userAuthRoutes = require('./routes/auth/user.js');

 
// Initialize express
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: 'http://localhost:3000',  credentials: true, }));
app.use(bodyParser.json());

// Database synchronization and server start
async function startServer() {
    try {
      await sequelize.sync({logging: console.log,});
      console.log('Database synchronized successfully');
      app.listen(PORT, () => {
        console.log(`Server is running and listening on port ${PORT}`);
      });
    } catch (error) {
      console.error('Error occurred while synchronizing database:', error);
    }
  }

  app.use("/auth/user", userAuthRoutes);

  app.use(
    '/user',userRoutes
  )
  app.use('/author', authorRoutes);
  app.use('/category', categoryRoutes);
  app.use('/book', bookRoutes);
  app.use('/reservation', reservationRoutes);
  app.use('/loan', loanRoutes);
  app.use('/fine', fineRoutes);
  app.use('/review', reviewRoutes);
  app.use('/favorite', favoriteRoutes);
  app.use('/contactus', contactRoutes);

  app.use('/uploads', express.static('uploads'));

  
  startServer();