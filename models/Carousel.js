const mongoose = require('mongoose');

const CarouselSchema = new mongoose.Schema({
    carouselImage: {
        type: String,
        required: true, // Fixed typo: 'require' to 'required'
    },
    publicId: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Carousel_Images', CarouselSchema);
