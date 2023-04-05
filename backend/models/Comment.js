const mongoose = require('mongoose')
const { Schema } = mongoose;

const Comment = new Schema({
    content: {type:String}
  });
  
  module.exports = mongoose.model("user_comment", Comment);