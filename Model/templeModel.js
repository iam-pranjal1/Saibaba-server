// templeModel.js
import mongoose from "mongoose";

const templeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image:{
    type:String,
    required:true,
  }
});

const templeModel = mongoose.model('temples', templeSchema);
export default templeModel;