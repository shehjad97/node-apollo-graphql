const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const schema = new Schema({
    dummyText: {
        type: String,
        required: true,
    },
}, { timestamps: true });

schema.methods.toJSON = function () {
    let obj = this.toObject();

    delete obj.createdAt;
    delete obj.updatedAt;
    delete obj.__v;

    return obj;
};

const model = mongoose.model("Test", schema);
module.exports = { TestModel: model };