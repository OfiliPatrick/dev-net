//in our routes we need express, router ,gravatar, bcrtpt js.

const express = require('express');
const router =  express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys')
const passport = require('passport');


// Load Input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//this is our users route so of course we have to load the users model

const User = require('../../Models/User'); 

router.get('/test', (req,res)=> 
    res.json({msg:'test works'})
);

// user tries to register
router.post('/register', (req,res)=>{
    const { errors, isValid} = validateRegisterInput(req.body) //this was the initial issue


    //Check validation
    if(!isValid){
        return res.status(400).json(errors)
    }
    User.findOne({email: req.body.email})
    .then(user => {
        // console.log(user)
        if(user){
            // console.log(user)
            errors.email = "Email already exists"
            return res.status(400).json({email: 'Email already exists'})
        }else{
            
            const avatar = gravatar.url( req.body.email,{
                s: '200', //size
                r: 'pg', //rating
                d: 'mm' // default
            });
           
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
            });

            console.log(newUser)

            bcrypt.genSalt(10, (err, salt)=> {
                bcrypt.hash(newUser.password, salt, (err,hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(user => console.log(user))
                    .then(user=> res.json(user))
                    .catch(err=> console.log(err))
                })
            })
        }
    })
})


//user tries to login
router.post('/login', (req, res) =>{

    const { errors, isValid} = validateLoginInput(req.body)
    // Check validation
    if(!isValid){
        return res.status(400).json(errors)
    }

    const email = req.body.email;
    const password = req.body.password;

    //find the user in db by email
    User.findOne({email})
    .then(user => {
        if (!user){
            return res.status(404).json({email: 'This user does not exist' })
        }

        // check the password
        bcrypt.compare(password, user.password)
        .then(isMatch =>{
            if (isMatch){
               // user match
               const payLoad = {id: user.id, name: user.name, avatar: user.avatar, email: user.email}

               // sign Token
               jwt.sign(payLoad, keys.secretOrKey, {expiresIn: 3600}, (err ,token)=>{
                    res.json({
                        success: true,
                        token: 'Bearer ' + token
                    })
               })
            }else{
                errors.password = "Password incorrect";
                return res.status(400).json(errors)            }
        });
    });

})

router.get(
    '/current', passport.authenticate('jwt', {session: false}), (req,res) => {
        res.json({id: req.user.id,
    name: req.user.name,
email : req.user.email});
    }
)

module.exports = router