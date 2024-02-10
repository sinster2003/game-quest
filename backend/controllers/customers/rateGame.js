import Game from "../../models/games";
import Rating from "../../models/ratings";
import ratingObj from "../../zod/rating";

const rateGame = async (req, res) => {
    // customer_id
    const customerId = req.customerId;

    // game_id
    const gameId = req.game;

    // rating details
    const { rating } = req.body;

    // validate rating
    ratingObj.parse({
        rating
    });

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
    });

    // respond
    res.status().json({message: `The game has been rated with ${rating} stars`});
}

export default rateGame;