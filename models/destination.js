import mongoose from 'mongoose'

export {
  Destination,
}

// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema

const destinationSchema = new Schema({
  airport: {
    type: String,
    unique: true
  }
})

const Destination = mongoose.model('Destination',destinationSchema)