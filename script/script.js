let addBookBtn = document.querySelector(".addBook");
let submitBookBtn = document.querySelector(".submitBook");
let bookShelf = document.querySelector(".bookShelf")
let bookBtn = document.querySelectorAll("[data-cell]");
let form = document.querySelector("#form");
let radioButtons = document.getElementsByName("radioBtn");

let titleValidation = document.querySelector("#title");
let authorValidation = document.querySelector("#author");
let pagesValidation = document.querySelector("#numberOfPages");

let bookInfo = document.querySelector(".bookInfoContainer");
let title = document.querySelector(".bookTitle");
let author = document.querySelector(".bookAuthor");
let pagesInBook = document.querySelector(".pagesInBook");
let readStatus = document.querySelector(".readStatus");

addBookBtn.addEventListener('click', showForm);
submitBookBtn.addEventListener('click', hideForm);

for (i = 0; i < bookBtn.length; i++) {
    bookBtn[i].addEventListener('click', showBookInfo);
}

let library = [];
let beenRead = false;

function NewBook(title, author, pages, hasItBeenRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasItBeenRead = hasItBeenRead;
}

function showForm() {
    changeDisplayOfTarget(this);
    hideBooks();
}

function hideForm() {
    if (hasFormBeenCompletedCheck() == true) {
        createNewBookInfo();
        changeDisplayOfTarget(this);
        showBooks();
        form.reset();
    } else {

    }   
}

function hideBooks() {
    bookInfo.style.display = "none";
    for (i = 0; i < bookBtn.length; i++) {
        bookBtn[i].style.display = "none";
    }
}

function showBooks() {
    console.log(library);
    for (i = 0; i < library.length; i++) {
        bookBtn[i].style.display = "flex";
    }
}

function hasFormBeenCompletedCheck() {
    // if (titleValidation.value.match("^[A-Za-z0-9]{1,50}") &&
    //     authorValidation.value.match("^[A-Za-z]{1,50}") && 
    //     pagesValidation.value.match("^[0-9]{1,50}") &&
    //     radioButtons[0].checked || 
    //     radioButtons[1].checked) {
    //         createNewBookInfo();
    //         return true
    // } else {
    //     return false
    // }
    return true
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

function changeDisplayOfTarget(e) {
    if (e == addBookBtn) {
        form.style.display = "flex";
        submitBookBtn.style.display = "block";
        addBookBtn.style.display = "none";
    } else if (e == submitBookBtn) {
            form.style.display = "none";
            submitBookBtn.style.display = "none";
            addBookBtn.style.display = "block";
    }
}

function hideBookInfo() {
    bookInfo.style.display = "flex";
}

function showBookInfo() {
    bookInfo.style.display = "flex";
    title.innerHTML = library[0].title;
    author.innerHTML = library[0].author;
    pagesInBook.innerHTML = library[0].pages;
    readStatus.innerHTML = library[0].hasItBeenRead;
}