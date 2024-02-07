import Customer from "../../models/customers.js";
import generateToken from "../../utils/generateToken.js";
import login from "../../zod/login.js";
import bcrypt from "bcrypt";

const loginCustomer = async (req, res) => {
    const { username, password } = req.body;
    
    // zod validation
    login.parse({
        username,
        password
    })

    // username present or not
    const isExistingCustomer = await Customer.find({username});

    if(!isExistingCustomer) {
        return res.status(400).json({message: "Username not found. Please sign up"});
    }

    // compare password
    const isPasswordEqual = await bcrypt.compare(password, isExistingCustomer.password);

    if(!isPasswordEqual) {
        return res.status(400).json({message: "Invalid credentials"});
    }

    // generate jwt
    generateToken(isExistingCustomer._id, false, res);

    // response
    res.status(200).json({message: `${username} logged in successfully`});
}

export default loginCustomer;