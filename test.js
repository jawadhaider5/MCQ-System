// let question = {
//     id: 8,
//     statement: "Hardest substance among the following is?",
//     opt1: "Steel",
//     opt2: "Diamond",
//     opt3: "Iron",
//     opt4: "Gold",
//     ans: "Diamond",
// }

// if (question.opt2 === question.ans){
//     console.log('True');
// }
// else{
//     console.log('False');
// }


// var questions = [1,2,3,4,5,6,7,8,9];

// function generateRandomQuestions(num){
    
//     let randomQuestions=[];
//     while (randomQuestions.length !== num && num <= questions.length){
//         var randQues = questions[Math.floor(Math.random() * questions.length)];
//         if(!randomQuestions.includes(randQues)){
//             randomQuestions.push(randQues);
//         }
//     }
//     return randomQuestions;
// } 

// console.log(generateRandomQuestions(4));

const fruits = { apple: 28, orange: 17 }

for(key in fruits){
	console.log(fruits[key])
}