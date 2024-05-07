import mongoose from 'mongoose';
import Booking from '../models/bookingschema.js';
import Hall from '../models/hallSchema.js';
import Customer from '../models/customerSchema.js';

async function connectToDatabase(mongoURL){
    try{
        await mongoose.connect(mongoURL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log('Connected to MonogoDB');
        await insertSampleData();
    }catch(error){
        console.log('Error connecting to MongoDB',error);
    }
    }

    async function insertSampleData(){
        try{
            const sampleHallData=[
              {
                name:'Hall A',
                capacity:100,
                location:'Location A'
              },
              {
                 name:'HaLL B',
                 capacity:150,
                 location:'Location A'
              }
            ];
            const sampleCustomerData=[
                {
                  name:'John Doe',
                  email:'john@example.com',
                  phoneNumber:'1234567890'
                },
                {
                  name:'Jane Smith',
                  email:'jane@example.com',
                  phoneNumber:'0987654321'
                }
            ];

            const halls=await Hall.insertMany(sampleHallData);
            const hallId1=halls[0]._id;
            const hallId2=halls[1]._id;
            
            const customers = await Customer.insertMany(sampleCustomerData);
            const customerId1 = customers[0]._id;
            const customerId2 = customers[1]._id;

            await Booking.insertMany([
                {
                    hall:hallId1,
                    customer:customerId1,
                    date: new Date(),
                    startTime: '10:00',
                    endTime:'12:00'
                },
                {
                    hall:hallId2,
                    customer:customerId2,
                    date: new Date(),
                    startTime:'14:00',
                    endTime:'16:00'
                }

            ]);
            console.log('Sample data inserted successfully');
   }catch(error){
    console.error('Error inserting sample data:', error);
   }
 }

export default connectToDatabase;