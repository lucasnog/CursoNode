import { Router } from "express";
import { createSpecController } from "../modules/cars/useCases/createSpec";
import { specs } from "../modules/cars/repositories/implementations/SpecRepository";

const specRoutes = Router();

specRoutes.post("/", (req, res) => createSpecController.handle(req, res));

specRoutes.get("/", (req, res) => {
    return res.status(200).json(specs);
})

export { specRoutes };