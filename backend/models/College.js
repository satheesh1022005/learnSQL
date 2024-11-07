const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    name: { 
        type: String
    },
    adminCredentials: {
        email: { type: String ,
            unique: true, // Ensures the email is unique across documents
            lowercase: true, // Ensures emails are case-insensitive
            trim: true // Removes any leading or trailing spaces
        },
        password: { type: String}
    },
    role: { type: String, default: 'college' }, 
    maxFacultyAccounts: { type: Number}, // Limit on faculty accounts
    faculties: [{ type: mongoose.Schema.Types.ObjectId }], // Reference to faculty accounts
    createdAt: { type: Date, default: Date.now }
});

// Export the College model
module.exports = mongoose.model('College', collegeSchema);

