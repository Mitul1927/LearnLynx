const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NoticeSchema = new Schema(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
    title: {
      type: String,
      required: true,
    },
    notice:{
        type:String,
        require:true
    }
  },
  { timestamps: true } // Enable timestamps (createdAt and updatedAt)
);

module.exports = mongoose.model("Notice", NoticeSchema);
