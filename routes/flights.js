import { Router } from 'express'
const router = Router()
import * as flightsCtrl from '../controllers/flights.js'

export {
	router
}

// GET /flights/new
router.get('/new', flightsCtrl.new)
// POST /flights
router.post('/', flightsCtrl.create);
router.get('/',flightsCtrl.index)
router.get('/:id', flightsCtrl.show)
router.post('/:id/tickets', flightsCtrl.createTicket)
router.post('/:id/destinations',flightsCtrl.addDestination)
router.delete('/:flightId/tickets/:ticketId', flightsCtrl.deleteTicket)