import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const shopsSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
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
        type: String,
        default: null
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

shopsSchema.plugin(uniqueValidator);

const Shop = mongoose.model("Shop", shopsSchema);

export default Shop;