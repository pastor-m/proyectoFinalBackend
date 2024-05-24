import TicketModel from "../models/ticket.models.js";


class TicketsService {
    //create ticket
    async addTicket(cart){
        try {
            const newTicket = new TicketModel(cart);
            return await newTicket.save()
        } catch (error) {
            throw new Error("Error while creating a ticket")
        }
    }

    async getTicket(ticketId){
        try {
            let ticket = await TicketModel.findById(ticketId)
            return ticket
        } catch (error) {
            throw new Error("Error while getting a ticket")
        }
    }
}

export default TicketsService