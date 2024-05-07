import mongoose from "mongoose";
const {Schema} = mongoose;

const bookingSchema = new Schema({
    hall:{
        type:Schema.Types.ObjectId, 
        ref:"Hall",
        required:true
    },
    customer:{
        type:Schema.Types.ObjectId,
        ref:'customer',
        required:true
    },
    date:{
        type:Date,
        require:true
    },
    startTime:{
        type:String,
        required:true
    },
    endTime:{
        type:String,
        required:true
    }
});
const Booking = mongoose.model('Booking',bookingSchema);

export default Booking;