import express from 'express';
import Booking from '../models/bookingschema.js';
import Hall from '../models/hallSchema.js';
const router=express.Router();

router.post('/halls', async (req, res) => {
    try {
        const hall = await Hall.create(req.body);
        res.status(201).json(hall);
    } catch (error) {
        console.error('Error creating hall:', error);
        res.status(500).json({ error: 'Internal server error' });
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

router.post('/bookings', async (req, res) => {
    try {
        const booking = await Booking.create(req.body);
        const hall = await Hall.findById(req.body.hall);
        if (!hall) {
            return res.status(404).json({ error: 'Hall not found' });
        }
        const seatsBooked = req.body.customer.seats; 
        const newAvailability = hall.availability - seatsBooked;
        await Hall.findByIdAndUpdate(req.body.hall, { availability: newAvailability });
        res.status(201).json(booking);
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/bookings/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.json(booking);
    } catch (error) {
        console.error('Error fetching booking:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/bookings/:id', async (req, res) => {
    try {
        const oldBooking = await Booking.findById(req.params.id);
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBooking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        const hall = await Hall.findById(updatedBooking.hall);
        if (!hall) {
            return res.status(404).json({ error: 'Hall not found' });
        }
        const oldSeats = oldBooking.customer.seats;
        console.log(oldSeats);
        const newSeats = updatedBooking.customer.seats;
        console.log(newSeats);
        const seatsDifference = newSeats - oldSeats;
        if(seatsDifference>=0){
            const newAvailability = hall.availability - seatsDifference;
            if (newAvailability < 0) {
                return res.status(400).json({ error: 'Insufficient seats available in the hall' });
            }
            console.log("availability decreased");
            await Hall.findByIdAndUpdate(hall._id, { availability: newAvailability });
        }
        else if(seatsDifference<0){
            const newAvailability = hall.availability + seatsDifference;
            // if (newAvailability < 0) {
            //     return res.status(400).json({ error: 'Insufficient seats available in the hall' });
            // }
            console.log("availability increased");
            await Hall.findByIdAndUpdate(hall._id, { availability: newAvailability });
        }
        
            res.status(200).json({ message: 'Booking updated successfully', booking: updatedBooking });
       
    } catch (error) {
        console.error('Error updating booking:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/bookings/:id', async (req, res) => {
    try {
        const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
        if (!deletedBooking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        const hall = await Hall.findById(deletedBooking.hall);
        if (!hall) {
            return res.status(404).json({ error: 'Hall not found' });
        }
        // Increment hall availability by the number of seats previously booked in this booking
        const seatsReleased = deletedBooking.customer.seats;
        const newAvailability = hall.availability + seatsReleased;
        await Hall.findByIdAndUpdate(hall._id, { availability: newAvailability });
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        console.error('Error deleting booking:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


export default router;