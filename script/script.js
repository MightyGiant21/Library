let addBookBtn = document.querySelector(".addBook");
let submitBookBtn = document.querySelector(".submitBook");
let bookShelf = document.querySelector(".bookShelf")
let bookContainer = document.querySelector(".bookContainer");
let bookBtn = document.querySelector(".book");
let form = document.querySelector("#form");
let radioButtons = document.getElementsByName("radioBtn");
let bookData = document.querySelectorAll("[data-cell]")

let titleValidation = document.querySelector("#title");
let authorValidation = document.querySelector("#author");
let pagesValidation = document.querySelector("#numberOfPages");

addBookBtn.addEventListener('click', showForm);
submitBookBtn.addEventListener('click', hideForm);
bookBtn.addEventListener('click', stuff);

let library = [];
let firstBookCheck = false;
let beenRead = false;

function showForm() {
    form.style.display = "flex";
    submitBookBtn.style.display = "block";
    bookBtn.style.display = "none";
    addBookBtn.style.display = "none";
}

function hideForm() {
    if (hasFormBeenCompletedCheck() == true) {
    form.style.display = "none";
    submitBookBtn.style.display = "none";
    bookBtn.style.display = "flex";
    addBookBtn.style.display = "block";
    if (firstBookCheck) {
        renderNewBook();
    }
    firstBookCheck = true;
    } else {

    }
}

function renderNewBook() {
    let newDiv = document.createElement("div");
    newDiv.classList.add("book");
    bookShelf.appendChild(newDiv);
}

function hasFormBeenCompletedCheck() {
    if (titleValidation.value.match("^[A-Za-z0-9]{1,50}") &&
        authorValidation.value.match("^[A-Za-z]{1,50}") && 
        pagesValidation.value.match("^[0-9]{1,50}") &&
        radioButtons[0].checked || 
        radioButtons[1].checked) {
            createNewBookInfo();
        return true
    } else {
        return false
    }
}
function checkRadioBtn() {
    if (radioButtons[0].checked) {
        return true
    } else {
        return false
    }
}

function createNewBookInfo() {
    if (radioButtons[0].checked) {
        beenRead = true;
    } else {
        beenRead = false;
    }
    let newBook = new NewBook(titleValidation.value, authorValidation.value, pagesValidation.value, beenRead);
    library.push(newBook);
}

function stuff() {
    console.log(library[0]);
}

function NewBook(title, author, pages, hasItBeenRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasItBeenRead = hasItBeenRead;
}