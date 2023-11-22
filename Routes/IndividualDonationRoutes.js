import express from 'express';
import Individual from  "../Model/IndividualDonationModel.js";

const router = express.Router();

// Define a POST endpoint to save donation data
router.post('/creteDonation', async (req, res) => {
    const { name, email, mobile, pincode, state, city, fundCategory, fundType, amount, pan } = req.body;
  
    try {
      const newDonation = new Individual({
        name,
        email,
        mobile,
        pincode,
        state,
        city,
        fundCategory,
        fundType,
        amount,
        pan,
      });
  
      await newDonation.save();
  
      res.status(201).json(newDonation);
    } catch (error) {
      res.status(500).json({ error: 'Error saving donation data' });
    }
  });
  
  // Define a GET endpoint to retrieve all donations
  router.get('/getAlldonation', async (req, res) => {
    try {
      const donations = await Individual.find();
      res.json(donations);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching donations' });
    }
  });
  
  export default router;