import express from 'express';
import Institution from  "../Model/InstitutionalDonationModel.js";

const router = express.Router();

// Create a route for handling institution donation submissions
router.post('/createInstitutionDonation', async (req, res) => {
    try {
      // Create a new donation object with the data from the request
      const newDonation = new Institution(req.body);
      await newDonation.save(); // Save the donation to the database
  
      res.json({ message: 'Donation submitted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while submitting the donation' });
    }
  });

  // Define a GET endpoint to retrieve all donations
  router.get('/getAllInstitutionDonation', async (req, res) => {
    try {
      const donations = await Institution.find();
      res.json(donations);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching donations' });
    }
  });
  
  export default router;
  