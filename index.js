
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
mongoose.connect("mongodb+srv://tqb_db:qm2jSowGKXqpot1T@cluster0.kvrp1ht.mongodb.net/tqb_db?retryWrites=true&w=majority&appName=Cluster0", {
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
