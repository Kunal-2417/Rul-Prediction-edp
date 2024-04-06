const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  IP: { type: String},
 
});

const OTP = mongoose.model("otp", otpSchema);

module.exports = OTP;

// byGoogle: { type: Boolean, default: false},
