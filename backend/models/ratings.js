import mongoose from "mongoose";

const ratingsSchema = new mongoose.Schema({
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
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    }
}, {
    timestamps: true
});

const Rating = mongoose.model("Rating", ratingsSchema);

export default Rating;