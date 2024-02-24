import Game from "../../models/games.js";
import Shop from "../../models/shops.js";
import {v2 as cloudinary} from "cloudinary";

const deleteGame =  async (req, res) => {
    // game_id
    const gameId = req.params.id;

    // shop_id
    const shopId = req.shop;

    // check if the game is present in shop or not
    const shop = await Shop.findById(shopId);

    const isExistingGameInShop = shop.games?.find((game) => game.toString() === gameId);

    if(!isExistingGameInShop) {
        return res.status(404).json({message: "Game Not found"});
    }

    const {image: gameImage} = await Game.findById(gameId).select("image");

    if(gameImage && gameImage.includes("cloudinary")) {
        const gameImageId = gameImage.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(gameImageId);
    }

    // delete from game collection
    await Game.findByIdAndDelete(gameId);

    // delete the game from the specific shop
    await Shop.findByIdAndUpdate(shopId, {
        $pull: {
            games: gameId
        }
    }, {
        new: true,
        runValidators: true,
        context: "query"
    });

    // respond
    res.status(200).json({message: "Game removed from the marketplace", games: isExistingGameInShop.games});
}

export default deleteGame;