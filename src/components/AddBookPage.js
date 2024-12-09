import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './AddBookPage.css';
import Header from './Header';

function AddBookPage() {
  const [book, setBook] = useState({
    title: '',
    author: '',
    description: '',
    publicationDate: '',
    coverImage: ''
  });

  const [loading, setLoading] = useState(false);  // For loading state
  const [showModal, setShowModal] = useState(false); // For showing confirmation modal

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({
      ...book,
      [name]: value
    });
  };

  const handleClear = () => {
    setBook({
      title: '',
      author: '',
      description: '',
      publicationDate: '',
      coverImage: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Handle optional cover image
    const bookData = { ...book, coverImage: book.coverImage || null };

    // Get the JWT token from localStorage
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      alert('You need to log in first!');
      return;
    }

    try {
      // Send the POST request to the backend with the JWT token
      const response = await axios.post('http://localhost:7000/books', bookData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Show the success modal after the book is added
      setShowModal(true);
      handleClear();  // Clear form fields after submission
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Failed to add book. Please try again.');
    } finally {
      setLoading(false);  // Reset loading state
    }
  };

  return (
    <div className="addbook-container">
      <div className="addbook-box">
        <Header isLoginPage={true} /> 

        <h2>Add Book</h2>

        <form onSubmit={handleSubmit} className="addbook-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={book.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              value={book.author}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={book.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="publicationDate">Publication Date</label>
            <input
              type="date"
              id="publicationDate"
              name="publicationDate"
              value={book.publicationDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="coverImage">Cover Image URL (Optional)</label>
            <input
              type="url"
              id="coverImage"
              name="coverImage"
              value={book.coverImage}
              onChange={handleChange}
            />
          </div>

          <div className="buttons-container">
            <button type="button" className="clear-btn" onClick={handleClear}>Clear</button>
            <button type="submit" className="add-btn" disabled={loading}>
              {loading ? 'Adding...' : 'Add Book'}
            </button>
          </div>
        </form>

        <div className="footer">
          <Link to="/adminhome" className="back-btn">Back to Admin Home</Link>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Book Added Successfully!</h3>
            <button onClick={() => setShowModal(false)} className="close-modal-btn">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddBookPage;
