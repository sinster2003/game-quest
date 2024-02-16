import Owner from "../../models/owners.js";
import generateToken from "../../utils/generateToken.js";
import signup from "../../zod/signup.js";
import bcrypt from "bcrypt";

const signupOwner = async (req, res) => {
    const { name, username, email, password } = req.body;
    
    // zod input validation
    signup.parse({
        name,
        username,
        email,
        password
    });

    // if owner present or not 
    const isExistingOwner = await Owner.find({$or: [
        {username},
        {email}
    ]});

    // check if owner exists
    if(isExistingOwner?.length) {
        return res.status(400).json({message: "User already exists. Please Login"});
    }

    // encrypt password
    const saltRounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // create mongodb object
    const owner = new Owner({
        name,
        username,
        email,
        password: hashedPassword,
        isOwner: true
    });

    // save
    await owner.save();

    // generate jwt ---> isOwner payload & id
    generateToken(owner._id, true, res);

    // response
    res.status(200).json({message: `${username} signed up successfully`, ownerId: owner._id, isOwner: owner.isOwner});
}

export default signupOwner;