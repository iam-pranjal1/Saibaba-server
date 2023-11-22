import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    pincode: String,
    state: String,
    city: String,
    fundCategory: String,
    fundType: String,
    amount: String,
    pan: String,
  });
  
  const IndividualDonationSchema = mongoose.model("individualDonationSchemas", donationSchema);

export default IndividualDonationSchema;
