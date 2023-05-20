/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* defines our "object model" for books */
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
      const readMsg = this.read ? "already read" : "not read yet";
      return `${this.title} by ${this.author}, ${this.pages} pages, ${readMsg}`;
    };
  }
}

/* sample books */
const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);
const dune = new Book("Dune", "Frank Herbert", 412, true);

const myLibrary = document.querySelector(".bookshelf");

/* adds a book to the library display */
function addBookToLibrary(book) {
  const bookDiv = document.createElement("div");
  bookDiv.classList.add("book");
  const titleDiv = document.createElement("div");
  titleDiv.classList.add("title");

  setTitle(titleDiv, book);
  setWidth(bookDiv, book);
  setColor(bookDiv, titleDiv);

  bookDiv.appendChild(titleDiv);
  addRemoveListener(bookDiv);

  myLibrary.appendChild(bookDiv);
}

/* helper functions for addBookToLibrary */
function setTitle(div, book) {
  // eslint-disable-next-line no-param-reassign
  div.textContent = `${book.title} by ${book.author}`;
}

function setWidth(div, book) {
  const bookWidth = Math.max(1, book.pages / 100);
  div.setAttribute("style", `width:${bookWidth}rem`);
}

function setColor(bgDiv, fgDiv) {
  const bgStyle = bgDiv.getAttribute("style");
  const fgStyle = fgDiv.getAttribute("style");
  const colorPairs = [
    ["#2C3E50", "#E74C3C"],
    ["#3498DB", "#2C3E50"],
    ["#ECF0F1", "#2C3E50"],
    ["#E74C3C", "#2C3E50"],
  ];
  const colors =
    colorPairs[Math.round(Math.random() * (colorPairs.length - 1))];
  const swap = Math.round(Math.random());
  bgDiv.setAttribute("style", `${bgStyle};background-color:${colors[swap]}`);
  fgDiv.setAttribute("style", `${fgStyle};color:${colors[1 - swap]}`);
}

/* functions for removing books */
function removeBook(event) {
  const div = event.target;
  if (div.classList.contains("book")) {
    div.children.map((child) => child.remove());
  } else {
    div.parentElement.remove();
  }
  div.remove();
}

function addRemoveListener(node) {
  node.addEventListener("click", removeBook);
}

/* add sample books to library directly */
addBookToLibrary(theHobbit);
addBookToLibrary(dune);

/* add books from the form in the UI */
function addBookFromForm() {
  const bookForm = document.forms.addBook;
  const book = new Book(
    bookForm.title.value,
    bookForm.author.value,
    bookForm.pages.value,
    bookForm.read.checked
  );
  console.log(book);
  addBookToLibrary(book);
}

/* helper function for debugging */
// eslint-disable-next-line no-unused-vars
function showLibrary() {
  console.log(myLibrary);
}
