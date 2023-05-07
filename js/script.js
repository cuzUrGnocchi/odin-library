const library = [];

function getCamelCase(string) {
  const words = string.toLowerCase().split(/[ -]/);
  const firstWord = words[0];
  const followingWords = words.slice(1).map((word) => {
    const firstLetter = word.toLowerCase().split('')[0].toUpperCase();
    const followingLetters = word.slice(1);
    return [firstLetter, ...followingLetters].join('');
  });
  return [firstWord, ...followingWords].join('');
}

function Book(title, author, publisher, releaseDate, pages, available, alreadyRead) {
  this.title = title;
  this.author = author;
  this.publisher = publisher;
  this.releaseDate = releaseDate;
  this.pages = pages;
  this.available = available;
  this.alreadyRead = alreadyRead;
}

Book.prototype.toggleReadStatus = function toggleStatus() {
  this.alreadyRead = !this.alreadyRead;
};

const table = {
  rows: [],
  update() {
    document.querySelectorAll('.book-table tr:not(:first-child)').forEach((tr) => {
      tr.remove();
    });
    this.rows.forEach(({ row }) => document.querySelector('.book-table').appendChild(row));
  },
  addRow(book) {
    const row = document.createElement('tr');
    const headers = [...document.querySelectorAll('.book-table tr:first-child th')]
      .map(({ textContent }) => getCamelCase(textContent))
      .filter((header) => header !== '');

    const cells = headers.map((header) => {
      const cell = document.createElement('td');
      if (header === 'read') {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = book.alreadyRead;
        checkbox.addEventListener('click', () => {
          book.toggleReadStatus();
          checkbox.checked = book.alreadyRead;
        });
        cell.appendChild(checkbox);
      } else {
        cell.textContent = (header in book) && (book[header] !== '')
          ? book[header]
          : '-';
      }
      return cell;
    });

    const deletionButton = document.createElement('button');
    deletionButton.textContent = 'Delete';
    deletionButton.addEventListener('click', () => {
      this.rows = this.rows.filter((r) => r.row !== row);
      this.update();
    });

    cells.forEach((cell) => row.appendChild(cell));
    row.appendChild(document.createElement('td').appendChild(deletionButton));

    this.rows.push({
      row,
      book,
    });

    this.update();
  },
};

function addBook({
  title,
  author,
  publisher,
  releaseDate,
  pages,
  available,
  alreadyRead,
}) {
  const book = new Book(title, author, publisher, releaseDate, pages, available, alreadyRead);
  library.push(book);
  table.addRow(book);
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
    const iterator = new FormData(e.target).entries();
    let field = iterator.next();
    while (!field.done) {
      const bookProperty = getCamelCase(field.value[0]);
      const value = field.value[1];
      book[bookProperty] = value;
      field = iterator.next();
    }

    const checkboxes = document.querySelectorAll('form input[type="checkbox"]');
    checkboxes.forEach((checkBox) => {
      const bookProperty = getCamelCase(checkBox.getAttribute('name'));
      const value = checkBox.checked;
      book[bookProperty] = value;
    });

    addBook(book);
  });
}());
