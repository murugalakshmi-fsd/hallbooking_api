import mongoose from 'mongoose';

async function connectToDatabase(mongoURL){
    try{
        await mongoose.connect(mongoURL);
        console.log('Connected to MonogoDB');
      }catch(error){
        console.log('Error connecting to MongoDB',error);
    }
    }
export default connectToDatabase;