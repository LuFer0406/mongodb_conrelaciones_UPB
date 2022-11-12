import mongoose from "mongoose";

const {Schema, model} = mongoose;

const mongoSchema = new Schema({
    student_name: String,
    school:{
        school_id: Number,
        name: {
            type: String,
            required: true,
        },
        address: String,
        city: String,
        state: String,
        zipcode: String,
    },
    marks: [],
});

export const mongoModel = model("mongo", mongoSchema);