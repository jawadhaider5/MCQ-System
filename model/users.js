const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    testAttempted: [
        {
            testName: {
                type: String,
                required: true
            },
            attemptNumber: {
                type: Number,
                required: true
            },
            questions: [
                {
                    number: {
                        type: Number,
                    },
                    statement: {
                        type: String,
                        
                    },
                    opt1: {
                        type: String,
                        
                    },
                    opt2: {
                        type: String,
                        
                    },
                    opt3: {
                        type: String,
                        
                    },
                    opt4: {
                        type: String,
                        
                    },
                    optSelected: {
                        type: String,
                    
                    },
                    ans: {
                        type: String
                    }
                }
            ],
            score: {
                type: Number,
                required: true
            }
        }
    ]
});

const Userdb = mongoose.model('userdb', userSchema);
module.exports = Userdb;