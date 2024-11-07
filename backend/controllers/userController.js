const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const College = require("../models/College");
const Faculty = require('../models/Faculty');
const mongoose=require('mongoose');
const Student = require('../models/Student');
const SECRET_KEY = '12345';


exports.register = async (req, res) => {
    try {
        const { username, email, password, maxFacultyAccounts } = req.body;
        if (!username || !email || !password || !maxFacultyAccounts) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        const existingUser = await College.findOne({ 'adminCredentials.email': email }); if (existingUser) return res.status(400).json({ message: 'User already exists!' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new College({
            name: username,
            adminCredentials: {
                email: email,
                password: hashedPassword,
            },
            maxFacultyAccounts: maxFacultyAccounts,
            faculties: [],
        });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id, email: newUser.adminCredentials.email, role: 'college' }, SECRET_KEY, { expiresIn: '1h' });

        res.status(201).json({ message: 'User registered successfully!', token ,user:newUser});
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal server error' });
    }
};



exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const [user1, user2, user3] = await Promise.all([
            College.findOne({ 'adminCredentials.email': email }),
            Faculty.findOne({ 'email': email }),
            Student.findOne({ 'email': email })
        ]);

        const user = user1 || user2 || user3;

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials!' });
        }

        let isPasswordValid;
        if (user.adminCredentials) {
            isPasswordValid = await bcrypt.compare(password, user.adminCredentials.password);
        } else {
            isPasswordValid = await bcrypt.compare(password, user.password);
        }

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials!' });
        }

        const token = jwt.sign({
            id: user._id,
            email: user.email,
            role: user.adminCredentials ? 'college' : (user.college ? 'faculty' : 'student')
        }, SECRET_KEY, { expiresIn: '1h' });


        res.json({ message: 'Login successful!', token, user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};





exports.createFaculty = async (req, res) => {
    try {
        const college = await College.find({ _id: req.user.id });
        console.log(req.body)
        if (req.user.role !== 'college') return res.status(404).json({ message: 'Access Denied' });
        const { username, email, password, maxStudentAccounts } = req.body;
        if (!username || !email || !password || !maxStudentAccounts) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        const existingUser = await Faculty.findOne({ 'email': email });
        if (existingUser) return res.status(400).json({ message: 'User already exists!' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Faculty({
            name: username,
            email: email,
            password: hashedPassword,
            college: req.user.id,
            tasks:[],
            maxStudentAccounts: maxStudentAccounts,
            students: [],
        });
        await college[0].faculties.push(newUser._id);
        await college[0].save();
        await newUser.save();
        console.log(college);

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal server error' });
    }
}






exports.createStudent = async (req, res) => {
    try {

        const faculty = await Faculty.find({ _id: req.user.id });
        console.log(req.user)
        if (req.user.role !== 'faculty') return res.status(404).json({ message: 'Access Denied' });
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        const existingUser = await Student.findOne({ 'email': email });
        if (existingUser) return res.status(400).json({ message: 'User already exists!' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Student({
            faculty:req.user.id,
            name: username,
            email: email,
            password: hashedPassword,
            progress: [],
        });
        await faculty[0].students.push(newUser._id);
        await faculty[0].save();
        await newUser.save();
        console.log(faculty);

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.assignTasks = async (req, res) => {
    try {
        if (req.user.role !== 'faculty') {
            return res.status(400).json({ message: 'Access Denied' });
        }

        const  tasks  = req.body;

        if (!tasks || !Array.isArray(tasks) || tasks.length === 0) {
            return res.status(400).json({ message: 'Tasks are unavailable or empty' });
        }

        const user = await Faculty.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'Faculty not found' });
        }

        // Filter out tasks that already exist in the user's tasks array
        const newTasks = tasks.filter((task) => 
            !user.tasks.some((existingTask) => existingTask.id === task.id)
        );

        if (newTasks.length > 0) {
            user.tasks.push(...newTasks);
            await user.save();
            return res.status(200).json({ message: 'Tasks added successfully', addedTasks: newTasks });
        } else {
            return res.status(200).json({ message: 'No new tasks to add' });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};















exports.viewTasks = async (req, res) => {
    try {
        if (req.user.role !== 'student') {
            return res.status(400).json({ message: 'Access Denied' });
        }
        console.log(req.user)
        const student=await Student.findById(req.user.id);
        const faculty=await Faculty.findById(student.faculty);
        console.log(faculty.tasks)
        return res.json({tasks:faculty.tasks})


    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};