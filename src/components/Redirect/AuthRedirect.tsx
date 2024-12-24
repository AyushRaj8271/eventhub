import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthRedirect: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const currentPath = window.location.pathname;

    if (token) {
      // If token exists and user is on /login or /signup, redirect to /events
      if (currentPath === '/login' || currentPath === '/signup') {
        navigate('/events');
      }
    } else {
      // If token does not exist and user tries to access protected routes, redirect to /login
      const protectedRoutes = ['/events', '/add-event', '/analytics'];
      const isEventDetailRoute = /^\/event\/\d+$/.test(currentPath);

      if (protectedRoutes.includes(currentPath) || isEventDetailRoute) {
        navigate('/login');
      }
    }
  }, [navigate]);

  return null;
};

export default AuthRedirect;
