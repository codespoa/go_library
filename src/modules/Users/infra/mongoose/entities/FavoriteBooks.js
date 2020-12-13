const { Schema, model } = require("mongoose")
const paginate = require("../../../../../config/mongoose-paginate")


const FavoriteBooks = new Schema(
  {
    user_id: { type: String, required: true },
    favorite: [{ type: Schema.Types.ObjectId, ref: 'Books', default: [] }],
  },
  { timestamps: true, selectPopulatedPaths: true }
)

FavoriteBooks.plugin(paginate)

module.exports = model("FavoriteBooks", FavoriteBooks)
