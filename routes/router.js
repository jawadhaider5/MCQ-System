
const express = require('express');
const router = express.Router();
const signupDB = require('../model/signup');
const Userdb = require('../model/users');
const quizDB = require('../model/quiz');

router.get('/', (req, res) => {
    res.render('../views/home');
});

router.get('/signup', (req, res) => {
  res.render('../views/signup');
});

router.get('/login', (req, res) => {
  res.render('../views/login');
});

// router.get('/tests', (req, res) => {
//   res.render('../views/tests');
// });

router.get('/physics/:id', (req, res) => {
  quizDB.findOne({ "testId": 1}, (err, result) => {
    if (result){
      res.send(result);
    }
    else {
      res.send('Cannot get quiz');
    }
  });
});

// router.get('/tests',function(req,res){
//   signupDB.findOne(function (err, user) {
//       if(user && user.email == req.body.email && user.password == req.body.password){
//         res.render('../views/tests');
//       }else{
//         res.send('Incorrect Credentials');
//       }
//   });
// });

// router.get('/users', (req, res) => {
//   Userdb.find().then(users => {
    
//     res.status(200).json({
//       message: "Users fetched successfully.",
//       data: users
//     });
//   });
// });

// router.get('/physics', (req, res) => {

// });



// router.post('/tests', async (req, res) =>{
    
//     try{
//       const user = await data.save();
//       res.render('../views/tests');
//     }
//     catch(e){
//       res.status(400).send({message: e.message})
//     }
//   });

router.post('/login', async (req, res) =>{
  const data = new signupDB({
    name: req.body.name,
    id: Math.floor(Math.random() * 1000),
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
  });
  try{
    const user = await data.save();
    res.render('../views/login');
  }
  catch(e){
    res.status(400).send({message: e.message});
  }
});

// router.post('/tests', (req, res) =>{
  
//   signupDB.findOne({ "email": req.body.email, "password": req.body.password },  (err, result) => {
//     res.send(result._id);
//   });
// });

router.post('/tests', (req, res) =>{
  
  signupDB.findOne({ "email": req.body.email, "password": req.body.password },  (err, result) => {
    if (result){
      res.render('../views/tests');
    }
    else{
      res.render('../views/credentials');
    }
  });
});

router.post('/questions', async (req, res) =>{
  const data = new quizDB({
    testName: req.body.testName,
    testId: req.body.testId,
    questions: req.body.questions
  });
  try{
    const user = await data.save();
    res.send({userdata: user});
  }
  catch(e){
    res.status(400).send({message: e.message})
  }
});

router.post('/physics/:id', (req, res) =>{
  
  signupDB.findOne({ "_id": req.params.id },  (err, result) => {
    
    const data = new Userdb({
      name: result.name,
      email: result.email,
      phone: result.phone,
      testAttempted: req.body.testAttempted
    });
    try{
      const user = data.save();
      res.send({userdata: user});
    }
    catch(e){
      res.status(400).send({message: e.message})
    } 
  });   
});

module.exports = router;