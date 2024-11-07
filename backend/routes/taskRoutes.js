const express=require('express');
const { createTask, getTask } = require('../controllers/taskController');
const router=express.Router();

router.post('/create',createTask);
router.get('/getTasks',getTask);

module.exports=router;