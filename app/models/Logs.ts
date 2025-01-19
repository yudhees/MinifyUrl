import mongoose from "mongoose";

const schema = new mongoose.Schema({
  alias:String,
  userAgent:String,
  ip:String,
  deviceType:String,
  osName:String,
  topic:String,
  location:{
    country:String,
    region:String,
    city:String,
    longitude:String,
    latitude:String,
  },
  created_at:Date,
  updated_at:Date,
},{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});
const Logs = mongoose.model('logs', schema);
export default Logs
