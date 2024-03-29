import Owner from "../../models/owners.js";
import Shop from "../../models/shops.js";
import register from "../../zod/register.js";
import {v2 as cloudinary} from "cloudinary";

const registerMarketplace = async (req, res) => {
    // owner id
    const ownerId = req.owner;

    // check if owner already owns a shop
    const owner = await Owner.findById(ownerId);

    if(owner.shop) {
        return res.status(400).json({message: "You own a marketplace already"});
    }

    // details of the marketplace
    const {name, location} = req.body;
    let {logo} = req.body;

    // input validations
    register.parse({
        name,
        location,
        logo
    })

    // if shop exists throw an error
    const isExistingShop = await Shop.findOne({name});
    
    if(isExistingShop) {
        return res.status(400).json({message: "Shop already exists"});
    }
    
    // no logo deletion
    if(logo) {
        const result = await cloudinary.uploader.upload(logo);
        logo = result.secure_url;
    }

    // register the shop or marketplace
    const shop = new Shop({
        name,
        owner: ownerId,
        location,
        logo,
    })

    // saving the marketplace in shops collection
    await shop.save();

    // updation of owner referring to the shop
    await Owner.findByIdAndUpdate(ownerId, {shop: shop._id}, {
        new: true,
        runValidators: true,
        context: "query"
    });

    res.status(200).json({
        message: "Marketplace successfully registered",
        shop
    });
}

export default registerMarketplace;