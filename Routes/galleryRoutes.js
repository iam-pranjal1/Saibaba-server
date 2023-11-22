import express from 'express';
import Gallery from  "../Model/galleryModel.js";

const router = express.Router();


// Handle POST Request
router.post('/createGallery', async (req, res) => {
  const data = req.body;
  const { image, title, category } = data;

  try {
    const galleryItem = new Gallery({ image, title, category });
    await galleryItem.save();
    res.status(200).json({ message: 'Data inserted successfully.', status: true });
  } catch (err) {
    res.status(500).json({ message: 'MongoDB Query Failed.', status: false });
  }
});

// Handle GET Request
router.get('/getallgallery', async (req, res) => {
  try {
    const galleryItems = await Gallery.find();
    if (galleryItems.length > 0) {
      res.status(200).json(galleryItems);
    } else {
      res.status(404).json({ message: 'Nothing Found.', status: false });
    }
  } catch (err) {
    res.status(500).json({ message: 'MongoDB Query Failed.', status: false });
  }
});

// Handle DELETE Request
router.delete('deleteGallery/:id', async (req, res) => {
  const id = req.params.id;

  try {
    await Gallery.findByIdAndRemove(id);
    res.status(200).json({ message: 'Data deleted successfully.', status: true });
  } catch (err) {
    res.status(500).json({ message: 'MongoDB Query Failed.', status: false });
  }
});

// Handle PUT Request
router.put('updateGallery/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const { image, title, category } = data;

  try {
    await Gallery.findByIdAndUpdate(id, { image, title, category });
    res.status(200).json({ message: 'Data updated successfully.', status: true });
  } catch (err) {
    res.status(500).json({ message: 'MongoDB Query Failed.', status: false });
  }
});

export default router;