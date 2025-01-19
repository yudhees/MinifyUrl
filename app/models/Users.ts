import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email:String,
  googleUserId:String,
  token:Object,
  created_at:Date,
  updated_at:Date,
});
const Users = mongoose.model('users', userSchema);
export default Users
