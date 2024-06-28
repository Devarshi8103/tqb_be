const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  filePath: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Invoice', invoiceSchema);
