import * as zod from "zod";

const login = zod.object({
    username: zod.string().min(2, "Username must be a minimum of 2 characters").max(20, "Username must be a maximum of 20 characters"),
    password: zod.string().min(6, "Password must be a minimum of 6 characters"),
})

login.required();

export default login;