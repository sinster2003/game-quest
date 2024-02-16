import * as zod from "zod";

const login = zod.object({
    username: zod.string().min(2, "Username must be having minimum 2 characters"),
    password: zod.string().min(6, "Password must be having minimum 6 characters"),
    isOwner: zod.string()
})
.required("Complete all the fields");

export default login;