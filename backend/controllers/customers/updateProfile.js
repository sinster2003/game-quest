import Customer from "../../models/customers.js";
import bcrypt from 'bcrypt';
import {v2 as cloudinary} from "cloudinary"; 

const updateProfile = async (req, res) => {
    const customerId = req.customer;
    const {profilePic, name, username, email, password} = req.body;

    console.log(customerId);
    const customer = await Customer.findById(customerId);

    if(!customer) {
        return res.status(404).json({message: "User not found"});
    }

    if(password) {
        const saltRounds = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        customer.password = hashedPassword || customer.password;
    }

    customer.name = name.trim() || customer.name;
    customer.username = username.trim() || customer.username;
    customer.email = email.trim() || customer.email;
    
    if(profilePic && (profilePic !== customer.profilePic)) {
        if(customer.profilePic) {
            await cloudinary.uploader.destroy(customer.profilePic.split("/").pop().split(".")[0]);
        }
        const result = await cloudinary.uploader.upload(profilePic);
        customer.profilePic = result.secure_url;
    }

    await customer.save();

    res.status(200).json({message: "Profile updated", id: customerId, isOwner: false});
}

export default updateProfile;