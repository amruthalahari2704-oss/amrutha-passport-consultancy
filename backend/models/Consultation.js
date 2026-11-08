const mongoose = require("mongoose");

const consultationSchema = new mongoose.Schema(
  {
    referenceId: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    phone: {
      type: String,
      required: true,
      match: /^[6-9]\d{9}$/,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    service: {
      type: String,
      required: true,
    },
    serviceName: {
      type: String,
      required: true,
    },
    preferredDate: {
      type: String,
      required: true,
    },
    preferredTime: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      default: "",
      maxlength: 2000,
    },
   status: {
  type: String,
  enum: [
    "Pending Review",
    "Confirmed",
    "In Progress",
    "Completed",
    "Cancelled",
  ],
  default: "Pending Review",
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Consultation", consultationSchema);