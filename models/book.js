const mongoose = require("mongoose"),
bookSchema = mongoose.Schema({
    name: String, 
    author: String,
    link: String
});
const Books = mongoose.model("Books", bookSchema);
module.exports= Books;