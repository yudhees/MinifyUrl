import mongoose from "mongoose";

const schema = new mongoose.Schema({
  token:String,
  userId:String,
  created_at: Date,
  updated_at: Date,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});
const Tokens = mongoose.model('tokens', schema);
export default Tokens
