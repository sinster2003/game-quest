import bcrypt from 'bcrypt';
import {v2 as cloudinary} from "cloudinary"; 
import Owner from "../../models/owners.js";

const updateProfile = async (req, res) => {
    const ownerId = req.owner;
    const {profilePic, name, username, email, password} = req.body;

    const owner = await Owner.findById(ownerId);

    if(!owner) {
        return res.status(404).json({message: "User not found"});
    }

    if(password) {
        const saltRounds = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        owner.password = hashedPassword || owner.password;
    }

    owner.name = name.trim() || owner.name;
    owner.username = username.trim() || owner.username;
    owner.email = email.trim() || owner.email;
    
    // if profilePic changes
    if(profilePic && (profilePic !== owner.profilePic)) {
        if(owner.profilePic) {
            await cloudinary.uploader.destroy(owner.profilePic.split("/").pop().split(".")[0]);
        }
        const result = await cloudinary.uploader.upload(profilePic);
        owner.profilePic = result.secure_url;
    }

    await owner.save();

    res.status(200).json({message: "Profile updated", id: ownerId, isOwner: true});
}

export default updateProfile;