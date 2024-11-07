const mongoose = require('mongoose');



const studentSchema = new mongoose.Schema({    
    name: { type: String },
    email: { type: String, unique: true},
    password: { type: String, required: true },
    role: { type: String, default: 'student' }, 
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty'},
    progress: [
      {
        taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
        status: { type: String, enum: ['pending', 'in-progress', 'completed']},
        completionDate: { type: Date }
      }
    ],
    createdAt: { type: Date, default: Date.now }
  });
  

module.exports = mongoose.model('Student', studentSchema);