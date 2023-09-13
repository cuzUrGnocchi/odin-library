class Book {
  #title;

  #author;

  #wasRead;

  constructor(title, author, wasRead = false) {
    this.#title = title;
    this.#author = author;
    this.#wasRead = wasRead;
  }

  get title() {
    return this.#title;
  }

  set title(title) {
    this.#title = title;
  }

  get author() {
    return this.#author;
  }

  set author(author) {
    this.#author = author;
  }

  get wasRead() {
    return this.#wasRead;
  }

  toggleReadStatus() {
    this.#wasRead = !this.#wasRead;
  }
}

export default Book;
