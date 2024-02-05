import mongoose from "mongoose";

const gamesSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    image: {
        type: String
    },
    description: {
        type: String
    }
}, {
    timestamps: true
});

const Game = mongoose.model("Game", gamesSchema);

export default Game;