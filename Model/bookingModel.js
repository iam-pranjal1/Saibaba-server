import mongoose from 'mongoose';

const bookingSchema = mongoose.Schema({

    room : {
        type: String,
        required: true
    },
    roomid:{
        type: String,
        required: true
    },
    userid :{
        type: String,
        required: true
    },
    checkInDate:{
        type: String,
        required: true
    },
    checkOutDate:{
        type: String,
        required: true
    },
    totalamount:{
        type: String,
        required: true
    },
    transitionId:{
        type: String,
        default:'123',
        required: true
    },
    status:{
        type: String,
        required: true,
        default: 'booked'
    }
}, { timestamps: true } )

const bookingModel = mongoose.model('bookings', bookingSchema);

export default bookingModel;