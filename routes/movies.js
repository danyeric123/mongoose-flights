import { Router } from 'express'
const router = Router()
import * as moviesCtrl from '../controllers/movies.js'

export {
	router
}

// GET /movies/new
router.get('/new', moviesCtrl.new)
// POST /movies
router.post('/', moviesCtrl.create);
router.get('/',moviesCtrl.index)