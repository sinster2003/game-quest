import mongoose from "mongoose";

const shopsSchema = new mongoose.Schema({
    s_name: {
        type: String,
        required: true
    },
    s_owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Owner",
        required: true
    },
    s_location: {
        type: String,
        required: true
    },
    s_logo: {
        type: String
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