const Task=require('../models/Task');
const { v4: uuidv4 } = require('uuid');
const Faculty = require('../models/Faculty');
const Student = require('../models/Student');

exports.createTask=async(req,res)=>{
    try{
        const {title,description}=req.body;
        if(!title || !description){
            return res.status(400).json({message:'Invalid Credential'});
        }
        const newTask=await new Task({
            title:title,
            id:uuidv4(),
            description:description
        })
        newTask.save();
        res.status(201).json({message:'Task Created'});
    }
    catch(err){
        res.status(400).json({message:'Error'});
    }
}
exports.getTask = async (req, res) => {
    try {
        // Fetch all tasks from the database
        const tasks = await Task.find();
        console.log(tasks);  // Optionally log the tasks for debugging

        // Check if tasks exist
        if (tasks.length > 0) {
            res.status(200).json({ tasks });  // Return tasks as JSON response
        } else {
            res.status(404).json({ message: 'No tasks found' });
        }
    } catch (err) {
        console.error(err);  // Log the error for debugging
        res.status(400).json({ message: 'Error fetching tasks' });
    }
};
