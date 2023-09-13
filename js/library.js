import Book from './Book.js';

const library = (function library() {
  const books = [];

  return {
    addBook(title, author, wasRead) {
      books.push(new Book(title, author, wasRead));
    },

    deleteBook(i) {
      books.splice(i, 1);
    },

    getCatalog() {
      return [...books];
    },
  };
}());

export default library;
