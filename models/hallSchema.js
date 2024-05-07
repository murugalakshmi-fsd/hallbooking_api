import mongoose from "mongoose";

const {Schema} = mongoose;

const hallSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    capacity:{
       type:Number,
       required:true
    },
    location:{
        type:String,
        required:true
    }
});

const Hall = mongoose.model('Hall',hallSchema);

export default Hall;