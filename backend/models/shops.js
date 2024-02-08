import mongoose from "mongoose";

const shopsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Owner",
        required: true
    },
    location: {
        type: String,
        required: true
    },
    logo: {
        type: String
    },
    games: [
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