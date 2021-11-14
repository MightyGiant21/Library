let addBookBtn = document.querySelector(".addBookBtn");
let submitBookBtn = document.querySelector(".submitBookBtn");
let removeBookBtn = document.querySelector(".removeBookBtn");
let markAsReadBtn = document.querySelector(".markAsReadBtn");

let form = document.querySelector("#form");
let bookShelf = document.querySelector(".bookShelf");

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
markAsReadBtn.addEventListener('click', changeReadStatus);

let library = [];
let selectedBook = 0;
let bookNumber = 0;

class Book {
    constructor(title, author, pages, hasItBeenRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.hasItBeenRead = hasItBeenRead;
    }

    readStatus(readStatus) {
        this.hasItBeenRead = readStatus;
    }
}

function addBook() {
    showOrHideForm(this);
    changeButtonsToBeDisplayed(this);
}

function submitBook() {
    if (formValidation()) {
    submitInfoToLibrary();
    showOrHideForm(this);
    changeButtonsToBeDisplayed(this)
    } else {

    }
}

function removeBook() {
    bookInfoDisplay.style.display = "none";
    markAsReadBtn.style.display = "none";
    removeBookBtn.style.display = "none";
    bookShelf.children[selectedBook].removeEventListener('click', removeBook);
    bookShelf.removeChild(bookShelf.children[selectedBook])
    library.splice(selectedBook, 1);
    reOrderValuesOfBooks();
}

function reOrderValuesOfBooks() {
    // Iterate over all the children.
    // Change the values of every child after the removed book down by 1.
    for (i = selectedBook; i < bookShelf.childElementCount; i++) {
        bookShelf.children[i].value = i;
    }
}

function showOrHideForm(e) {
    if (e == addBookBtn) {
        form.style.display = "flex";
        bookInfoDisplay.style.display = "none";
        hideBooks();
    } else if (e == submitBookBtn) {
        form.style.display = "none";
        form.reset();
        showBooks();
    }
}

function hideBooks() {
    for (i = 0; i < bookShelf.childElementCount; i++) {
        bookShelf.children[i].style.display = "none";
    }
}

function showBooks() {
    for (i = 0; i < bookShelf.childElementCount; i++) {
        bookShelf.children[i].style.display = "block";
    }
}

function changeButtonsToBeDisplayed(e) {
    if (e == addBookBtn) {
        addBookBtn.style.display = "none";
        submitBookBtn.style.display = "block"
        removeBookBtn.style.display = "none";
        markAsReadBtn.style.display = "none";
    } else if (e == submitBookBtn) {
        addBookBtn.style.display = "block";
        submitBookBtn.style.display = "none"
        removeBookBtn.style.display = "none";
        markAsReadBtn.style.display = "none";
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
    // Get a bool for the radio buttons.
    // Create new object and push to array.
    let hasItBeenRead = radioButtonsCheck();
    let bookToBeSubmitted = new Book(bookTitle.value, bookAuthor.value, numberOfPagesInBook.value, hasItBeenRead);
    library.push(bookToBeSubmitted);
    // Create a new button element to represent a book.
    let book = document.createElement('button');
    book.addEventListener('click', showBookInfo);
    book.classList.add('book');
    book.value = bookNumber;
    bookNumber ++;
    bookShelf.appendChild(book);
    console.log(library);
}

function showBookInfo() {
    removeBookBtn.style.display = "block";
    bookInfoDisplay.style.display = "block";
    markAsReadBtn.style.display = "block";
    selectedBook = this.value;
    updateBookInfo();
}

function updateBookInfo() {
    bookTitleInfoToBeDisplayed.innerHTML = "The title of this book is " + library[selectedBook].title;
    bookAuthorInfoToBeDisplayed.innerHTML = "The author of this book is " + library[selectedBook].author;
    numberOfPagesInBookInfoToBeDisplayed.innerHTML = "The number of pages in this book are " + library[selectedBook].pages;
    if (library[selectedBook].hasItBeenRead) {
    hasBookBeenReadInfoToBeDisplayed.innerHTML = "You have read this book!";
    markAsReadBtn.innerHTML = "Mark as not read";
    } else if (!library[selectedBook].hasItBeenRead) {
    hasBookBeenReadInfoToBeDisplayed.innerHTML = "You have not read this book!";
    markAsReadBtn.innerHTML = "Mark as read";
    };
}

function changeReadStatus() {
    if (library[selectedBook].hasItBeenRead == false) {
        library[selectedBook].hasItBeenRead = true;
    } else if (library[selectedBook].hasItBeenRead == true) {
        library[selectedBook].hasItBeenRead = false;
    }
    updateBookInfo();
}

function formValidation() {
    if (bookTitle.value.match("^[A-Za-z0-9]{1,100}") &&
        bookAuthor.value.match("^[A-Xa-z0-9]{1,100}") &&
        numberOfPagesInBook.value.match("^[0-9]{1,100}") &&
        (radioButtons[0].checked ||
         radioButtons[1].checked)) {
             return true
         } else {
             return false
         }
    return true
}