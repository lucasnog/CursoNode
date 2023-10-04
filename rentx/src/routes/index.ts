import { Router } from "express";
import { categoriesRoutes } from "./categories.routes";
import { specificationRoutes } from "./specification.routes";
import { specRoutes } from "./spec.routes";

const router = Router();


router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationRoutes);
router.use("/spec", specRoutes);

export { router };