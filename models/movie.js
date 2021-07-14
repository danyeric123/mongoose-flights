import mongoose from 'mongoose'

export {
  Movie
}

// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema

const movieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  releaseYear: {
    type: Number, 
    default: new Date().getFullYear(),
    min: 1927
  },
  mpaaRating: {
    type: String,
    enum: ['G', 'PG', 'PG-13', 'R']
  },
  cast: [String],
  nowShowing: {type: Boolean, default: false}
}, {
  timestamps: true
});

const Movie = mongoose.model('Movie', movieSchema)