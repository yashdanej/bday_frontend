const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    dob: {
        type: Date,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }
},
    {timestamps: true}
);

exports.users = mongoose.model("users", UserSchema);