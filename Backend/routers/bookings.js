const {Bookings} = require('../models/booking');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    const bookingList = await Booking.find();

    if(!bookingList) {
        res.status(500).json({success: false})
    } 
    res.send(bookingList);
})

module.exports =router;