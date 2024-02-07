import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const customersSchema = new mongoose.Schema({
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
                return /\S+\@+\S+\.+\S{2}/.test(email)
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
        default: false,
        required: true
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

customersSchema.plugin(uniqueValidator);

const Customer = mongoose.model("Customer", customersSchema);

export default Customer;