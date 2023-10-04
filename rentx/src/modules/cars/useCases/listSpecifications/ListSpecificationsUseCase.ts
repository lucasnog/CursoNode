import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";



class ListSpecificationsUseCase {
    constructor(private specificationsRepository: SpecificationsRepository) { };

    execute() {
        const speficications = this.specificationsRepository.listar();
        return speficications;
    }
}

export { ListSpecificationsUseCase }