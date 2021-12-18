const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

//Middleware Import Router
const userRoute = require('./routes/users');
const { json } = require('express');
app.use('/user', userRoute);

// Routes

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
   
const PORT = process.env.PORT || 5000;
console.log(PORT);
// Listen to the server
app.listen(PORT);