import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { restaurantsAPI } from '../../services/api';

export default function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRestaurants();
  }, []);

  const loadRestaurants = async () => {
    try {
      const data = await restaurantsAPI.getAll();
      setRestaurants(data);
    } catch (error) {
      console.error('Failed to load restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Restaurants</h2>
      {restaurants.length === 0 ? (
        <div style={{ 
          padding: '40px', 
          textAlign: 'center', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px',
          marginTop: '20px',
          border: '1px solid #dee2e6'
        }}>
          <h3 style={{ color: '#6c757d', marginBottom: '15px' }}>No restaurants available</h3>
          <p style={{ color: '#6c757d', marginBottom: '10px' }}>
            Restaurants need to be created by an admin user first.
          </p>
          <p style={{ color: '#6c757d', fontSize: '0.9em' }}>
            If you're an admin, <a href="/admin/restaurants" style={{ color: '#007bff' }}>click here to create restaurants</a>.
          </p>
          <p style={{ color: '#6c757d', fontSize: '0.9em', marginTop: '10px' }}>
            If you don't have an admin account, register a new account and select "Admin" as the role.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
          {restaurants.map((restaurant) => (
          <Link
            key={restaurant.id}
            to={`/restaurant/${restaurant.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div
              style={{
                padding: '20px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'box-shadow 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
            >
              <h3>{restaurant.name}</h3>
              <p><strong>Address:</strong> {restaurant.address}</p>
              {restaurant.phone && <p><strong>Phone:</strong> {restaurant.phone}</p>}
              {restaurant.description && <p style={{ marginTop: '10px' }}>{restaurant.description}</p>}
              <p style={{ marginTop: '10px', color: '#007bff' }}>
                View Menu →
              </p>
            </div>
          </Link>
        ))}
        </div>
      )}
    </div>
  );
}
