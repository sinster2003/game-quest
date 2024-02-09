import Shop from "../models/shops.js";

const registeredMarketplace = async (req, res, next) => {
    const ownerId = req.owner;

    const shop = await Shop.findOne({owner: ownerId});

    if(!shop) {
        return res.status(400).json({message: "Register a marketplace first"});
    }

    req.shop = shop._id;

    next();
}

export default registeredMarketplace;