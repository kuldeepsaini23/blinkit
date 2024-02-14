import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
  },
  link: {
    type: String,
    required: true,
  },
});

const Image =  mongoose.models.Image || mongoose.model("Image", uploadSchema);
export default Image;
