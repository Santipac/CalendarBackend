import { ApiFunction } from '../types/global';

export const getEvents: ApiFunction = async (req, res) => {
  return res.status(200).json({
    ok: true,
    msg: 'getEvents',
  });
};

export const createEvent: ApiFunction = async (req, res) => {
  console.log(req.body);
  return res.status(201).json({
    ok: true,
    msg: 'createEvent',
  });
};

export const updateEvent: ApiFunction = async (req, res) => {
  return res.status(200).json({
    ok: true,
    msg: 'updateEvent',
  });
};

export const deleteEvent: ApiFunction = async (req, res) => {
  return res.status(200).json({
    ok: true,
    msg: 'deleteEvent',
  });
};
