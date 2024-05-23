import { Router } from "express";
import TicketsController from "../controller/tickets.controller.js";
const ticketsController = new TicketsController();
const router = Router();

//Ver ticket
router.get("/:tid", ticketsController.getTicket);

//Agregar un ticket
router.post("/:cid", ticketsController.addTicket);

export default router