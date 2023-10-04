

interface ICreateSpecDTO {
    name: string;
    description: string;
}

interface ISpecRespository {
    create({ name, description }: ICreateSpecDTO): void;
}

export { ISpecRespository, ICreateSpecDTO }