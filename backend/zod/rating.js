import * as zod from "zod";

const ratingObj = zod.object({
    rating: zod.number().min(1).max(5).nonnegative()
})

ratingObj.required();

export default ratingObj;