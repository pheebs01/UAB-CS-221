// Function to search books using Google Books API
function searchBooks() {
  const searchInput = document.getElementById('searchInput').value;
  const bookListContainer = document.getElementById('bookList');
  
  // Handle empty search input
  if (!searchInput) {
      alert('Please enter a title or author');
      return;
  }

  // Make API request (you can replace 'YOUR_API_KEY' with your actual API key)
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchInput)}`;
  fetch(apiUrl)
      .then(response => response.json())
      .then(data => displayBooks(data.items))
      .catch(error => console.error('Error fetching books:', error));
}

// Function to display books in the book list
function displayBooks(books) {
  const bookListContainer = document.getElementById('bookList');
  bookListContainer.innerHTML = ''; // Clear previous results

  books.forEach(book => {
      const bookItem = document.createElement('div');
      bookItem.classList.add('book');
      bookItem.innerHTML = `<h3>${book.volumeInfo.title}</h3><p>${book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'}</p>`;
      
      // Create expand/collapse button
      const expandButton = document.createElement('button');
      expandButton.textContent = 'Expand';
      expandButton.onclick = () => displayBookDetails(book);
      bookItem.appendChild(expandButton);

      bookListContainer.appendChild(bookItem);
  });
}

// Function to display book details
function displayBookDetails(book) {
  const bookDetailsContainer = document.getElementById('bookDetails');
  bookDetailsContainer.innerHTML = `<h2>${book.volumeInfo.title}</h2>`;
  
  // Additional details
  const details = document.createElement('div');
  details.classList.add('book-details');
  details.innerHTML = `<p><strong>Author(s):</strong> ${book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'}</p>
                      <p><strong>Published Date:</strong> ${book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate : 'Not Available'}</p>
                      <p><strong>Description:</strong> ${book.volumeInfo.description ? book.volumeInfo.description : 'No description available'}</p>
                      <button onclick="addToMyBookshelf('${book.id}')">Add to My Bookshelf</button>`;
  
  bookDetailsContainer.appendChild(details);
}

// Function to add a book to the My Bookshelf section
function addToMyBookshelf(bookId) {
  const myBookshelfContainer = document.getElementById('myBookshelf');
  const savedBooks = JSON.parse(localStorage.getItem('myBookshelf')) || [];

  // Check if the book is already in the bookshelf
  if (savedBooks.some(book => book.id === bookId)) {
      alert('Book already in My Bookshelf');
      return;
  }

  // Find the book details from the API response
  const book = /* Fetch the book details using the bookId */;

  // Add the book to the bookshelf
  savedBooks.push({
      id: book.id,
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'
  });

  // Save the updated bookshelf to local storage
  localStorage.setItem('myBookshelf', JSON.stringify(savedBooks));

  // Display the updated bookshelf
  displayMyBookshelf();
}

// Function to display My Bookshelf
function displayMyBookshelf() {
  const myBookshelfContainer = document.getElementById('myBookshelf');
  myBookshelfContainer.innerHTML = '<h2>My Bookshelf</h2>';

  const savedBooks = JSON.parse(localStorage.getItem('myBookshelf')) || [];

  savedBooks.forEach(book => {
      const bookItem = document.createElement('div');
      bookItem.classList.add('my-bookshelf');
      bookItem.innerHTML = `<h3>${book.title}</h3><p>${book.author}</p>
                            <button onclick="removeFromMyBookshelf('${book.id}')">Remove</button>`;
      
      myBookshelfContainer.appendChild(bookItem);
  });
}

// Function to remove a book from My Bookshelf
function removeFromMyBookshelf(bookId) {
  let savedBooks = JSON.parse(localStorage.getItem('myBookshelf')) || [];

  // Remove the book from the bookshelf
  savedBooks = savedBooks.filter(book => book.id !== bookId);

  // Save the updated bookshelf to local storage
  localStorage.setItem('myBookshelf', JSON.stringify(savedBooks));

  // Display the updated bookshelf
  displayMyBookshelf();
}

// Display My Bookshelf on page load
displayMyBookshelf();
