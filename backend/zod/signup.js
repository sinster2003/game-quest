import * as zod from "zod";

const signup = zod.object({
    name: zod.string(),
    username: zod.string().min(2, "Username must be a minimum of 2 characters").max(20, "Username must be a maximum of 20 characters"),
    email: zod.string().email("Invalid Email"),
    password: zod.string().min(6, "Password must be a minimum of 6 characters")
})

signup.required();

export default signup;