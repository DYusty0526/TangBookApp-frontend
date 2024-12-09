import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './BookListPage.css';
import Header from './Header';

function BookListPage() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('title-asc'); // Default sorting by title (A-Z)
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const booksPerPage = 20; // Number of books per page (updated to 20)

  useEffect(() => {
    // Fetch books from the backend when the page loads
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:7000/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  // Filter books based on the search term (title, author, or published date)
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.publicationDate.includes(searchTerm) // Match publication date as well
  );

  // Sort books based on the selected sorting method
  const sortedBooks = filteredBooks.sort((a, b) => {
    if (sortBy === 'title-asc') {
      return a.title.localeCompare(b.title);
    }
    if (sortBy === 'title-desc') {
      return b.title.localeCompare(a.title);
    }
    if (sortBy === 'author-asc') {
      return a.author.localeCompare(b.author);
    }
    if (sortBy === 'author-desc') {
      return b.author.localeCompare(a.author);
    }
    if (sortBy === 'date-asc') {
      return new Date(a.publicationDate) - new Date(b.publicationDate);
    }
    if (sortBy === 'date-desc') {
      return new Date(b.publicationDate) - new Date(a.publicationDate);
    }
    return 0;
  });

  // Get current books for the current page
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Change page handler
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="booklist-container">
      <div className="booklist-box">
        <Header isLoginPage={false} /> 

        <h2>Book List</h2>

        <div className="search-sort">
          <input
            type="text"
            placeholder="Search by title, author, or published date"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
            <option value="title-asc">Title A-Z</option>
            <option value="title-desc">Title Z-A</option>
            <option value="author-asc">Author A-Z</option>
            <option value="author-desc">Author Z-A</option>
            <option value="date-asc">Date Published (Oldest to Newest)</option>
            <option value="date-desc">Date Published (Newest to Oldest)</option>
          </select>
        </div>

        <div className="books-list">
          {currentBooks.map((book) => (
            <div className="book-card" key={book.id}>
              <Link to={`/bookdetails/${book.id}`} className="book-link">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="book-cover"
                />
                <div className="book-info">
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                  <p>{book.publicationDate}</p> {/* Display the publication date */}
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="pagination">
          {Array.from({ length: Math.ceil(filteredBooks.length / booksPerPage) }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <div className="footer">
          <Link to="/userhome" className="back-btn">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

export default BookListPage;
