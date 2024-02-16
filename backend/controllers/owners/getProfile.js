import Owner from "../../models/owners.js";

const getProfile = async (req, res) => {
    const ownerId = req.owner;
    
    const owner = await Owner.findById(ownerId).select("-password").select("-updatedAt").populate("shop");
    
    res.status(200).json(owner);
}

export default getProfile;