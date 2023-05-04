const library = [];

function Book(title, author, publisher, releaseDate) {
  this.title = title;
  this.author = author;
  this.publisher = publisher;
  this.releaseDate = releaseDate;
  this.available = true;
}

function addBook(title, author, publisher, releaseDate) {
  library.push(new Book(title, author, publisher, releaseDate));
}

function clearTable() {
  const books = document.querySelectorAll('.bookshelf tr:not(:first-child)');
  books.forEach((book) => {
    book.remove();
  });
}

function getCamelCase(string) {
  const wordList = string.toLowerCase().split(' ');
  const firstWord = wordList[0];
  const followingWords = wordList.slice(1).map((word) => {
    const firstLetter = word.toLowerCase().split('')[0].toUpperCase();
    const followingLetters = word.slice(1);
    return [firstLetter, ...followingLetters].join('');
  });
  return [firstWord, ...followingWords].join('');
}

function displayBooks() {
  clearTable();

  const headers = document.querySelectorAll('.bookshelf tr:first-child th');
  const table = document.querySelector('.bookshelf');

  library.forEach((book) => {
    const row = document.createElement('tr');
    table.appendChild(row);

    headers.forEach(({ textContent }) => {
      const key = getCamelCase(textContent);
      const data = document.createElement('td');
      data.textContent = key in book ? book[key] : '-';
      row.appendChild(data);
    });
  });
}

addBook('a', 'a', 'a', '01/01/1990');
addBook('b', 'b', 'b', '01/01/1990');
displayBooks();
