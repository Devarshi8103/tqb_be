
// index.js

const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const products = require('./routes/Products');
const invoice = require('./routes/Invoice');
const carousel = require('./routes/Carousel');
const expenseData  = require('./routes/ExpenseData');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB Connection
mongoose.connect(process.env.MONGODB_CONNECT_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error("error", err));

// Middleware
app.use(cors());
app.use(express.json());

// Import and use product routes
app.use('/', products);
app.use('/invoice', invoice);
app.use('/', carousel);0
app.use('/expense', expenseData);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
