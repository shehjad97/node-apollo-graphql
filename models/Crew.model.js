const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    biography: {
        type: String,
        required: false, 
    },
    dateOfBirth: { 
        type: Date, 
        required: false, 
    },
    gender: { 
        type: String, 
        enum: ['male', 'female', 'other'],
        required: true, 
        default: null,
    },
    nationality: {
        type: String,
        required: false, 
    },
}, { timestamps: true });

const model = mongoose.model("Crew", schema);
module.exports = { CrewModel: model };