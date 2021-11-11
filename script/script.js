// When a book is removed, a book is popped from the library therefore the value changes

let addBookBtn = document.querySelector(".addBookBtn");
let submitBookBtn = document.querySelector(".submitBookBtn");
let removeBookBtn = document.querySelector(".removeBookBtn");

let form = document.querySelector("#form");
let bookShelf = document.querySelector(".bookShelf");
// let books = document.querySelectorAll(".book");

let bookTitle = document.querySelector("#title");
let bookAuthor = document.querySelector("#author");
let numberOfPagesInBook = document.querySelector("#numberOfPages")
let radioButtons = document.querySelectorAll("#radioBtn");

let bookTitleInfoToBeDisplayed = document.querySelector(".bookTitle");
let bookAuthorInfoToBeDisplayed = document.querySelector(".bookAuthor");
let numberOfPagesInBookInfoToBeDisplayed = document.querySelector(".pagesInBook");
let hasBookBeenReadInfoToBeDisplayed = document.querySelector(".readStatus");

let bookInfoDisplay = document.querySelector(".bookInfoContainer");

addBookBtn.addEventListener('click', addBook);
submitBookBtn.addEventListener('click', submitBook);
removeBookBtn.addEventListener('click', removeBook);

// for (i = 0; i < books.length; i++) {
//     books[i].addEventListener('click', showBookInfo);
// }

let library = [];
let selectedBook;

function addBook() {
    showOrHideForm(this);
    changeButtonsToBeDisplayed(this);
}

function submitBook() {
    submitInfoToLibrary();
    showOrHideForm(this);
    changeButtonsToBeDisplayed(this);
}

function removeBook() {
    bookInfoDisplay.style.display = "none";
    books[selectedBook].style.display = "none";
    removeBookFromLibrary(selectedBook);
}

function showOrHideForm(e) {
    if (e == addBookBtn) {
        form.style.display = "flex";
        // showOrHideBooks(true);
        bookInfoDisplay.style.display = "none";
    } else if (e == submitBookBtn) {
        form.style.display = "none";
        // showOrHideBooks(false);
    }
}

// function showOrHideBooks(hideBooks) {
//     if (hideBooks) {
//         for (i = 0; i < library.length; i++){
//             books[i].style.display = "none";
//         }
//     } else {
//         for (i = 0; i < library.length; i++) {
//             books[i].style.display = "block";
//         }
//     }
// }

function changeButtonsToBeDisplayed(e) {
    if (e == addBookBtn) {
        addBookBtn.style.display = "none";
        submitBookBtn.style.display = "block"
        removeBookBtn.style.display = "none";
    } else if (e == submitBookBtn) {
        addBookBtn.style.display = "block";
        submitBookBtn.style.display = "none"
        removeBookBtn.style.display = "none";
    }
}

function radioButtonsCheck() {
    if (radioButtons[0].checked) {
        return true
    } else {
        return false
    }
}

function submitInfoToLibrary() {
    let hasItBeenRead = radioButtonsCheck();
    let bookToBeSubmitted = new CreateNewBook(bookTitle.value, bookAuthor.value, numberOfPagesInBook.value, hasItBeenRead);
    library.push(bookToBeSubmitted);
    let book = document.createElement("button");
    book.addEventListener('click', showBookInfo);
    book.classList.add('book');
    bookShelf.appendChild(book);
}

function removeBookFromLibrary(bookToBeRemoved) {
    library.splice(bookToBeRemoved, 1);
}

function showBookInfo() {
    removeBookBtn.style.display = "block";
    bookInfoDisplay.style.display = "block";
    selectedBook = this.value;
    bookTitleInfoToBeDisplayed.innerHTML = "The title of this book is " + library[selectedBook].title;
    bookAuthorInfoToBeDisplayed.innerHTML = "The author of this book is " + library[selectedBook].author;
    numberOfPagesInBookInfoToBeDisplayed.innerHTML = "The number of pages in this book are " + library[selectedBook].pages;
    if (library[selectedBook].hasItBeenRead) {
    hasBookBeenReadInfoToBeDisplayed.innerHTML = "You have read this book!"
    } else if (!library[selectedBook].hasItBeenRead) {
    hasBookBeenReadInfoToBeDisplayed.innerHTML = "You have not read this book!";
    };
}

function CreateNewBook(title, author, pages, hasItBeenRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasItBeenRead = hasItBeenRead;
}