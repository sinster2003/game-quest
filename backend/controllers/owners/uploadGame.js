import Game from "../../models/games.js";
import Shop from "../../models/shops.js";
import gameObj from "../../zod/game.js";
import {v2 as cloudinary} from "cloudinary";

const uploadGame = async (req, res) => {
    // shop id from rgister middleware
    const shopId = req.shop;

    // game details
    const {title, description, price } = req.body;
    let {image} = req.body; 

    // validation for game
    gameObj.parse({
        title,
        image, 
        description,
        price
    });

    if(image) {
        const cloudImage = await cloudinary.uploader.upload(image, {
            timeout: 120000
        });
        image = cloudImage.secure_url;
    }

    // game is saved
    const game = new Game({
        title,
        image,
        description,
        price,
        selling_shop: shopId
    });

    await game.save();

    // update shop so it has the game in registery
    const shop = await Shop.findByIdAndUpdate(shopId, {
        $push: {
            games: game._id
        }
    }, {
        new: true,
        runValidators: true,
        context: "query"
    }).populate("games");

    res.status(200).json({message: "Game uploaded successfully", gameId: game._id});
}

export default uploadGame;