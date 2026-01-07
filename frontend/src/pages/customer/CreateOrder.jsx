import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ordersAPI, restaurantsAPI } from '../../services/api';

export default function CreateOrder() {
  const navigate = useNavigate();
  const location = useLocation();
  const { restaurantId, cart } = location.state || {};

  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!restaurantId || !cart || cart.length === 0) {
      navigate('/');
      return;
    }
    loadRestaurant();
  }, []);

  const loadRestaurant = async () => {
    try {
      const data = await restaurantsAPI.getById(restaurantId);
      setRestaurant(data);
    } catch (error) {
      console.error('Failed to load restaurant:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        restaurantId,
        items: cart.map((item) => ({
          menuItemId: item.id,
          quantity: item.quantity,
        })),
      };

      const order = await ordersAPI.create(orderData);
      alert('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      console.error('Failed to create order:', error);
      alert(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  const getTotal = () => {
    return cart?.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0) || 0;
  };

  if (!restaurant || !cart) return null;

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px' }}>
      <h2>Place Order</h2>

      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3>{restaurant.name}</h3>
        <p><strong>Address:</strong> {restaurant.address}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Order Items</h3>
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px' }}>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                padding: '10px',
                borderBottom: '1px solid #eee',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <strong>{item.name}</strong>
                <div style={{ color: '#666' }}>
                  ${parseFloat(item.price).toFixed(2)} × {item.quantity}
                </div>
              </div>
              <div>
                <strong>${(parseFloat(item.price) * item.quantity).toFixed(2)}</strong>
              </div>
            </div>
          ))}
          <div
            style={{
              marginTop: '15px',
              paddingTop: '15px',
              borderTop: '2px solid #ddd',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '1.2em',
            }}
          >
            <strong>Total:</strong>
            <strong>${getTotal().toFixed(2)}</strong>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          <button
            type="button"
            onClick={() => navigate(-1)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </form>
    </div>
  );
}
