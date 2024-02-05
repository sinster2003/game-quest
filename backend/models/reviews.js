import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    game_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game"
    },
    review: {
        type: String
    }
}, {
    timestamps: true
});

const Review = mongoose.model("Review", reviewsSchema);

export default Review;