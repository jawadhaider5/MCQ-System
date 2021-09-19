
const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
var cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const app = express();
app.use(cors());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
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