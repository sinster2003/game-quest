import Owner from "../../models/owners.js";

const getOwnerDashboard = async (req, res) => {
  // retrieve owner_id from req.owner
  const ownerId = req.owner;
  
  // find and fetch from owner database
  const ownerDetails = await Owner.findById(ownerId).select("-password").select("-updatedAt").populate("shop");

  if(!ownerDetails) {
    return res.status(404).json({message: "No owner found"});
  }

  // respond with customer details
  res.status(200).json(ownerDetails);
}

export default getOwnerDashboard;