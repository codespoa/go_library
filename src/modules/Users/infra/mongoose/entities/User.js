const { Schema, model } = require("mongoose");
const paginate = require("../../../../../config/mongoose-paginate");

const User = new Schema(
  {
    name:     { type: String, required: true },
    email:    { type: String, unique: true, lowercase: true },
    password: { type: String, required: true },
    date_birth: { type: Date, required: true },
    phone:   { type: Number, required: true},
    role:   { type: String, select: false, enum: ['admin', 'user'], default: 'user' },
    favorite_books: { type: Array, default: [] },
  },
  { timestamps: true, selectPopulatedPaths: true }
);

User.plugin(paginate);

module.exports = model("User", User);
