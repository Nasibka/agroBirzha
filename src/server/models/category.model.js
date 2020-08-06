const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CategorySchema = new Schema({
    name: String,
    parent: String,
    category: String
  });

const Category = mongoose.model('Category',CategorySchema,'category');

module.exports = Category;