import Game from "../../models/games";
import Review from "../../models/reviews";
import reviewObj from "../../zod/review";

const reviewGame = async (req, res) => {
    // customer_id
    const customerId = req.customerId;

    // game_id
    const gameId = req.game;

    // review details
    const { review } = req.body;

    // validate review
    reviewObj.parse({
        review
    });

    // add review to the reviews collection
    const reviewDocument = new Review({
        customer_id: customerId,
        game_id: gameId,
        review
    })

    await reviewDocument.save();

    // update game reviews in the games collection
    await Game.findByIdAndUpdate(gameId, {
        $push: {
            reviews: reviewDocument._id
        }
    })

    // respond
}

export default reviewGame;