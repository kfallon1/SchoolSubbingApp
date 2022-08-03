const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    teacherBookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TeacherBooking',                      //array is used so can multiple object ids inside the array of items
        //required:true
    }],
    
    status: {
        type: String,
        required: true,
        default: 'Pending',
    },
    
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
    },
    dateBooked: {
        type: Date,
        default: Date.now,
    },
})

bookingSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

bookingSchema.set('toJSON', {
    virtuals: true,
});

exports.Booking = mongoose.model('Booking', bookingSchema);

