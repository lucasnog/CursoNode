import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";



class ListCategoriesUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) { };

    execute() {
        const categories = this.categoriesRepository.listar();
        return categories;
    }
}

export { ListCategoriesUseCase }