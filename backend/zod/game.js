import * as zod from "zod";

const gameObj = zod.object({
    title: zod.string(),
    image: zod.string(),
    description: zod.string(),
    price: zod.number()
})

gameObj.required();

export default gameObj;