"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const events_controller_1 = require("../controllers/events.controller");
const express_validator_1 = require("express-validator");
const validateJWT_1 = require("../middlewares/validateJWT");
const fieldValidate_1 = __importDefault(require("../middlewares/fieldValidate"));
const router = (0, express_1.Router)();
//middlewares
router.use(validateJWT_1.validateJWT);
router.get('/', events_controller_1.getEvents);
router.post('/', [
    (0, express_validator_1.check)('title', 'EL titulo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('start', 'La fecha es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('end', 'La fecha es obligatoria').not().isEmpty(),
    fieldValidate_1.default,
], events_controller_1.createEvent);
router.put('/:id', events_controller_1.updateEvent);
router.delete('/:id', events_controller_1.deleteEvent);
exports.default = router;
