const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;
const bcrypt = require("bcrypt");

const schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/]
    },
    password: {
        type: String,
        required: true,
    },
    superAdmin: {
        type: Boolean,
        required: true,
    },
}, { timestamps: true });

schema.pre("save", async function (next) {
    const user = this;

    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

schema.methods.isPasswordMatch = async function (password) {
    const user = this;

    return bcrypt.compare(password, user.password);
};

const model = mongoose.model("User", schema);
module.exports = { UserModel: model };