const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const bodyparser = require('body-parser');
const multer = require('multer')
const connectDB =require('./server/database/connect')

const app = express();

dotenv.config()
const PORT = process.env.PORT || 8080

app.use(express.json());
app.use(cors());

app.use(morgan('tiny'));

connectDB();

app.use(bodyparser.urlencoded({extended:true}))

const storage = multer.memoryStorage();

const upload = multer({storage : storage});

app.use("/avatars", express.static(path.resolve(__dirname,"avatars")));


// admin
app.use('/', require('./server/router/userRoutes'));
app.use('/admin', require('./server/router/adminRoutes'));


app.listen (PORT, ()=>{
    console.log(`app is running on port http://localhost:${PORT}`);
})