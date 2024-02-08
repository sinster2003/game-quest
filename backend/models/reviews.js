import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    game_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game",
        required: true
    },
    review: {
        type: String,
        maxLength: 200,
        required: true
    }
}, {
    timestamps: true
});

const Review = mongoose.model("Review", reviewsSchema);

export default Review;