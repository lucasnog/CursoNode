import { ICreateSpecDTO, ISpecRespository } from "../../repositories/ISpecRepository";
import { SpecRepository, specs } from "../../repositories/implementations/SpecRepository";


class CreateSpecUseCase {
    constructor(private specRepository: SpecRepository) { };

    execute({ name, description }: ICreateSpecDTO): void {

        const specExists = specs.find((specs) => specs.name === name);

        if (specExists) {
            throw new Error("Spec já existe");
        };

        this.specRepository.create({ name, description });

    }
}

export { CreateSpecUseCase }