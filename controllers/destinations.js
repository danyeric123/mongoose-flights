import { Destination } from '../models/destination.js'

export {
  newDestination as new,
  create
}

function newDestination(req, res) {
  Destination.find({})
             .then(destinations=>{
              res.render('destinations/new', {
                title: 'Add Destinations',
               destinations,
              })
            })
            .catch(err=>console.log(err))
}

function create(req,res){
  Destination.create(req.body)
             .then(destination=>{
              res.redirect('/destinations/new')
             })
             .catch(err=>console.log(err))
}