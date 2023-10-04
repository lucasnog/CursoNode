import { Category } from "../model/Category"


interface ICreateCategoryDTO {
    name: string;
    description: string;
}


interface ICategoriesRepository {
    findByName(name: string): Category;
    listar(): Category[];
    create({ name, description }: ICreateCategoryDTO): void;
}

export { ICategoriesRepository, ICreateCategoryDTO }