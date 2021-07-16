import { Router } from 'express'
const router = Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/flights/')
})

export { 
  router
}
