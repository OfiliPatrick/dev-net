const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

// All middle wares
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
// tells the system that you want json to be used
app.use(bodyParser.json()); // this was the missing piece!!!


// // passport middleware
// app.use(passport.initialize());

// Connect to MongoDB

// first the db config key
const db =  require('./config/keys').mongoURI;

// main connection sequence
mongoose
.connect(db)
.then(()=> console.log('Mongodb connected'))
.catch(err => console.log(err))


// need to include our routes/api 
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');


// and then use them(the routes)
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);


//passport config(invoke after connecting to db, requiring the routes and then using them)
require('./config/passport')(passport);


app.get('/', (req,res)=> 
    res.send('Hello ddwd')
)

const port = process.env.PORT || 5000;

app.listen(port, ()=>
    console.log(`App is running on server ${port}`)
)


