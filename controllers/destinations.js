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
                message: false
              })
            })
            .catch(err=>console.log(err))
}

function create(req,res){
  if(!Destination.exists(req.body)){
    Destination.create(req.body)
             .then(destination=>{
              res.redirect('/destinations/new')
             })
             .catch(err=>console.log(err))
  }else{
    Destination.find({})
    .then(destinations=>{
     res.render('destinations/new', {
       title: 'Add Destinations',
       destinations,
       message: true
     })
   })
   .catch(err=>console.log(err))
  }
}