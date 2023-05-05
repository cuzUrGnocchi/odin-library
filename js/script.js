const library = [];

function Book(title, author, publisher, releaseDate, pages, available, alreadyRead) {
  this.title = title;
  this.author = author;
  this.publisher = publisher;
  this.releaseDate = releaseDate;
  this.pages = pages;
  this.available = available;
  this.alreadyRead = alreadyRead;
}

function getCamelCase(string) {
  const wordList = string.toLowerCase().split(/[ -]/);
  const firstWord = wordList[0];
  const followingWords = wordList.slice(1).map((word) => {
    const firstLetter = word.toLowerCase().split('')[0].toUpperCase();
    const followingLetters = word.slice(1);
    return [firstLetter, ...followingLetters].join('');
  });
  return [firstWord, ...followingWords].join('');
}

function clearTable() {
  const books = document.querySelectorAll('.book-table tr:not(:first-child)');
  books.forEach((book) => {
    book.remove();
  });
}

function updateDisplay() {
  clearTable();

  const headers = document.querySelectorAll('.book-table tr:first-child th');
  const table = document.querySelector('.book-table');

  library.forEach((book) => {
    const row = document.createElement('tr');
    table.appendChild(row);

    headers.forEach(({ textContent }) => {
      const key = getCamelCase(textContent);
      const data = document.createElement('td');
      data.textContent = (!(key in book) || book[key] === '')
        ? '-'
        : book[key];
      row.appendChild(data);
    });
  });
}

function addBook({
  title,
  author,
  publisher,
  releaseDate,
  pages,
  available,
  alreadyRead,
}) {
  library.push(new Book(title, author, publisher, releaseDate, pages, available, alreadyRead));
  updateDisplay();
}

(function bringUpForm() {
  const button = document.querySelector('.register');
  button.addEventListener('click', () => {
    const formContainer = document.querySelector('.form-background');
    formContainer.classList.remove('hidden');
  });
}());

(function dismissForm() {
  const formContainer = document.querySelector('.form-background');
  formContainer.addEventListener('click', (e) => {
    if (e.target === formContainer) {
      formContainer.classList.add('hidden');
    }
  });
}());

(function registerBook() {
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const book = {};

    const formData = new FormData(e.target);
    const iterator = formData.entries();
    let field = iterator.next();
    while (!field.done) {
      const key = getCamelCase(field.value[0]);
      const value = field.value[1];
      book[key] = value;
      field = iterator.next();
    }

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkBox) => {
      const key = getCamelCase(checkBox.getAttribute('name'));
      const value = checkBox.checked;
      book[key] = value;
    });

    addBook(book);
  });
}());
