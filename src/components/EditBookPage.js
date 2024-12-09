import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditBookPage.css';
import Header from './Header';

function EditBookPage() {
  const { id } = useParams(); // Get the book id from the URL
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '',
    author: '',
    description: '',
    publicationDate: '',
    coverImage: ''
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // For showing success message modal
  const [modalMessage, setModalMessage] = useState('');

  // Fetch the book data when the component loads
  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:7000/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({
      ...book,
      [name]: value
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Get the JWT token from localStorage
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      alert('You need to log in first!');
      return;
    }

    try {
      // Send PUT request to update the book details
      await axios.put(`http://localhost:7000/books/${id}`, book, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Show modal with success message
      setModalMessage('Changes saved successfully!');
      setShowModal(true);

      // Redirect after a short delay
      setTimeout(() => navigate('/editbooklist'), 2000);
    } catch (error) {
      console.error('Error updating book:', error);
      alert('Failed to update book. Please try again.');
    }
  };

  const handleDelete = async () => {
    // Get the JWT token from localStorage
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      alert('You need to log in first!');
      return;
    }

    try {
      // Send DELETE request to remove the book
      await axios.delete(`http://localhost:7000/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Show modal with success message
      setModalMessage('Book deleted successfully!');
      setShowModal(true);

      // Redirect after a short delay
      setTimeout(() => navigate('/editbooklist'), 2000);
    } catch (error) {
      console.error('Error deleting book:', error);
      alert('Failed to delete book. Please try again.');
    }
  };

  return (
    <div className="editbook-container">
      <div className="editbook-box">
      <Header isLoginPage={true} /> 

        <h2>Edit Book</h2>

        {loading ? (
          <p>Loading book details...</p>
        ) : (
          <form onSubmit={handleSave} className="editbook-form">
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
              <label htmlFor="coverImage">Cover Image URL</label>
              <input
                type="url"
                id="coverImage"
                name="coverImage"
                value={book.coverImage}
                onChange={handleChange}
              />
              {book.coverImage && (
                <img src={book.coverImage} alt="Cover" className="cover-preview" />
              )}
            </div>

            <div className="buttons-container">
              <button type="submit" className="save-btn">
                Save Changes
              </button>
              <button type="button" className="delete-btn" onClick={handleDelete}>
                Delete Book
              </button>
            </div>
          </form>
        )}

        <div className="footer">
          <button onClick={() => navigate('/editbooklist')} className="back-btn">
            Back to Book List
          </button>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>{modalMessage}</h3>
            <button onClick={() => setShowModal(false)} className="close-modal-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditBookPage;
