import Customer from "../../models/customers.js";
import generateToken from "../../utils/generateToken.js";
import signup from "../../zod/signup.js";
import bcrypt from "bcrypt";

const signupCustomer = async (req, res) => {
    const { name, username, email, password } = req.body;
    
    // zod input validation
    signup.parse({
        name,
        username,
        email,
        password
    });

    // if user present or not 
    const isExistingCustomer = await Customer.find({$or: [
        {username},
        {email}
    ]});

    // check if customerexists
    if(isExistingCustomer?.length) {
        return res.status(400).json({message: "User already exists. Please Login"});
    }

    // encrypt password
    const saltRounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // create mongodb object
    const customer = new Customer({
        name,
        username,
        email,
        password: hashedPassword,
        isOwner: false
    });

    // save
    await customer.save();

    // generate jwt ---> isOwner payload & id
    generateToken(customer._id, false, res);

    // response
    res.status(200).json({message: `${username} signed up successfully`});
}

export default signupCustomer;