
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

router.get('/quizzes', (req, res) => {
  quizDB.find().then(quizzes => {
    let quizList = [], quizObj = {};
    
    for (let i = 0; i < quizzes.length; i++){
      quizObj.testName= (quizzes[i].testName);
      quizObj.testId= (quizzes[i].testId);
      quizList.push(quizObj);
      quizObj = {};
    }
    res.status(200).json({
      ListOfQuizzes: quizList
    });
  });
});

router.get('/quiz/:testId', (req, res) => {
  quizDB.findOne({ "testId": req.params.testId }, (err, result) => {
    res.send(result);
  });
});

router.put('/add/question/:testId', (req, res) => {
  quizDB.findOneAndUpdate({ testId: req.params.testId }, {
    $addToSet: {
      questions: req.body.questions
    }
  }).then( result => {
    res.status(200).json({
      updatedQuiz: result
    })
  }).catch( err => {
    res.status(500).json({
      Error: err
    });
  });
  // quizDB.findOne({ testId: req.params.testId}).then( result => {
  //   result.questions.push(req.body);
  //   result.save();
  //   res.status(200).json({
  //     addedQuestionToQuiz: result
  //   })
  // }).catch( err => {
  //   res.status(500).json({
  //     Error: err
  //   });
  // });
});

router.put('/update/question/:testId', (req, res) => {
  quizDB.findOne({ testId: req.params.testId}).then( result => {
    for (let i = 0; i < result.questions.length; i++ ){
      for (let j = 0; j < req.body.questions.length; j++ ){
        if (result.questions[i].number == req.body.questions[j].number){
          result.questions[i].number = req.body.questions[j].number;
          result.questions[i].statement = req.body.questions[j].statement;
          result.questions[i].opt1 = req.body.questions[j].opt1;
          result.questions[i].opt2 = req.body.questions[j].opt2;
          result.questions[i].opt3 = req.body.questions[j].opt3;
          result.questions[i].opt4 = req.body.questions[j].opt4;
          result.questions[i].ans = req.body.questions[j].ans;
        }
      }
    }
    result.save();
    res.status(200).json({
      updatedQuiz: result
    })
  }).catch( err => {
    res.status(500).json({
      Error: err
    });
  });
});

router.get('/dashboard', (req, res) => {
  signupDB.find().then(data => {
  Userdb.find().then(userQuizzes => {
    let usersList = [], quizNames = [], quizObj = {}, userObj = {}, count = 0, numberOfQuestions = 0;
    
    // usersList.push(quizObj);
    for (let i = 0; i < userQuizzes.length; i++){
     
      count = count + (userQuizzes[i].testAttempted.length);
      quizObj.totalAttempts = count;
      quizObj.totalUsers = userQuizzes.length;
      for (let j = 0; j < userQuizzes[i].testAttempted.length; j++){
        if (!(quizNames.includes(userQuizzes[i].testAttempted[j].testName))){
          quizNames.push(userQuizzes[i].testAttempted[j].testName);
        }
        numberOfQuestions = numberOfQuestions + (userQuizzes[i].testAttempted[j].questions.length);
        quizObj.totalQuestions = numberOfQuestions;
      }
      quizObj.totalQuizzes = quizNames.length;

      userObj.id = (userQuizzes[i].id);
      if(data[i].email == userQuizzes[i].email){
        userObj.name = (data[i].name);
      }
      
      userObj.testAttempted = (userQuizzes[i].testAttempted);
      usersList.push(userObj);
      userObj = {};
    }
    
    res.status(200).json({
      quizDetails: quizObj,
      userDetails: usersList
    });
  });
})
});

// router.get('/tests', (req, res) => {
//   res.render('../views/tests');
// });

// router.get('/physics/:id', (req, res) => {
//   quizDB.findOne({ "testId": 1}, (err, result) => {
//     if (result){
//       res.send(result);
//     }
//     else {
//       res.send('Cannot get quiz');
//     }
//   });
// });

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
    id: req.body.id,
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

router.post('/quiz', async (req, res) =>{
  const data = new quizDB({
    testName: req.body.testName,
    testId: req.body.testId,
    questions: req.body.questions
    // number: req.body.number,
    // statement: req.body.statement,
    // opt1: req.body.opt1,
    // opt2: req.body.opt2,
    // opt3: req.body.opt3,
    // opt4: req.body.opt4,
    // ans: req.body.ans
  });
  try{
    const user = await data.save();
    res.send({userdata: user});
  }
  catch(e){
    res.status(400).send({message: e.message})
  }
});

router.post('/quiz/users', (req, res) =>{
  
  Userdb.findOne({ "id": req.body.id }, (err, result) => {
    
    if (!result){
      var data = new Userdb({
        id: req.body.id,
        email: req.body.email,
        testAttempted: req.body.testAttempted
      });
      try{
        var user = data.save();
        // res.send(user);
      }
      catch(e){
        res.status(400).send({message: e.message});
      }
    }
    else {
      var resu = req.body.testAttempted[0];
      result.testAttempted.push(resu);
      var user = result.save();
      // res.send(result);
    }
  });
});


router.delete('/quiz/:testId', (req, res) => {
  quizDB.deleteOne({ testId: req.params.testId }).then(result => {
    res.status(200).json({ message: 'Quiz deleted'});
  });
});

router.put('/question/:testId', (req, res) => {
  quizDB.findOne({ testId: req.params.testId }).then( function(result) {
    for (let i = 0; i < result.questions.length; i++ ){
      for (let j = 0; j < req.body.questions.length; j++ ){
        if (result.questions[i].number == req.body.questions[j].number){
          result.questions.splice(i, 1);
        }
      }
    }
    result.save();
  }).catch( err => {
    res.status(500).json({
      Error: err.message
    });
  });
});

module.exports = router;