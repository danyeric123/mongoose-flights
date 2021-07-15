import { Flight, Ticket } from '../models/flight.js'

export {
  newflight as new,
  create,
  indexflight as index,
  show,
  createTicket,
  deleteTicket,
}

function show(req, res) {
  Flight.findById(req.params.id, function (err, flight) {
    res.render('flights/show', { 
      title: 'Flight Detail', 
      flight: flight,
    })
  })
}

function createTicket(req, res) {
  Flight.findById(req.params.id, function(err, flight) {
    flight.tickets.push(req.body);
    flight.save(function(err) {
      res.redirect(`/flights/${flight._id}`);
    });
  });
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
  res.render('flights/new',{title: "Add Movie", departsDate});
}

function indexflight(req,res){
  Flight.find().sort({ departs: 1 })
    .then(result => {
        res.render("flights/index" , { title: "All Flights", flights: result})
    })
    .catch(err => {
        console.log(err)
    })
}

function deleteTicket(req, res) {
  console.log(`The id you get is ${req.params.id}`)
  Flight.findById(req.url.split('/')[1], function(error, flight) {
    // I don't know what to do here
    flight.save(function(err) {
      res.redirect(`/flights/${flight._id}`);
    });
  })
}