import { Flight } from '../models/flight.js'

export {
  newflight as new,
  create,
  indexflight as index,
}

function create(req, res) {
  if(!req.body.departs) req.body.departs = undefined
  if(!req.body.flightNo){
    res.redirect('/flights/new')
  } else{
    Flight.create(req.body,function(err) {
      // one way to handle errors
      if (err) return res.redirect('/flights/new')
      // for now, redirect right back to new.ejs
      res.redirect('/flights') 
    })
  }
  
}

function newflight(req, res) {
  const newFlight = new Flight();
  const dt = newFlight.departs
  const departsDate = dt.toISOString().slice(0, 16);
  console.log(departsDate)
  res.render('flights/new',{departsDate});
}

function indexflight(req,res){
  Flight.find().sort({ departs: 1 })
    .then(result => {
        console.log(result)
        res.render("flights/index" , { title: "All Flights", flights: result})
    })
    .catch(err => {
        console.log(err)
    })
}