const express = require('express')
const router = express.Router()
const labelsController = require('../app/controller/labelsController')
const usersController=require('../app/controller/usersController')
const authenticateUser=require('../app/middleware/authentication')
const tasksController=require('../app/controller/tasksController')

//labels
router.get('/labels',authenticateUser, labelsController.list)
router.post('/labels',authenticateUser, labelsController.create)
router.get('/labels/:id',authenticateUser, labelsController.show)
router.put('/labels/:id',authenticateUser, labelsController.update)
router.delete('/labels/:id',authenticateUser, labelsController.destroy)
router.post('/labels/insert_all',authenticateUser,labelsController.insert_all)

//user-authentication
router.post('/users/register', usersController.register)
router.post('/users/login', usersController.login)
router.get('/users/account',authenticateUser, usersController.account)
router.delete('/users/logout',authenticateUser, usersController.logout)

//tasks
router.get('/tasks',authenticateUser, tasksController.list)
router.post('/tasks',authenticateUser, tasksController.create)
router.get('/tasks/:id',authenticateUser, tasksController.show)
router.put('/tasks/:id',authenticateUser, tasksController.update)
router.delete('/tasks/:id',authenticateUser, tasksController.destroy)

module.exports = router