import mongoose from "mongoose";
const {Schema, model} = mongoose;

const studentSchema = new Schema({
    name: String,
    school_id:{
        type: Schema.Types.ObjectId,
        ref: "school",
    },
    marks: [],
});

export const studentModel = model("student", studentSchema);