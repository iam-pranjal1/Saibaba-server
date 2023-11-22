// templeRoutes.js
import express from 'express';
import Temple from '../Model/templeModel.js';
const router = express.Router();
// Create a new temple
router.post('/createTemple', async (req, res) => {
  try {
    const temple = new Temple(req.body);
    const savedTemple = await temple.save();
    res.status(201).json(savedTemple);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Retrieve all temples
router.get('/getallTemple', async (req, res) => {
  try {
    const temples = await Temple.find();
    res.status(200).json(temples);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Retrieve a single temple by ID
router.get('/getSingleTemple/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const temple = await Temple.findById(id);
    if (!temple) {
      return res.status(404).json({ message: 'Temple not found' });
    }
    res.status(200).json(temple);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a temple by ID
router.put('/updateTemple/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const updatedTemple = await Temple.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedTemple) {
      return res.status(404).json({ message: 'Temple not found' });
    }
    res.status(200).json(updatedTemple);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a temple by ID
router.delete('/deleteTemple/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deletedTemple = await Temple.findByIdAndDelete(id);
    if (!deletedTemple) {
      return res.status(404).json({ message: 'Temple not found' });
    }
    res.status(200).json({ message: 'Temple deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;

