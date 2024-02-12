import Purchase from "../models/purchases.js";

const boughtGameAuth = async (req, res, next) => {
    // customer id who rates or reviews
    const customerId = req.customer;

    // game id to be rated or reviewed
    const gameId = req.params.id;
    console.log(gameId);

    const gameBought = await Purchase.findOne({customer_id: customerId, game_id: gameId});

    if(!gameBought) {
        return res.status(400).json({message: "Please buy the game from the marketplace to rate or review it"});
    }

    req.game = gameId;

    next();
}   

export default boughtGameAuth;