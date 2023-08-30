const {response} = require('express')
const Event = require('../models/events')

const getEvents = async(req,res=response) => {
    const events = await Event.find()
                                .populate('user','name');

    res.json({
        ok: true,
        events
    });
}
const createEvent = async ( req, res = response ) => {

    const event = new Event( req.body );

    try {

        event.user = req.uid;
        
        const eventSave = await event.save();

        res.json({
            ok: true,
            event: eventSave
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Talk to developers'
        });
    }
}
const updateEvent = async(req,res=response) => {
    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById( eventId );

        if ( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'Event non existent'
            });
        }

        if ( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'You do not have privilege to edit this event'
            });
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const eventUpdated = await Event.findByIdAndUpdate( eventId, newEvent, { new: true } );

        res.json({
            ok: true,
            evento: eventUpdated
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Talk to developers'
        });
    }

}
const deleteEvent = async(req,res=response) => {
    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById( eventId );

        if ( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'Event non existent'
            });
        }

        if ( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'You do not have privilege to delete this event'
            });
        }


        await Event.findByIdAndDelete( eventId );

        res.json({ ok: true });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Talk to developers'
        });
    }

}

module.exports={
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent 
}