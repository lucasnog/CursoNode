import { CreateSpecUseCase } from "./CreateSpecUseCase";
import { Request, Response } from "express";



class CreateSpecController {
    constructor(private createSpecUseCase: CreateSpecUseCase) { };

    handle(request: Request, response: Response): Response {
        const { name, description } = request.body;
        this.createSpecUseCase.execute({ name, description });
        return response.status(201).json("criado");
    }
}

export { CreateSpecController }