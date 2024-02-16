import Customer from "../../models/customers.js";

const getProfile = async (req, res) => {
    const customerId = req.customer;
    
    const customer = await Customer.findById(customerId).select("-password").select("-updatedAt").populate("games");
    
    res.status(200).json(customer);
}

export default getProfile;