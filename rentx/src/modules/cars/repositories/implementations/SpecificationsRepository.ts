import { Specifications } from "../../model/Specifications";
import { ICreateSpecificationDTO, ISpecificationRepository } from "../ISpecificationsRepository";



class SpecificationsRepository implements ISpecificationRepository {
    private specifications: Specifications[];

    //singleton
    private static INSTANCE: SpecificationsRepository;
    private constructor() {
        this.specifications = [];
    }
    public static getInstance(): SpecificationsRepository {
        if (!SpecificationsRepository.INSTANCE) {
            SpecificationsRepository.INSTANCE = new SpecificationsRepository();
        }
        return SpecificationsRepository.INSTANCE;
    }

    //singleton

    create({ name, description }: ICreateSpecificationDTO): void {
        const specifications = new Specifications;

        Object.assign(specifications, {
            name,
            description,
            date: new Date()
        })
        this.specifications.push(specifications)
    }


    findName(name: string): ICreateSpecificationDTO {
        const specificationExist = this.specifications.find((spec) => spec.name === name);
        return specificationExist;

    }
    listar(): Specifications[] {
        return this.specifications
    }

}

export { SpecificationsRepository }