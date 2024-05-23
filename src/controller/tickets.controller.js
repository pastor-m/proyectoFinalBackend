import TicketsService from "../services/tickets.services.js";
const ticketsService = new TicketsService();

class TicketsController {
    async getTicket(req,res){
        try {
            let ticket = await ticketsService.getTicket(req.params.tid);
            res.json(ticket)
        } catch (error) {
            res.status(500).json({message:"Server error"})
        }
    }

    async addTicket(req,res){

        try {
            await ticketsService.addTicket(req.params.cid,req.body)
            res.send({message:"New ticket added"});
        } catch (error) {
            res.status(500).json({message:"Server error"})
        }
    }
}

export default TicketsController