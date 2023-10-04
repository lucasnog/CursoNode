import { ISpecificationRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateSpecificationUseCase {
    constructor(private specRepository: ISpecificationRepository) { };

    execute({ description, name }: IRequest): void {
        const specExist = this.specRepository.findName(name);

        if (specExist) {
            throw new Error("Specification already exist.")
        }

        this.specRepository.create({ name, description });
    }

}

export { CreateSpecificationUseCase }