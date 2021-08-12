const mongoose = require('mongoose');
//create schema command
const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

// schema is blueprint of actual collection
const userSchema = new Schema({
  userid:{
    type: String,
  },
  username:{
    type: String,
    unique: true,
    required: true,
    trim: true,
    minlength: 3
  },
}, {
  timestamp: true,
});


const User =mongoose.model('User',userSchema);
module.exports = User;