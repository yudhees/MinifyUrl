import mongoose from "mongoose";

const schema = new mongoose.Schema({
  path: String,
  originalUrl:String,
  userId:String,
  topic:String,
  alias:String,
  created_at:Date,
  updated_at:Date,
});
const ShortUrls = mongoose.model('short_urls', schema);
export default ShortUrls
