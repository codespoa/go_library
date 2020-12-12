const { Schema, model } = require("mongoose");
const paginate = require("../../../../../config/mongoose-paginate");

const Book = new Schema(
  {
    title: { type: String, required: true },
    bio: { type: String },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    release: { type: Date, required: true },
    category: { type: String, required: true },
    status: { type: String, enum: ['rented', 'not rented', 'lack'], default: 'not rented' },
    isbn: { type: String, required: true},
    rented: { type: String, default: ''}
  },
  { timestamps: true, selectPopulatedPaths: true }
);

Book.plugin(paginate);

module.exports = model("Book", Book);
