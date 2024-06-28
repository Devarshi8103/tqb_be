const mongoose = require('mongoose');

const ExpenseDataSchema = new mongoose.Schema(
  {  
      customerName: {
          type: String,
      },
      mobileNumber: {
          type: Number,
      },
      
        category:{
    type : String,
        },
      
      productName: {
          type: String,
          required: true,
      },
      price: {
          type: String,
          required: true,
      },
      weight: {
          type: String,
      },
      flavour:{
        type:String ,

      },
      quantity: {
          type: Number,
      },
      createdAt: {
          type: Date,
          default: Date.now,
      },
  },
  {
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
  }
);

// Virtual for formatted date
ExpenseDataSchema.virtual('formattedDate').get(function() {
    return this.createdAt.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
});

module.exports = mongoose.model('Expense_Data', ExpenseDataSchema);
