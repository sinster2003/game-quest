import Game from "../../models/games.js";
import Shop from "../../models/shops.js";
import gameObj from "../../zod/game.js";

const uploadGame = async (req, res) => {
    // shop id from rgister middleware
    const shopId = req.shop;

    // game details
    const {title, image, description, price } = req.body;

    // validation for game
    gameObj.parse({
        title,
        image, 
        description,
        price
    });

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

    res.status(200).json({message: "Game uploaded successfully", games: shop.games});
}

export default uploadGame;