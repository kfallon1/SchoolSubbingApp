const {Booking} = require('../models/booking');
const express = require('express');
const {TeacherBooking} = require('../models/teacher-booking');
const router = express.Router();

//GET all bookings list and sort from newest to oldest
router.get(`/`, async (req, res) =>{
    const bookingList = await Booking.find().populate('school', 'name').sort({'dateBooked': -1}); 
//populate shows all school details in response  and dateBooked now an object{} -1 from newest to oldest
    if(!bookingList) {
        res.status(500).json({success: false})
    } 
    res.send(bookingList);
})

//GET a booking by id
router.get(`/:id`, async (req, res) =>{
    const booking = await Booking.findById(req.params.id)
    .populate('school', 'name')
    .populate({ path: 'teacherBookings', populate: {path : 'teacher'} });;
    //Can't figure out the path or story with this? BREAKS IT ASK SAM!!!!!***!! (60)
    //teacherBookings 99% sure is the correct path along 
    //Create model again and use that....Follow it back....Calling the method before it was made, keep in mind 

    if(!booking) {
        res.status(500).json({success: false})
    } 
    res.send(booking); 
})


//GET request by School
//sample: http://localhost:3000/api/v1/bookings/get/schoolbookings/62d96043c71a3fc5d6ac609b
router.get(`/get/schoolbookings/:schoolid`, async (req, res) =>{
    const schoolBookingList = await Booking.find({school: req.params.schoolid}).populate({ 
        path: 'teacherBookings', populate: {
            path : 'teacher'} 
        }).sort({'dateOrdered': -1});

    if(!schoolBookingList) {
        res.status(500).json({success: false})
    } 
    res.send(schoolBookingList);
})






//POST METHOD (CREATE NEW Booking)
//map is to loop inside arrwy
//Promises are used due to async function basically take place of returned object I think? Resolved before the new booking created 
router.post('/', async (req,res)=>{
    const teacherBookingIds = Promise.all (req.body.teacherBookings.map(async teacherBooking => {    //this function will NOT WORK unless inputed on Postman as ARRAY []
            let newTeacherBooking = new TeacherBooking ({          //looping inside the bookings, find the bookings, save them but only return ids
                quantity: teacherBooking.quantity,
                teacher: teacherBooking.teacher
            })
        
             newTeacherBooking = await newTeacherBooking.save();
             
             return newTeacherBooking._id //only want the ids for below function not whole bookings
             console.log(teacherBookingIds);
        }) )       
        //Resolving the promises from above...first const is a promise this is final one and use below in booking
        const teacherBookingIdsResolved = await teacherBookingIds

    let booking = new Booking({
        teacherBookings: teacherBookingIdsResolved,      //function above to get the ids
        status: req.body.status,
        school: req.body.school
    })
    booking = await booking.save();

    if(!booking)
    return res.status(400).send('the booking cannot be created!')
 
    res.send(booking);
}) 
//WORKING BUT NOT GETTING TEACHER ID IN DB

//UPDATE METHOD (STATUS only as can see in method, can be changed)
router.put('/:id',async (req, res)=> {
    const booking = await Booking.findByIdAndUpdate(
        req.params.id,
        {
            status : req.body.status
        },
        { new: true}
    )

    if(!booking)
    return res.status(400).send('the booking cannot be created!')

    res.send(booking);
})

//Delete method for booking and teacher booking
    router.delete('/:id', (req, res)=>{
        Booking.findByIdAndRemove(req.params.id).then(async booking =>{
            if(booking) {
                await booking.teacherBooking.map(async teacherBooking => {
                    await teacherBooking.findByIdAndRemove(teacherBooking) //this removes the teacherBooking element along with the booking itslef as original method just removed the teacher booking
                })
                return res.status(200).json({success: true, message: 'the booking is deleted!'})
            } else {
                return res.status(404).json({success: false , message: "booking not found!"})
            }
        }).catch(err=>{
           return res.status(500).json({success: false, error: err}) 
        })
    })
    


module.exports =router; 