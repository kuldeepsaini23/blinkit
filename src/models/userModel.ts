import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    phoneNumberExt: {
      type: String,
      // required: true,
    },
    phoneNumber: {
      type: String,
      // required: true,
      unique: true,
    },
    photo: {
      type: String,
      // required: true,
    },
    address: {
      type: String,
      // required: true,
    },
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User =  mongoose.models.User || mongoose.model("User", userSchema);
export default User