import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './EditBookListPage.css';
import Header from './Header';

function EditBookListPage() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('title-a-z');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(20); // Number of books to display per page

  useEffect(() => {
    fetchBooks();
  }, [sortOption]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:7000/books');
      const sortedBooks = sortBooks(response.data);
      setBooks(sortedBooks);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const sortBooks = (books) => {
    switch (sortOption) {
      case 'title-a-z':
        return books.sort((a, b) => a.title.localeCompare(b.title));
      case 'title-z-a':
        return books.sort((a, b) => b.title.localeCompare(a.title));
      case 'author-a-z':
        return books.sort((a, b) => a.author.localeCompare(b.author));
      case 'author-z-a':
        return books.sort((a, b) => b.author.localeCompare(a.author));
      default:
        return books;
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="editbooklist-container">
      <div className="editbooklist-box">
        <Header isLoginPage={false} /> 

        <h2>Choose a Book to Edit</h2>

        <div className="search-sort-container">
          <input
            type="text"
            placeholder="Search by title or author"
            value={searchTerm}
            onChange={handleSearch}
            className="search-bar"
          />
          <div className="sorting-options">
            <select onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
              <option value="title-a-z">Title A-Z</option>
              <option value="title-z-a">Title Z-A</option>
              <option value="author-a-z">Author A-Z</option>
              <option value="author-z-a">Author Z-A</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p>Loading books...</p>
        ) : (
          <div className="book-list">
            {currentBooks.map((book) => (
              <div key={book.id} className="book-card">
                <img
                  src={book.coverImage || 'default-image.jpg'}
                  alt={book.title}
                  className="book-image"
                  onClick={() => window.location.href = `/editbook/${book.id}`}
                />
                <div className="book-info">
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="pagination-btn"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

        <div className="footer">
          <Link to="/adminhome" className="back-btn">Back to Admin Home</Link>
        </div>
      </div>
    </div>
  );
}

export default EditBookListPage;
