import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  planName: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: false,
  },

  people: {
    type: Array,
    required: true,
  },

  date: {
    type: Number,
    required: true,
  },

  planId: {
    type: String,
    required: true,
    unique: true,
  },
});

const Plan = mongoose.model("Plan", planSchema);
export default Plan;
