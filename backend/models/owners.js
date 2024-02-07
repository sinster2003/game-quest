import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const ownerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        minLength: 2,
        maxLength: 20,
        unique: true,
        required: true
    },
    email: {
        type: String,
        validator: {
            validate: (email) => {
                return /\S+\@+\S+\.+\S/.test(email)
            }
        },
        unique: true,
        required: true
    },
    password: {
        type: String,
        minLength: 6,
        required: true
    },
    profilePic: {
        type: String
    },
    isOwner: {
        type: Boolean,
        default: true,
        required: true
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
    }
}, {
    timestamps: true
});

ownerSchema.plugin(uniqueValidator);

const Owner = mongoose.model("Owner", ownerSchema);

export default Owner;