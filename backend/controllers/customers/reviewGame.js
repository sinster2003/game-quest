import Game from "../../models/games.js";
import Review from "../../models/reviews.js";
import reviewObj from "../../zod/review.js";

const reviewGame = async (req, res) => {
    // customer_id
    const customerId = req.customer;

    // game_id
    const gameId = req.game;

    // review details
    const { review } = req.body;

    // validate review
    reviewObj.parse({
        review
    });

    const alreadyReview = await Review.findOne({customer_id: customerId, game_id: gameId});

    if(alreadyReview) {
        return res.status(400).json({message: "The game has already been reviewed"});
    }

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
    }, {
        new: true,
        runValidators: true,
        context: "query"
    })

    // respond
    res.status(200).json({message: "Review added successful", review: reviewDocument})
}

export default reviewGame;