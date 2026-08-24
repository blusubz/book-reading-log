let myLibrary = [];

function Book(title, author, pages, isRead, id) {
    // constructor
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = id;
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
    
    // Loop to create a table row per Book object
    for (let i = 0; i < myLibrary.length; i++) {
        const tr = document.createElement('tr');
        // const bookPropertiesArr = [myLibrary[i].title, myLibrary[i].author, myLibrary[i].pages, myLibrary[i].isRead];
        const entries = Object.entries(myLibrary[i]); // Get key:value pairs per book

        // Loop to add current book property elements into current table row
        for (let j = 0; j < entries.length; j++) {
            const td = document.createElement('td');
            const [bookProperty, bookValue] = entries[j]; 
            

            // Filter out anything not a book property to display such as title, author, pages and read status
            if (typeof bookValue === 'function' || bookProperty === 'id') {
                continue;
            }

            // Add td into tr
            if (bookProperty === 'isRead') {
                const checkbox = document.createElement('input');
                const label = document.createElement('label');
                const span = document.createElement('span');

                // Give label a class
                label.classList.add('td-label');

                // OLD 
                checkbox.type = 'checkbox';
                checkbox.checked = bookValue;
                // td.textContent = bookValue;
                // td.appendChild(checkbox);
                span.textContent = bookValue;
                label.appendChild(span);
                label.appendChild(checkbox);

                // On change of the Read Status checkbox
                checkbox.addEventListener('change', () => {
                    myLibrary[i].isRead = checkbox.checked;
                    span.textContent = myLibrary[i].isRead;
                });
                td.appendChild(label);
            } else {
                td.textContent = bookValue;
            }
            
            tr.appendChild(td);
        }

        // Create button to remove book from table
        const deleteBtn = document.createElement('button');
        const deleteBtnTableData = document.createElement('td');
        // Set a class for deleteBtn
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
            const id = myLibrary[i].id;
            const updatedLibrary = myLibrary.filter(book => book.id !== id);

            myLibrary = updatedLibrary;
            displayBookToScreen();
        });
    }
}

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


