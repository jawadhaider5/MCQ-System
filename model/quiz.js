const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    testName: {
        type: String,
        unique: true
    },
    testId: {
        type: Number,
        unique: true
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
                required: true
            },
            opt2: {
                type: String,
                required: true
            },
            opt3: {
                type: String,
                required: true
            },
            opt4: {
                type: String,
                required: true
            },
            ans: {
                type: String,
                required: true
            }
        }
    ]
});

const quizDB = mongoose.model('QuizDB', quizSchema);
module.exports = quizDB;