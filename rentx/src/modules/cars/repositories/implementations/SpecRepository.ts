import { Spec } from "../../model/Spec";
import { ISpecRespository, ICreateSpecDTO } from "../ISpecRepository";

const specs: Spec[] = [];
class SpecRepository implements ISpecRespository {


    create({ name, description }: ICreateSpecDTO): void {
        const spec = new Spec();

        Object.assign(spec, {
            name,
            description,
            date: new Date()
        })
        specs.push(spec);
    }
}

export { SpecRepository, specs }