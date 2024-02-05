import mongoose from "mongoose";

const shopsSchema = new mongoose.Schema({
    s_name: {
        type: String,
    },
    s_owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Owner"
    },
    s_games: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Game"
        }
    ]
}, {
    timestamps: true
});

const Shop = mongoose.model("Shop", shopsSchema);

export default Shop;