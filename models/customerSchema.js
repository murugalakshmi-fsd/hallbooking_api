import mongoose from 'mongoose';

const {Schema} = mongoose;

const customerSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    }
});

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;


