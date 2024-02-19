import Game from "../../models/games.js";
import Shop from "../../models/shops.js";

const getGame = async (req, res) => {
    const {id} = req.params;
    const shopId = req.shop;

    const game = await Game.findById(id);

    if(!game) {
        return res.status(400).json({message: "Game not found"});
    }

    const shop = await Shop.findById(shopId);

    const isGameValid = shop.games.filter(game => game._id === id);

    if(!isGameValid) {
        return res.status(400).json({message: "Game not found or invalid id"});
    }

    res.status(200).json({message: "Game Found", game});
}

export default getGame;