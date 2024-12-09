import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './BookDetailsPage.css';
import Header from './Header';

function BookDetailsPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    // Fetch book details by ID when the page loads
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };
    fetchBookDetails();
  }, [id]);

  if (!book) return <div>Loading...</div>;

  return (
    <div className="bookdetails-container">
      <div className="bookdetails-box">
        <Header isLoginPage={true} /> 

        <div className="book-details-content">
          <div className="book-image">
            <img
              src={book.coverImage}
              alt={book.title}
              className="book-cover-image"
            />
          </div>

          <div className="book-info">
            <h1>{book.title}</h1>
            <h3>{book.author}</h3>
            <p><strong>Published:</strong> {book.publicationDate}</p>
            <p><strong>Description:</strong></p>
            <p>{book.description}</p>
          </div>
        </div>

        <div className="footer">
          <Link to="/booklist" className="back-btn">Back to Book List</Link>
        </div>
      </div>
    </div>
  );
}

export default BookDetailsPage;
