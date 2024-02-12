import Game from "../../models/games.js";
import Rating from "../../models/ratings.js";
import ratingObj from "../../zod/rating.js";

const rateGame = async (req, res) => {
    // customer_id
    const customerId = req.customer;

    // game_id
    const gameId = req.game;

    // rating details
    const { rating } = req.body;

    // validate rating
    ratingObj.parse({
        rating
    });

    const alreadyRated = await Rating.findOne({customer_id: customerId, game_id: gameId});

    if(alreadyRated) {
        return res.status(400).json({message: "The game has already been rated"});
    }

    // add rating to the rating collection
    const ratingDocument = new Rating({
        customer_id: customerId,
        game_id: gameId,
        rating
    });

    await ratingDocument.save();

    // update game ratings in the games collection
    await Game.findByIdAndUpdate(gameId, {
        $push: {
            ratings: ratingDocument._id
        }
    }, {
        new: true,
        runValidators: true,
        context: "query"
    });

    // respond
    res.status(200).json({message: `The game has been rated with ${rating} stars`});
}

export default rateGame;