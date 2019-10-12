/**
 * @file 
 * Brinda las rutas del Api de acceso a Contactos
 */
const express = require('express');
const taskController = require('./controllerContact');
const router = express.Router();

router.post('/contact', taskController.post);
router.get('/contact', taskController.get);
router.put('/contact', taskController.put);
router.get('/contact/:id', taskController.getByUNID);
router.delete('/contact/:id', taskController.del);

module.exports = router;
