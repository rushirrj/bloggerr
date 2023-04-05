const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    reqired: true,
  },
  password: {
    type: String,
    reqired: true,
  },
  email: {
    type: String,
    reqired: true,
    unique: true,
  },
  admin:{
    type:Boolean,
    reqired:true,
  }
});

module.exports= mongoose.model("User",UserSchema)
