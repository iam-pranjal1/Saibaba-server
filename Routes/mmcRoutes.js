// sairamRoutes.js
import express from 'express';
import mmcModel from '../Model/mmcModel.js'; 

const router = express.Router();

// Create a new MMC item
router.post('/createMmc', async (req, res) => {
  try {
    const mmcItem = new mmcModel(req.body);
    const savedMMCItem = await mmcItem.save();
    res.status(201).json(savedMMCItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Retrieve all MMC items
router.get('/getallMmc', async (req, res) => {
  try {
    const mmcItems = await mmcModel.find();
    res.status(200).json(mmcItems);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Retrieve a single MMC item by ID
router.get('/getSingleMmc/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const mmcItem = await mmcModel.findById(id);
    if (!mmcItem) {
      return res.status(404).json({ message: 'MMC item not found' });
    }
    res.status(200).json(mmcItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an MMC item by ID
router.put('/updateMmc/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const updatedMMCItem = await mmcModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedMMCItem) {
      return res.status(404).json({ message: 'MMC item not found' });
    }
    res.status(200).json(updatedMMCItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an MMC item by ID
router.delete('/deleteMmc/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deletedMMCItem = await mmcModel.findByIdAndDelete(id);
    if (!deletedMMCItem) {
      return res.status(404).json({ message: 'MMC item not found' });
    }
    res.status(200).json({ message: 'MMC item deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
