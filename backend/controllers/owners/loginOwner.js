import Owner from "../../models/owners.js";
import generateToken from "../../utils/generateToken.js";
import login from "../../zod/login.js";
import bcrypt from "bcrypt";

const loginOwner = async (req, res) => {
    const { username, password } = req.body;
    
    // zod validation
    login.parse({
        username,
        password
    })

    // username present or not
    const isExistingOwner = await Owner.findOne({username});

    if(!isExistingOwner) {
        return res.status(400).json({message: "Username not found. Please sign up"});
    }

    // compare password
    const isPasswordEqual = await bcrypt.compare(password, isExistingOwner.password);

    if(!isPasswordEqual) {
        return res.status(400).json({message: "Invalid credentials"});
    }

    // generate jwt
    generateToken(isExistingOwner._id, true, res);

    // response
    res.status(200).json({message: `${username} logged in successfully`});
}

export default loginOwner;