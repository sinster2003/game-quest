import Game from "../../models/games.js";
import Shop from "../../models/shops.js";

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

    // delete from game collection
    await Game.findByIdAndDelete(gameId);

    // delete the game from the specific shop
    await Shop.findByIdAndUpdate(shopId, {
        $pull: {
            games: gameId
        }
    });

    // respond
    res.status(200).json({message: "Game removed from the marketplace"});
}

export default deleteGame;