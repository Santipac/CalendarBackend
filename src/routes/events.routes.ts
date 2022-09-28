import { Router } from 'express';
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from '../controllers/events.controller';
import { check } from 'express-validator';
import { validateJWT } from '../middlewares/validateJWT';
import { isDate } from 'util/types';
import fieldValidate from '../middlewares/fieldValidate';

const router = Router();
//middlewares
router.use(validateJWT);
router.get('/', getEvents);

router.post(
  '/',
  [
    check('title', 'EL titulo es obligatorio').not().isEmpty(),
    check('start', 'La fecha es obligatoria').not().isEmpty(),
    check('end', 'La fecha es obligatoria').not().isEmpty(),
    fieldValidate,
  ],
  createEvent
);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

export default router;
