import mongoose from "mongoose";

const InstitutionalDonation = new mongoose.Schema({
    fundCategory: String,
    fundType: String,
    amount: Number,
    institutionType: String,
    institutionName: String,
    gstnPanTan: String,
    email: String,
    mobile: String,
    addressLine1: String,
    addressLine2: String,
    country: String,
    zipCode: String,
    state: String,
    district: String,
    city: String,
    
  });

const InstitutionalDonationModel = mongoose.model('institutionalDonations', InstitutionalDonation);
export default InstitutionalDonationModel;