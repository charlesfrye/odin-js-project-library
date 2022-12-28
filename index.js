class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
      const read_msg = this.read ? "already read" : "not read yet";
      return `${this.title} by ${this.author}, ${this.pages} pages, ${read_msg}`;
    };
  }
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);
const dune = new Book("Dune", "Frank Herbert", 412, true);

const myLibrary = document.querySelector(".bookshelf");

function addBookToLibrary(book) {
  const book_div = document.createElement("div");
  book_div.classList.add("book");
  const title_div = document.createElement("div");
  title_div.classList.add("title");

  setTitle(title_div, book);
  setWidth(book_div, book);
  setColor(book_div, title_div);

  book_div.appendChild(title_div);
  myLibrary.appendChild(book_div);
}

function setTitle(div, book) {
  div.textContent = `${book.title} by ${book.author}`;
}

function setWidth(div, book) {
  const book_width = Math.max(1, book.pages / 100);
  div.setAttribute("style", `width:${book_width}rem`);
}

function setColor(bg_div, fg_div) {
  const bg_style = bg_div.getAttribute("style");
  const fg_style = fg_div.getAttribute("style");
  const colorPairs = [
    ["#2C3E50", "#E74C3C"],
    ["#3498DB", "#2C3E50"],
    ["#ECF0F1", "#2C3E50"],
    ["#E74C3C", "#2C3E50"],
  ];
  const colors =
    colorPairs[Math.round(Math.random() * (colorPairs.length - 1))];
  const swap = Math.round(Math.random());
  bg_div.setAttribute("style", `${bg_style};background-color:${colors[swap]}`);
  fg_div.setAttribute("style", `${fg_style};color:${colors[1 - swap]}`);
}

addBookToLibrary(theHobbit);
addBookToLibrary(dune);

function addBookFromForm() {
  console.log("hello!");
  const bookForm = document.forms["addBook"];
  const book = new Book(
    bookForm.title.value,
    bookForm.author.value,
    bookForm.pages.value,
    bookForm.read.checked
  );
  console.log(book);
  addBookToLibrary(book);
}

function showLibrary() {
  console.log(myLibrary);
}
