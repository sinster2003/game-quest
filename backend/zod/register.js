import * as zod from "zod";

const register = zod.object({
    name: zod.string(),
    location: zod.string(),
    logo: zod.string().optional()
})

register.required();

export default register;