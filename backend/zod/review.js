import * as zod from "zod";

const reviewObj = zod.object({
    review: zod.string().max(200)
})

reviewObj.required();

export default reviewObj;