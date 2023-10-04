
import { Router } from "express";
import { createSpecificationController } from "../modules/cars/useCases/createSpecifications";
import { listSpecificationsController } from "../modules/cars/useCases/listSpecifications";




const specificationRoutes = Router();


specificationRoutes.post("/", (req, res) => createSpecificationController.handle(req, res));


specificationRoutes.get("/", (req, res) => listSpecificationsController.handle(req, res));

export { specificationRoutes }