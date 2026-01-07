import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout({ children }) {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <nav
        style={{
          padding: '15px 20px',
          backgroundColor: '#343a40',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2em' }}>
            🍽️ Restaurant System
          </Link>
          {user && (
            <>
              {isAdmin ? (
                <>
                  <Link 
                    to="/admin/menu-items" 
                    style={{ color: 'white', textDecoration: 'none' }}
                  >
                    Menu Items
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/orders" style={{ color: 'white', textDecoration: 'none' }}>
                    My Orders
                  </Link>
                </>
              )}
            </>
          )}
        </div>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          {user ? (
            <>
              <span>Welcome, {user.name}</span>
              <span style={{ color: '#adb5bd' }}>({user.role})</span>
              <button
                onClick={handleLogout}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
                Login
              </Link>
              <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}
