import Game from "../models/games.js"

const getGames = async (req, res) => {
    const games = await Game.find({});
    res.status(200).json(games);
}

export default getGames