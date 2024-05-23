import TicketModel from "../models/ticket.models.js";
import CartsService from "./carts.service.js";
const cartsService = new CartsService();

class TicketsService {
    //create ticket
    async addTicket(cid,user){
        try {
            let checkoutCart = await cartsService.cartPurchase(cid)
            let amount;
            for (let i = 0; i < checkoutCart.length; i++) {
               amount = (checkoutCart[i].product.price) * (checkoutCart[i].quantity)
            }
            console.log(amount)
            const newTicket = new TicketModel(amount,user);
            
            return await newTicket.save()
        } catch (error) {
            throw new Error("Error while creating a ticket")
        }
    }

    async getTicket(ticketId){
        try {
            let ticket = await TicketModel.findById(ticketId)
            return cart
        } catch (error) {
            throw new Error("Error while getting a ticket")
        }
    }
}

export default TicketsService