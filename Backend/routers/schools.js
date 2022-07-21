const {School} = require('../models/school');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); //npm install bcryptjs and use in password field, this encrypts it
const jwt = require ('jsonwebtoken')//npm i jsonwebtoken to install

//GET (List of all schools)
router.get(`/`, async (req, res) =>{
    const schoolList = await School.find().select('-passwordHash'); //removes passwordHash from returned JSON

    if(!schoolList) {
        res.status(500).json({success: false})
    } 
    res.send(schoolList);
})




//GET (Individual School using id)
router.get('/:id', async(req,res)=>{
    const school = await School.findById(req.params.id).select('-passwordHash');
 
    if(!school) {
        res.status(500).json({message: 'The school with the given ID was not found.'})
    } 
    res.status(200).send(school);
})

//GET (List of all schools but only show name, email and phone: can be changed using select function see lec 47 if need)

//POST (Create a new School)
//Working but same as teacher seems to crash overall app
router.post(`/`, async (req, res) => {
    const school = new School({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password,10), //this encrypts password in DB
        phone: req.body.phone,
        address: req.body.address,
        rollNumber: req.body.rollNumber,
        isAdmin: req.body.isAdmin,
    }) ;
 
    school = await school.save(); //line creates new teacher after saving inputs from above

    if (!school) 
    return res.status(500).send('The school cannot be created') //if no teacher send server error

    res.send(school); //all going well send the school created
})

//POST method for login/tokens
//Go back over to understand fully, num 48
//working for now but earlier inputs to DB not working use later ones with PasswordHash castlegar & password works..
router.post('/login', async(req, res)=> {
    const school = await School.findOne({ email: req.body.email }) //find one via the param email
    const secret = process.env.secret; //import the secret string from

    if (!school) {
        return res.status(400).send('THe school/email not found');
    }

    if (school && bcrypt.compareSync(req.body.password, school.passwordHash )) {
        const token = jwt.sign ( //delcare the token
        {
            schoolID: school.id //pass an object 
            
        },
        secret, //not sure exactly defined in method and imported from env file
        {
            expiresIn: '1d' //sets how long token is valid for
        }
        )

        res.status(200).send( {
            school: school.email, token: token
        }   
        )
    } else {
        res.status(400).send('password is wrong')
    }

   // return res.status(200).send(school); //First find if there is an email present 
})


module.exports =router; 