import mongoose from "mongoose";

const gamesSchema = new mongoose.Schema({
    title: {
        type: String,
        maxLength: 50,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        maxLength: 500,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    selling_shop: {
        type: mongoose.Types.Schema.ObjectId,
        ref: "Shop",
        required: true
    },
    ratings: [
        {
            type: mongoose.Types.Schema.ObjectId,
            ref: "Rating"
        }
    ],
    reviews: [
        {
            type: mongoose.Types.Schema.ObjectId,
            ref: "Review"
        }
    ]
}, {
    timestamps: true
});

const Game = mongoose.model("Game", gamesSchema);

export default Game;