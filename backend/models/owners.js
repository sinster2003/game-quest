import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema({
    o_name: {
        type: String,
    },
    o_username: {
        type: String
    },
    o_email: {
        type: String
    },
    o_password: {
        type: String
    },
    is_owner: {
        type: Boolean
    },
    o_shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop"
    }
}, {
    timestamps: true
});

const Owner = mongoose.model("Owner", ownerSchema);

export default Owner;