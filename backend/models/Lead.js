import mongoose from "mongoose";
import validator from "validator"

export const LEAD_STATUSES = ["New", "Assigned", "Contacted", "Qualified", "Proposal Sent", "Negotiation", "Won", "Lost"];

export const LEAD_SOURCES = ["Website", "Referral", "LinkedIn", "Facebook", "Instagram", "Cold Call", "Email Campaign", "Other"];

const noteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
}, {timestamps:true}
)

const leadSchema = new mongoose.Schema({ 
  name: {
    type: String,
    required: true,
    trim: true,
    minlength:2,
    maxlength:50
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: "Invalid email address."
    },
  },
  phone: {
    type: String,
    trim: true
  },
  company: {
    type: String, 
    trim: true
  },
  source: {
    type: String,
    enum: LEAD_SOURCES,
    required: true,
  },
  status: {
    type: String,
    enum: LEAD_STATUSES,
    default: "New"
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  notes: {
    type: [noteSchema],
    default: []
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  deletedAt: {
    type: Date,
    default: null
  },
  deletedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  }
}, {timestamps: true}
)

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;

