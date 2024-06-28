const cloudinary = require("cloudinary").v2;
require('dotenv').config();

const CLOUD_NAME = process.env.CLOUD_NAME;
const CLOUD_KEY = process.env.CLOUD_KEY;
const CLOUD_KEY_SECRET = process.env.CLOUD_KEY_SECRET;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_KEY,
  api_secret: CLOUD_KEY_SECRET,
});

module.exports = cloudinary;
