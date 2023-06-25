const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const runtimeSchema = new Schema({
    hours: { type: Number, required: true },
    minutes: { type: Number, required: true, min: 0, max: 59 },
}, { _id : false });

const actorSchema = new Schema({
    _id: { type: ObjectId, required: true, ref: 'Crew' },
    character: { type: String, required: false },
}, { _id : false });

const directorSchema = new Schema({
    _id: { type: ObjectId, required: true, ref: 'Crew' },
}, { _id : false });

const producerSchema = new Schema({
    _id: { type: ObjectId, required: true, ref: 'Crew' },
}, { _id : false });

const staffSchema = new Schema({
    _id: { type: ObjectId, required: true, ref: 'Crew' },
}, { _id : false });

const schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['movie', 'tv_show'],
        required: true,
    },
    genre: {
        type: String,
        required: false,
    },
    runtime: {
        type: runtimeSchema,
        required: true,
    },
    actors: [{
        type: actorSchema,
        required: false,
    }],
    directors: [{
        type: directorSchema,
        required: false,
    }],
    producers: [{
        type: producerSchema,
        required: false,
    }],
    staff: [{ // Other crew members
        type: staffSchema,
        required: false,
    }],
}, { timestamps: true });

const model = mongoose.model("Content", schema);
module.exports = { ContentModel: model };