const { verifyToken, adminOnly } = require('../middlewares/access-control.middleware');
const volunteerController = require('../controllers/volunteer.controller')

const router = require('express').Router()

// Create a new volunteer
router.get('/', verifyToken, adminOnly, volunteerController.getList);
router.post('/', verifyToken, adminOnly, volunteerController.createVolunteer);

module.exports = router