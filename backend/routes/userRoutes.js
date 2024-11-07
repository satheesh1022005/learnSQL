const express = require('express');
const { register, login, createFaculty,createStudent, assignTasks } = require('../controllers/userController');
const { auth } = require('../middleware/authMiddleware');
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post('/createFaculty',auth,createFaculty)
router.post('/createStudent',auth,createStudent)
router.post('/assignTask',auth,assignTasks);


module.exports = router;
