import { Navigate, useNavigate } from 'react-router-dom';

const handleLogout = () => {
  // Remove user information from localStorage
  localStorage.removeItem('userInfo');

  // Redirect to the login page
  Navigate('/login');
};