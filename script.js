const myLibrary = [];

function Book(title, author, pages, isRead, id) {
    // constructor
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = id;

    this.info = function() {
        let readStatus = this.isRead ? "have read" : "have not read yet"

        return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}.`
    }
}

function addBookToLibrary(title, author, pages, isRead) {
    // Universal Unique Identifier = UUID
    const id = crypto.randomUUID();

    // Create book
    const createBook = new Book(title, author, pages, isRead, id);

    // Add book to array myLibrary
    myLibrary.push(createBook);
}

// Display Books to Screen
function displayBookToScreen() {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ''; // Clears render before any new book addition
    
    for (let i = 0; i < myLibrary.length; i++) {
        const tr = document.createElement('tr');
        const bookPropertiesArr = [myLibrary[i].title, myLibrary[i].author, myLibrary[i].pages, myLibrary[i].isRead];

        // Loop to add current td elements into current tr
        for (let j = 0; j < bookPropertiesArr.length; j++) {
            const td = document.createElement('td');
            td.textContent = bookPropertiesArr[j]
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
}

/* Driver Code Below */

// Books to add to Library
// addBookToLibrary('The Voudou Quantum Leap', 'Reginald Crosley', 384, true);
// addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);
// addBookToLibrary('The Resurrection of the Soul', 'Abdullah', 120, true);
// addBookToLibrary('Your Faith is Your Fortune', 'Neville Goddard', 192, true);
// addBookToLibrary('Kybalion', 'Three Initiates', 106, true);
// addBookToLibrary('The Secret Teachings of All Ages', 'Manly P. Hall', 736, true);
// addBookToLibrary('The Secret Doctrine', 'Helena Blavatsky', 1408, false);
// addBookToLibrary('The Corpus Hermeticum', 'Hermes Trismegistus', 160, true);
// addBookToLibrary('Initiation Into Hermetics', 'Franz Bardon', 356, false);
// addBookToLibrary('The Key to True Quabbalah', 'Franz Bardon', 280, false);

function userInput() {
    // pass
}


displayBookToScreen();

/* Dialog Trigger */
const showDialog = document.getElementById('show-dialog');
const dialog = document.getElementById('dialog');

showDialog.addEventListener('click', () => {
    dialog.showModal();
})