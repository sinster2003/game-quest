import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const ownerSchema = new mongoose.Schema({
    o_name: {
        type: String,
        required: true
    },
    o_username: {
        type: String,
        minLength: 2,
        maxLength: 20,
        unique: true,
        required: true
    },
    o_email: {
        type: String,
        validator: {
            validate: (email) => {
                return /\S+\@+\S+\.+\S/.test(email)
            }
        },
        unique: true,
        required: true
    },
    o_password: {
        type: String,
        minLength: 6,
        required: true
    },
    o_profilePic: {
        type: String
    },
    is_owner: {
        type: Boolean,
        default: true,
        required: true
    },
    o_shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
    }
}, {
    timestamps: true
});

ownerSchema.plugin(uniqueValidator);

const Owner = mongoose.model("Owner", ownerSchema);

export default Owner;