const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: { type: String, required: true },
  image: { type: String, required: true },
  body: {
    type: String,
    required: true,
  },
  postedBy: {
    type: ObjectId,
    ref: "User",
  },
  comments: [{ type: ObjectId, ref: "user_comment" }],
});

module.exports = mongoose.model("Post", PostSchema);
