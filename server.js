import express from 'express';
import connectDB from "./db.js";

import userRoute from "./Routes/userRoutes.js";
import roomRoutes from "./Routes/roomRoutes.js";
import bookingRoute from "./Routes/bookingsRoutes.js";
import galleryRoutes from "./Routes/galleryRoutes.js";
import templeRoutes from "./Routes/templeRoutes.js";
import mmcRoutes from './Routes/mmcRoutes.js';
import IndividualDonationRoutes from './Routes/IndividualDonationRoutes.js';
import InstitutionalDonationRoutes from './Routes/InstitutionalDonationRoutes.js';

import MerchantResponsePage from './Routes/paymentRoutes.js';

const app = express();
connectDB();

app.use(express.json())


app.use('/api/rooms', roomRoutes); 
app.use('/api/users',userRoute);
app.use('/api/bookings',bookingRoute);
app.use('/api/galleriesDatas', galleryRoutes);
app.use('/api/temples',templeRoutes);
app.use('/api/mmc',mmcRoutes);

app.use('/api/Transactions',MerchantResponsePage);
app.use('/api/donation',IndividualDonationRoutes);
app.use('/api/InstitutionDonation',InstitutionalDonationRoutes);


const port = process.env.PORT || 5000

app.listen(port, () => console.log(`server is runnning on the http://localhost:${port}`));