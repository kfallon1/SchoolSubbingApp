const {School} = require('../models/school');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    const schoolList = await School.find();

    if(!schoolList) {
        res.status(500).json({success: false})
    } 
    res.send(schoolList);
})

module.exports =router;