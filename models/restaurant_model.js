const mongoose = require('mongoose');
//create schema command
const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

// schema is blueprint of actual collection
const reataurantSchema = new Schema({
  username:{ type: String, required: true },
  description:{ type: String, required: true },
  address:{ type: String, required: true },
  contact:{ type: Number, required: true },
  date: { type: Date, required: true}
}, {
  timestamp: true,
});


const Restaurant = mongoose.model('Restaurant',reataurantSchema);
module.exports = Restaurant;

