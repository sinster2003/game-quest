import Game from "../../models/games.js";

const getGameDetails = async (req, res) => {
    const {id: gameId} = req.params;

    const game = await Game.findById(gameId).populate("selling_shop").populate("reviews").populate("ratings");

    if(!game) { 
        return res.status(404).json({message: "Game not found"});
    }

    res.status(200).json(game);
}

export default getGameDetails