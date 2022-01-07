import Book from "../models/Book.js";

export const seeBooks = async (req, res) => {
  const books = await Book.find({});
  books.reverse();
  return res.render("books/see-books.pug", {
    pageTitle: "See Books",
    title: "Home",
    books,
  });
};

export const seeBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  if (!book) {
    return res.status(404).render("404", { pageTitle: "Page Not Found 404" });
  }
  return res.render("books/see-book.pug", { pageTitle: book.title, book });
};

export const getAddBook = (req, res) => {
  return res.render("books/add.pug", { pageTitle: "Add a Book" });
};

export const postAddBook = async (req, res) => {
  const { title, description, author, genres } = req.body;
  try {
    await Book.create({
      title,
      description,
      author,
      genres: genres.split(","),
    });
  } catch (error) {
    req.flash("error", "Error occured while adding: " + error._message);
    return res.redirect("/");
  }
  req.flash("success", "Successfully Added");
  return res.redirect("/");
};

export const getEditBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  if (!book) {
    req.flash("error", "Can't find this book!");
    return res.redirect("/");
  }
  return res.render("books/edit.pug", {
    pageTitle: `Editing ${book.title}`,
    book,
  });
};

export const postEditBook = async (req, res) => {
  const { id } = req.params;
  const { title, description, author, genres } = req.body;
  try {
    const book = await Book.findByIdAndUpdate(id, {
      title,
      description,
      author,
      genres: genres.split(","),
    });
    await book.validate();
  } catch (error) {
    req.flash("error", "Error occured while editing" + error._message);
    return res.redirect("/");
  }
  req.flash("success", "Successfully Edited");
  return res.redirect(`/books/${id}`);
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;
  await Book.findByIdAndDelete(id);
  req.flash("success", "Successfully Deleted");
  return res.redirect("/");
};
