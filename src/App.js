import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import UserHomePage from './components/UserHomePage';
import AdminHomePage from './components/AdminHomePage';
import BookListPage from './components/BookListPage';
import BookDetailsPage from './components/BookDetailsPage';
import AddBookPage from './components/AddBookPage';
import EditBookListPage from './components/EditBookListPage';
import EditBookPage from './components/EditBookPage';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/userhome" element={<UserHomePage />} />          
          {/* Admin routes */}
          <Route path="/adminhome" element={<ProtectedRoute element={<AdminHomePage />} />} />
          <Route path="/booklist" element={<BookListPage />} />
          <Route path="/bookdetails/:id" element={<BookDetailsPage />} />
          
          {/* Add book and edit routes */}
          <Route path="/addbook" element={<ProtectedRoute element={<AddBookPage />} />} />
          <Route path="/editbooklist" element={<ProtectedRoute element={<EditBookListPage />} />} />
          <Route path="/editbook/:id" element={<ProtectedRoute element={<EditBookPage />} />} />

          {/* Default route: Redirect to Login Page */}
          <Route path="/" element={<LoginPage />} />

          <Route path="/Header" element= {<Header />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
