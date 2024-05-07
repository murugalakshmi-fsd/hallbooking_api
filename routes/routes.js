import express from 'express';
import Booking from '../models/bookingschema.js';
import Hall from '../models/hallSchema.js';
const router=express.Router();

router.get('/bookings', async(req,res)=>{
    try{
        const bookings = await Booking.find();
        res.json(bookings);
    }catch(error){
      console.error('Error fetching bookings',error);
      res.status(500).json({error:'Internal server error'});
    }
});

router.get('/halls',async(req,res)=>{
    try{
        const halls=await Hall.find();
        res.json(halls);
    }catch(error){
        console.error('Error fetching halls',error);
        res.status(500).json({error:'Internal servor error'});
    }
});

export default router;