import express from 'express';
import roomModel from '../Model/roomModel.js';
import bookingModel from '../Model/bookingModel.js';
import moment from 'moment';

const router = express.Router();

// Route to create a new booking
router.post('/bookroom', async (req, res) => {
  const {
    room,
    userid,
    checkInDate,
    checkOutDate,
    totalDays,
    totalamount
  } = req.body;

  try {
    // Convert the date strings to moment objects
    const momentCheckInDate = moment(checkInDate, 'DD-MM-YYYY');
    const momentCheckOutDate = moment(checkOutDate, 'DD-MM-YYYY');

    const newBooking = new bookingModel({
      room: room.name,
      roomid: room._id,
      userid,
      checkInDate,
      checkOutDate,
      totalDays,
      totalamount,
      transactionId: '123' // Corrected 'transitionId' to 'transactionId'
    });

    const booking = await newBooking.save();

    const roomTemp = await roomModel.findOne({ _id: room._id });
    roomTemp.currentBooking.push(
      {
        bookingid: booking._id,
        checkInDate: momentCheckInDate,
        checkOutDate: momentCheckOutDate,
        userid: userid,
        status: booking.status
      });
    await roomTemp.save();
    res.status(201).json({ message: 'Room booked successfully', booking });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Something went wrong in booking the room' });
  }
});

// Route to get all bookings
router.get('/getallbookings', async (req, res) => {
  try {
    const bookings = await bookingModel.find({});
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error getting all bookings' });
  }
});

// Route to get the booking status by ID
router.get("/status", async (req, res) => {
  const bookingId = req.query.id;

  try {
    // Find the booking by its ID
    const booking = await bookingModel.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Send the booking status response
    res.status(200).json({ successful: booking.successful });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error getting the booking status" });
  }
});


// Route to get a booking by its ID
router.get('/getbookingbyid/:id', async (req, res) => {
  const bookingId = req.params.id;
  try {
    const booking = await bookingModel.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error getting the booking' });
  }
});

// Route to update a booking by its ID
router.put('/updatebooking/:id', async (req, res) => {
  const bookingId = req.params.id;
  const updateData = req.body;

  try {
    const updatedBooking = await bookingModel.findByIdAndUpdate(bookingId, updateData, { new: true });
    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(updatedBooking);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error updating the booking' });
  }
});

// Route to delete a booking by its ID
router.delete('/deletebooking/:id', async (req, res) => {
  const bookingId = req.params.id;

  try {
    const deletedBooking = await bookingModel.findByIdAndDelete(bookingId);
    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error deleting the booking' });
  }
});

export default router;
