import mongoose from 'mongoose'

export {
  Flight
}

// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema

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
    default: new Date(Date.now() + 365*24*60*60*1000)
  },
}, {
  timestamps: true
});

const Flight = mongoose.model('Flight', flightSchema)