import mongoose from "mongoose";
const { Schema } = mongoose;

const bookingSchema = new Schema({
  hall: {
    type: Schema.Types.ObjectId,
    ref: "Hall",
    required: true,
  },
  customer: 
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      mobile: {
        type: String,
        required: true,
      },
      seats:{
        type:Number,
        required:true
      }
    },


  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
});
const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
