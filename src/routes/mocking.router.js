import { Router } from "express";
import createProds from "../utils/faker.js";
const router = Router();

router.get("/", async (req,res)=>{
    const mockProds = [];

    for (let i = 0; i < 100; i++) {

        mockProds.push(createProds());

    }
    res.json(mockProds)
})

export default router