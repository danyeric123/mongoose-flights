import mongoose from 'mongoose'

export {
  Flight
}

// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema
const date = new Date()
date.setFullYear( new Date().getFullYear() - 1 )

const flightSchema = new Schema({
  airline: {
    type: String,
    enum: ["American", "Southwest", "United"]
  },
  airport: {
    type: String,
    enum: ["AUS", "DFW", "DEN", "LAX", "SAN"]
  },
  flightNo: {
    type: Number,
    min: 10,
    max: 9999
  },
  departs: {
    type: Date,
    default: new Date()
  },
}, {
  timestamps: true
});

const Flight = mongoose.model('Flight', flightSchema)