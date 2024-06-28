const express = require('express');
const router = express.Router();
const ExpenseModal = require('../models/ExpenseData');


// @route   POST /api/expenses/add-expense
// @desc    Add a new expense
// @access  Public
router.post('/add-expense', async (req, res) => {
  const { customerName, mobileNumber, category,productName, price, weight, quantity, flavour } = req.body;

  try {
    const newExpenseData = new ExpenseModal({
      customerName,
      mobileNumber,
      category,
      productName,
      price,
      weight,
      flavour,
      quantity,
    });
console.log(newExpenseData);
    const expenseData = await newExpenseData.save();
    res.json(expenseData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/expenses
// @desc    Get all expenses
// @access  Public
router.get('/expense-data', async (req, res) => {
  try {
    const expenses = await ExpenseModal.find();
    res.json(expenses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/expenses/:id
// @desc    Delete an expense by ID
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    // const expense = await ExpenseData.findById(req.params.id);

    const expenseId = req.params.id;

  const deleteExpense = await ExpenseModal.findByIdAndDelete(expenseId);

    if (!deleteExpense) {
      return res.status(404).json({ msg: 'Expense not found' });
    }

   res.status(200).json({message:'product Deleted Successfully',deleteExpense});
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Expense not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
