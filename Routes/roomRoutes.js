import express from 'express';
import Room from '../Model/roomModel.js';

const router = express.Router();

// Route to create a new room
router.post('/createroom', async (req, res) => {
  const { name, capacity, amenities } = req.body;
  try {
    const newRoom = new Room({ name, capacity, amenities });
    const savedRoom = await newRoom.save();
    res.status(201).json(savedRoom); // Respond with the created room
  } catch (error) {
    res.status(400).json({ message: error });
  }
});



// Route to get a room by its ID
router.post('/getroombyid', async (req, res) => {
  const roomid = req.body.roomid; // Get the room ID from the request body
  try {
    const room = await Room.findOne({ _id: roomid }); // Find the room with the given ID
    res.send(room); // Send the room data as the response
  } catch (error) {
    return res.status(400).json({ message: error }); // Return an error response with status 400
  }
});


// Route to get all rooms
router.get('/getallrooms', async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.status(200).json(rooms);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});


// Route to get a room by its ID
router.get('/getroombyid/:id', async (req, res) => {
  const roomid = req.params.id; // Get the room ID from the URL parameter
  try {
    const room = await Room.findById(roomid);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// Route to update a room by its ID
router.put('/updateroom/:id', async (req, res) => {
  const roomid = req.params.id;
  const { name, capacity, amenities } = req.body;
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      roomid,
      { name, capacity, amenities },
      { new: true }
    );
    if (!updatedRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// Route to delete a room by its ID
router.delete('/deleteroom/:id', async (req, res) => {
  const roomid = req.params.id;
  try {
    const deletedRoom = await Room.findByIdAndDelete(roomid);
    if (!deletedRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

export default router;
