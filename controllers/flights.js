import { Flight } from '../models/flight.js'

export {
  newflight as new,
  create,
  indexflight as index,
}

function create(req, res) {
  
  Flight.create(req.body,function(err) {
    // one way to handle errors
		if (err) return res.redirect('/flights/new')
    // for now, redirect right back to new.ejs
    res.redirect('/flights') 
  })
}

function newflight(req, res) {
  res.render('flights/new');
}

function indexflight(req,res){
  Flight.find().sort({ createdAt: -1 })
    .then(result => {
        console.log(result)
        res.render("flights/index" , { title: "All Flights", flights: result})
    })
    .catch(err => {
        console.log(err)
    })
}