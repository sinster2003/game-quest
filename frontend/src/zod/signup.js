import * as zod from "zod";

const signup = zod.object({
    fullname: zod.string().min(2),
    username: zod.string().min(2, "Username must be having minimum 2 characters"),
    email: zod.string().email("Invalid email"),
    password: zod.string().min(6, "Password must be having minimum 6 characters"),
    confirmPassword: zod.string().min(6, "ConfirmPassword must be having minimum 6 characters"),
})
.superRefine((value, issue) => {
    if(value.password !== value.confirmPassword) {
        issue.addIssue({
            path: ["password"], // in password field
            code: zod.ZodIssueCode.custom, // mentioning custom error message
            message: "Password does not match the confirm password"
        })
    }
})

export default signup;