const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
const checkRole = require('../middleware/checkRoleMiddleware')

// , checkRole('ADMIN')
router.post('/', typeController.create) // создание типа
router.get('/', typeController.getAll) // получение всех типов


module.exports = router
