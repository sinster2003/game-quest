import mongoose from "mongoose";

const ratingsSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    game_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game"
    },
    rating: {
        type: Number
    }
}, {
    timestamps: true
});

const Rating = mongoose.model("Rating", ratingsSchema);

export default Rating;