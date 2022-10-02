"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.createEvent = exports.getEvents = void 0;
const Event_1 = __importDefault(require("../models/Event"));
const getEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listEvents = yield Event_1.default.find().populate('user', 'email');
    return res.status(200).json({
        ok: true,
        listEvents,
    });
});
exports.getEvents = getEvents;
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const event = new Event_1.default(req.body);
    try {
        event.user = req.uid;
        const savedEvent = yield event.save();
        return res.status(200).json({
            ok: true,
            savedEvent,
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contacte con un administrador.',
        });
    }
});
exports.createEvent = createEvent;
const updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventID = req.params.id;
    try {
        const event = yield Event_1.default.findById(eventID);
        if (event) {
            if (event.user != req.uid) {
                return res.status(401).json({
                    ok: false,
                    msg: 'No tiene permisos para eliminar este evento.',
                });
            }
            else {
                const newEvent = Object.assign(Object.assign({}, req.body), { user: req.uid });
                const eventUpdated = yield Event_1.default.findByIdAndUpdate(eventID, newEvent, {
                    new: true,
                });
                return res.json({
                    ok: true,
                    event: eventUpdated,
                });
            }
        }
        else {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado.',
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contacte con un administrador.',
        });
    }
});
exports.updateEvent = updateEvent;
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventID = req.params.id;
    try {
        const event = yield Event_1.default.findById(eventID);
        if (event) {
            if (event.user != req.uid) {
                return res.status(401).json({
                    ok: false,
                    msg: 'No tiene permisos para eliminar este evento.',
                });
            }
            else {
                const eventDeleted = yield Event_1.default.findByIdAndDelete(eventID);
                return res.json({
                    ok: true,
                    msg: 'Se eliminó el Evento Correctamente!',
                    event: eventDeleted,
                });
            }
        }
        else {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado',
            });
        }
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor contacte con un administrador.',
        });
    }
});
exports.deleteEvent = deleteEvent;
