const Router = require('express')
const router = new Router()
const dessertRouter = require('./dessertRouter')
const userRouter = require('./userRouter')
const socialMediaTypeRouter = require('./socialMediaTypeRouter')
const typeRouter = require('./typeRouter')


router.use('/user', userRouter)
router.use('/socialMediaType', socialMediaTypeRouter)
router.use('/dessert', dessertRouter)
router.use('/type', typeRouter)


module.exports = router
