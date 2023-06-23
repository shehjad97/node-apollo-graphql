const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const schema = new Schema({
    dummyText: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const model = mongoose.model("Test", schema);
module.exports = { TestModel: model };