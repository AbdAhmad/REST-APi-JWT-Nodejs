const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const meetingRoute = require('./routes/meeting');

const app = express();

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => 
    console.log('Connected to db')
);

app.use(express.json());

app.use('/api', authRoute);
app.use('/api', meetingRoute);

app.listen(3000, () => {
    console.log('Server is running on 3000 port');
})