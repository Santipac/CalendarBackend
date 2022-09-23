import { Router } from 'express';
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from '../controllers/events.controller';
import { validateJWT } from '../middlewares/validateJWT';

const router = Router();
//middlewares
router.use(validateJWT);

router.get('/', getEvents);

router.post('/', createEvent);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

export default router;
