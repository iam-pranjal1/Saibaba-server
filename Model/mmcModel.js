// sairamModel.js
import mongoose from 'mongoose';

const mmcsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: String,
  profile: String,
});
const mmcModel = mongoose.model('mmcs', mmcsSchema); 

export default mmcModel;

