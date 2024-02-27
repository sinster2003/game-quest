import * as zod from "zod";

const reviewObj = zod.object({
    review: zod.string().min(3, "The value must be at least of 3 characters").max(200, "The value must be atmost 200 characters")
})

reviewObj.required();

export default reviewObj;