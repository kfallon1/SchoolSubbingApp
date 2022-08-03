const mongoose = require('mongoose');

const teacherBookingSchema = mongoose.Schema({
    quantity: {
        type: Number,
     
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    }
})

exports.TeacherBooking = mongoose.model('TeacherBooking', teacherBookingSchema);
 