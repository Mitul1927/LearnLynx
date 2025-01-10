const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const classSchema = new Schema({
    teacher:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    roomCode:{
        type:String,
        default:null,
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true, 
    },
    date: {
        type: Date,
        required: true, 
    },
    time_start: {
        type: String,
        required: true, 
    },
    time_to: {
        type: String,
        required: true, 
    },
});

module.exports = mongoose.model("Class", classSchema);
