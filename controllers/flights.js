import { Destination } from '../models/destination.js'
import { Flight} from '../models/flight.js'

export {
  newFlight as new,
  create,
  indexflight as index,
  show,
  createTicket,
  deleteTicket,
  addDestination,
  deleteDestination,
}

function show(req, res) {
  Flight.findById(req.params.id)
        .populate("destinations")
        .exec(function (err, flight) {
          Destination.find({_id: {$nin: flight.destinations}})
          .then(destinations=>{
            res.render('flights/show', { 
              title: 'Flight Detail', 
              flight,
              destinations,
            })
          })
        })

}

function addDestination(req,res){
  Flight.findById(req.params.id, function(err, flight) {
    flight.destinations.push(req.body.destinationId);
    flight.save(function(err) {
      res.redirect(`/flights/${flight._id}`);
    });
  });
}

function deleteDestination(req, res) {
  Flight.findById(req.params.flightId)
  .then((flight) => {
    flight.destinations.remove({_id: req.params.destinationId})
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(err=>{
      console.log(err)
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

function newFlight(req, res) {
  const newFlight = new Flight();
  const dt = newFlight.departs
  const departsDate = dt.toISOString().slice(0, 16);
  res.render('flights/new',{title: "Add Flight", departsDate});
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
  Flight.findById(req.params.flightId)
  .then((flight) => {
    flight.tickets.remove({_id: req.params.ticketId})
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(err=>{
      console.log(err)
    })
  })
}