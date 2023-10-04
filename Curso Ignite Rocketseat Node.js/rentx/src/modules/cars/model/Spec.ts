import { v4 as uuidV4 } from "uuid";

class Spec {
    id?: string;
    name: string;
    description: string;
    created_at: string;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }

    }
}


export { Spec }