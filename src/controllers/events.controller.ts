import { ApiFunction } from '../types/global';
import Event from '../models/Event';

export const getEvents: ApiFunction = async (req, res) => {
  const listEvents = await Event.find().populate('user', 'email');

  return res.status(200).json({
    ok: true,
    listEvents,
  });
};

export const createEvent: ApiFunction = async (req, res) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid;
    const savedEvent = await event.save();
    return res.status(200).json({
      ok: true,
      savedEvent,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'Please contact the administrator',
    });
  }
};

export const updateEvent: ApiFunction = async (req, res) => {
  const eventID = req.params.id;

  try {
    const event = await Event.findById(eventID);

    if (event) {
      if (event.user != req.uid) {
        return res.status(401).json({
          ok: false,
          msg: 'You are not allowed to delete this event',
        });
      } else {
        const newEvent = {
          ...req.body,
          user: req.uid,
        };

        const eventUpdated = await Event.findByIdAndUpdate(eventID, newEvent, {
          new: true,
        });
        return res.json({
          ok: true,
          event: eventUpdated,
        });
      }
    } else {
      return res.status(404).json({
        ok: false,
        msg: 'Event not found',
      });
    }
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'Please contact the administrator',
    });
  }
};

export const deleteEvent: ApiFunction = async (req, res) => {
  const eventID = req.params.id;

  try {
    const event = await Event.findById(eventID);

    if (event) {
      if (event.user != req.uid) {
        return res.status(401).json({
          ok: false,
          msg: 'You are not allowed to delete this event',
        });
      } else {
        const eventDeleted = await Event.findByIdAndDelete(eventID);
        return res.json({
          ok: true,
          msg: 'Event deleted successfully!',
          event: eventDeleted,
        });
      }
    } else {
      return res.status(404).json({
        ok: false,
        msg: 'Event not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Please contact the administrator',
    });
  }
};
