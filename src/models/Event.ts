import { Schema, model } from 'mongoose';

interface IEvent {
  title: string;
  notes: string;
  start: Date;
  end: Date;
  user: Schema.Types.ObjectId | string;
}

const eventSchema = new Schema<IEvent>({
  title: { type: String, required: true },
  notes: { type: String },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const Event = model<IEvent>('Event', eventSchema);
export default Event;
