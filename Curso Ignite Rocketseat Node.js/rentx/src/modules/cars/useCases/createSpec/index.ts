import { SpecRepository } from "../../repositories/implementations/SpecRepository";
import { CreateSpecController } from "./CreateSpecController";
import { CreateSpecUseCase } from "./CreateSpecUseCase";


const createSpecRepository = new SpecRepository();
const createSpecUseCase = new CreateSpecUseCase(createSpecRepository);
const createSpecController = new CreateSpecController(createSpecUseCase);


export { createSpecController }

