import Customer from "../../models/customers.js";

const getReviewer = async (req, res) => {
    const {id: reviewerId} = req.params;

    const profilePic = await Customer.findById(reviewerId).select("profilePic");

    if(!profilePic) {
        res.status(404).json({message: "Reviewer profile not found"});
    }

    res.status(200).json(profilePic);
}

export default getReviewer;