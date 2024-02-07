import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const customersSchema = new mongoose.Schema({
    c_name: {
        type: String,
        required: true
    },
    c_username: {
        type: String,
        minLength: 2,
        maxLength: 20,
        unique: true,
        required: true
    },
    c_email: {
        type: String,
        validator: {
            validate: (email) => {
                return /\S+\@+\S+\.+\S{2}/.test(email)
            }
        },
        unique: true,
        required: true
    },
    c_password: {
        type: String,
        minLength: 6,
        required: true
    },
    c_profilePic: {
        type: String
    },
    is_owner: {
        type: Boolean,
        default: false,
        required: true
    },
    c_games: [
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