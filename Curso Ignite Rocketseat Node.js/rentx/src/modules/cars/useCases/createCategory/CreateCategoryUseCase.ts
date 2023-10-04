import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";


interface IRequest {
    name: string;
    description: string;
}

class CreateCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) { };


    execute({ description, name }: IRequest): void {

        const categoryExist = this.categoriesRepository.findByName(name);
        if (categoryExist) {
            throw new Error("Category already exists!");

        };

        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase }