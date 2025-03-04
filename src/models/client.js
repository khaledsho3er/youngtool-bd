const mongoose = require("mongoose");

const SocialMediaSchema = new mongoose.Schema({
  instagramHandle: { type: String },
  facebookHandle: { type: String },
  twitterHandle: { type: String },
  linkedInHandle: { type: String },
  youtubeChannel: { type: String },
  tiktokHandle: { type: String },
});

const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  companyName: { type: String }, // Optional field for company clients
  address: { type: String }, // Physical address
  website: { type: String }, // Client's website URL
  notes: { type: String }, // Internal notes or comments
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  }, // Client status
  assignedManager: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Relationship Manager
  socialMedia: { type: SocialMediaSchema },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Client", ClientSchema);
