import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import RestaurantList from './customer/RestaurantList';
import Restaurants from './admin/Restaurants';

export default function Home() {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>Welcome to Restaurant Management System</h1>
        <p>Please <Link to="/login">login</Link> or <Link to="/register">register</Link> to continue.</p>
      </div>
    );
  }

  // Show appropriate page based on role (no redirect)
  if (isAdmin) {
    return <Restaurants />;
  }

  return <RestaurantList />;
}
