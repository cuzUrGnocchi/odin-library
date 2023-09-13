import library from './library.js';

const table = document.querySelector('.table');

let updateTable;

function summonForm() {
  const background = document.querySelector('.background');
  background.classList.remove('hidden');
}

function dismissForm(e) {
  if (e.target === document.querySelector('.background')) {
    e.target.classList.add('hidden');
  }
}

function addHeader(row, cssClass, text) {
  const header = document.createElement('th');
  header.classList.add(cssClass);
  header.textContent = text;
  header.scope = 'col';

  row.appendChild(header);
}

function addText(row, content) {
  const text = document.createElement('td');
  text.textContent = content;

  row.appendChild(text);
}

function addCheckbox(row, book) {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = book.wasRead;
  checkbox.addEventListener('click', () => {
    book.toggleReadStatus();
    checkbox.checked = book.wasRead;
  });

  row.appendChild(checkbox);
}

function addButton(row, i) {
  const button = document.createElement('button');
  button.textContent = 'Delete';
  button.addEventListener('click', () => {
    library.deleteBook(i);

    updateTable();
  });

  row.appendChild(button);
}

updateTable = () => {
  table.innerHTML = '';

  const headerRow = document.createElement('tr');
  addHeader(headerRow, 'title', 'Title');
  addHeader(headerRow, 'author', 'Author');
  addHeader(headerRow, 'was-read', 'Read');
  addHeader(headerRow, 'delete', '');

  table.appendChild(headerRow);

  const books = library.getCatalog();
  for (let i = 0; i < books.length; i += 1) {
    const row = document.createElement('tr');
    addText(row, books[i].title);
    addText(row, books[i].author);
    addCheckbox(row, books[i]);
    addButton(row, i);

    table.appendChild(row);
  }
};

function registerBook(e) {
  e.preventDefault();

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const wasRead = document.querySelector('#was-read').checked;
  library.addBook(title, author, wasRead);

  updateTable();
}

document.querySelector('.form-summoner').addEventListener('click', summonForm);
document.querySelector('.background').addEventListener('click', dismissForm);
document.querySelector('.form > input[type="submit"]').addEventListener('click', registerBook);

updateTable();
