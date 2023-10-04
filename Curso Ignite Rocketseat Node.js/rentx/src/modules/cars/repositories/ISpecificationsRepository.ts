import { Specifications } from "../model/Specifications"


interface ICreateSpecificationDTO {
    name: string,
    description: string,
}

interface ISpecificationRepository {
    create({ name, description }: ICreateSpecificationDTO): void;

    findName(name: string): ICreateSpecificationDTO;

    listar(): Specifications[];
}

export { ISpecificationRepository, ICreateSpecificationDTO }