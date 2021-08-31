
const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const app = express();

dotenv.config({path: 'config.env'});
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));

// const connectDB = async() => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             useFindAndModify: false,
//             useCreateIndex: true
//         });
//         console.log(`MongoDB connected: ${conn.connection.host}`);
//     } catch (error) {
//         console.log(error);
//         process.exit(1);
//     }
// };
// connectDB();


mongoose.connect('mongodb://localhost:27017/userDB',{useNewUrlParser: true,
useUnifiedTopology: true,
useFindAndModify: false,
useCreateIndex: true })

mongoose.connection.on('connected',()=>{
    console.log('Connection to Database Successful')
});
mongoose.connection.on('error',(err)=>{
    if(err){
    console.log('Connection Failed');
  }
});

app.use('/', require('./routes/router'));

app.set('view engine', 'ejs');

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});