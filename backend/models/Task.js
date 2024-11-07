const mongoose=require('mongoose');



const taskSchema = new mongoose.Schema({
    title: { type: String},
    id:{type:String},
    description: { type: String },
    dueDate: { type: Date },
    createdAt: { type: Date, default: Date.now }
  });

  

  module.exports = mongoose.model('Task', taskSchema);