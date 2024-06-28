const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const  cloudinary =  require('../utils/Cloudinary');
const Carousel  = require('../models/Carousel');

const router = express.Router();

const storage = new CloudinaryStorage({
    cloudinary:  cloudinary,

    params:{
        folder : 'Carousel_Images',
        allowed_formats : ['jpg' , 'png'],

    }

})

const upload = multer({storage : storage});

router.post('/upload-carousel-images' , upload.single('image') , async (req , res)=>{

try {
    
    const newCarousel = new Carousel(
    {   carouselImage : req.file.path ,
      publicId:req.file.filename


     }
    );

await newCarousel.save();
console.log("done");

res.status(201).json({ message: 'images uploaded and saved successfully', Carousel: newCarousel });
} catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
    
}

} );

router.get('/carousel-images', async (req, res) => {
    try {
      const carouselImage = await Carousel.find({});
      res.status(200).json(carouselImage);
    } catch (error) {
      res.status(500).json({ error: 'Server error', message: error.message });
    }
  });

  router.delete('/delete-carousel-image/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const imageToDelete = await Carousel.findById(id);
        if (!imageToDelete) {
            return res.status(404).json({ message: 'Image not found' });
        }

        // Delete image from Cloudinary
        await cloudinary.uploader.destroy(imageToDelete.publicId);

        // Delete image from database
        await Carousel.findByIdAndDelete(id);
        console.log('Image deleted.');

        res.status(200).json({ message: 'Image deleted successfully', deletedImage: imageToDelete });
    } catch (error) {
        res.status(500).json({ error: 'Server error', message: error.message });
    }
});

module.exports = router;