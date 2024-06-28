const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Invoice = require('../models/Invoice');
const cloudinary = require('../utils/Cloudinary');

const router = express.Router();

// Cloudinary Storage Configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'invoices',
    allowed_formats: ['pdf'],
  },
});
const upload = multer({ storage: storage });

// Route for uploading and storing invoices
router.post('/upload-invoice', upload.single('pdf'), async (req, res) => {
  try {
    const { customerName, mobileNumber } = req.body;
    const newInvoice = new Invoice({
      filePath: req.file.path,
      publicId: req.file.filename, // Store the public_id
      customerName,
      mobileNumber,
    });

    await newInvoice.save();
    console.log("Invoice uploaded and saved successfully.");
    res.status(201).json({ message: 'Invoice uploaded and saved successfully', invoice: newInvoice });
  } catch (error) {
    console.log("Error uploading invoice.");
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// Route for getting all invoices
router.get('/', async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.status(200).json(invoices);
    console.log("Invoices retrieved successfully.");
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// Route for getting a specific invoice by ID
router.get('/:id', async (req, res) => {
  try {
    const invoiceId = req.params.id;
    const invoice = await Invoice.findById(invoiceId);
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// Route for deleting an invoice by ID
router.delete('/:id', async (req, res) => {
  try {
    const invoiceId = req.params.id;
    const deleteInvoice = await Invoice.findById(invoiceId);
    if (!deleteInvoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    // Delete file from Cloudinary
    await cloudinary.uploader.destroy(deleteInvoice.publicId);

    // Delete invoice from database
    await Invoice.findByIdAndDelete(invoiceId);
    console.log('Invoice deleted successfully.');

    res.status(200).json({ message: 'Invoice deleted successfully', deletedInvoice: deleteInvoice });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

module.exports = router;
