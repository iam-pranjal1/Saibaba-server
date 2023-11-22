import mongoose from 'mongoose';

const roomSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true // 'require' should be corrected to 'required'
    },
    maxcount: {
      type: Number,
      required: true
    },
    
rentperday: {
      type: Number,
      required: true
    },
    imgUrl: [
      {
        type: String // Assuming you want an array of image URLs
      }
    ],
    currentBooking: [],
    type: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const roomModel = mongoose.model('rooms', roomSchema); 

export default roomModel;
