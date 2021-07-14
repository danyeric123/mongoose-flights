import { Movie } from '../models/movie.js'

export {
  newMovie as new,
  create,
  indexMovie as index,
}

function create(req, res) {
  // convert nowShowing's checkbox of nothing or "on" to boolean
  req.body.nowShowing = !!req.body.nowShowing
  // replace and split if it's not an empty string
  if (req.body.cast) {
		// remove whitespace next to commas
		req.body.cast = req.body.cast.replace(', ', ',')
    req.body.cast = req.body.cast.split(',')
  }
  for (let key in req.body) {
	  if (req.body[key] === '') delete req.body[key]
	}
  Movie.create(req.body,function(err) {
    // one way to handle errors
		if (err) return res.redirect('/movies/new')
    // for now, redirect right back to new.ejs
    res.redirect('/movies') 
  })
}

function newMovie(req, res) {
  res.render('movies/new');
}

function indexMovie(req,res){
  Movie.find().sort({ createdAt: -1 })
    .then(result => {
        res.render("movies/index" , { title: "All Movies", movies: result})
    })
    .catch(err => {
        console.log(err)
    })
}