let myLibrary = [];

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

    this.getID = function() {
        return this.id;
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

        // Loop to add current book property elements into current table row
        for (let j = 0; j < bookPropertiesArr.length; j++) {
            const td = document.createElement('td');
            td.textContent = bookPropertiesArr[j]
            tr.appendChild(td);
        }

        // Create button to remove book from table
        const deleteBtn = document.createElement('button');
        const deleteBtnTableData = document.createElement('td');
        // Set an id for deleteBtn
        deleteBtn.classList.add('delete-btn');
        // Give deleteBtn text
        deleteBtn.textContent = 'Remove Book';
        // Append deleteBtn to td
        deleteBtnTableData.appendChild(deleteBtn);
        // Append deleteBtnTableData to tr
        tr.appendChild(deleteBtnTableData);

        // Append tr to tbody
        tbody.appendChild(tr);

        // Remove Book object eventlistener
        deleteBtn.addEventListener('click', () => {
            const id = myLibrary[i].getID();
            const updatedLibrary = myLibrary.filter(book => book.id !== id);

            myLibrary = updatedLibrary;
            displayBookToScreen();
        });
    }
}

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

/* Dialog Trigger */
const showDialog = document.getElementById('show-dialog');
const dialog = document.getElementById('dialog');
const form = document.getElementById('book-inputs');

showDialog.addEventListener('click', () => {
    dialog.showModal();
});

/* Driver Code Below */
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Stops refresh of the page after button submit is clicked which would remove all data displayed on screen

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const isRead = document.getElementById('read-status').checked;

    addBookToLibrary(title, author, pages, isRead);
    displayBookToScreen();

    form.reset();
    dialog.close();
});
