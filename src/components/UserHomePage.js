import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './UserHomePage.css';
import Header from './Header';

function UserHomePage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch books from backend
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

  const randomBooks = books.sort(() => 0.5 - Math.random()).slice(0, 4);

  return (
    <div className="userhome-container">
      <div className="userhome-box">
        <Header isLoginPage={false} />
        
        <h2>Welcome to Your Book Collection</h2>
        <h3>Today's Picks</h3>

        <div className="books-list">
          {randomBooks.map((book) => (
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
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="more-button">
          <Link to="/booklist" className="more-btn">View More</Link>
        </div>

        <div className="footer">
          <Link to="/login" className="exit-btn">Exit</Link>
        </div>
      </div>
    </div>
  );
}

export default UserHomePage;
