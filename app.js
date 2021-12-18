const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

app.use(bodyParser.json());

//Middleware Import Router
const userRoute = require('./routes/users');
const { json } = require('express');
app.use('/user', verifyToken, userRoute);

// Get login URL
app.post('/api/login', (req, res) => {
    //Mock User

    const user = {
        id: 1,
        username: 'ani',
        email: 'ani@gmail.com'
    }

    jwt.sign({ user }, 'secretkey', { expiresIn: '2d' }, (err, token) => {
        res.json({
            token
        });
    });

});

// Get root 
app.get('/', (req, res) => {
    res.send('We are on Home');
});


//CONNECT TO MONGODB
const url = `mongodb+srv://mongouser:Mongo123@anicluster.mukd1.mongodb.net/myNodeAppUsers?retryWrites=true`;

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(url, connectionParams)
    .then(() => {
        console.log('Connected to database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })


///VERIFY TOKEN
function verifyToken(req, res, next) {
    //Get auth header value
    const bearerHeader = req.headers['authorization'];

    //check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        //split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];

        //Set the token
        req.token = bearerToken;

        //Next
        next();
    } else {
        //Forbidden
        res.sendStatus(403).send({
            message: 'Access token expired or invalid'
        });
    }
}




const PORT = process.env.PORT || 3000;
console.log('Listening on Port 3000');
// Listen to the server
app.listen(PORT);