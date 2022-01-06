import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  author: { type: String, required: true },
  genres: { type: [String], required: true },
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
