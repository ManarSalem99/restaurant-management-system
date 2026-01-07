import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ordersAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await ordersAPI.getAll();
      setOrders(data);
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet. <Link to="/">Browse restaurants</Link> to place your first order!</p>
      ) : (
        <div style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                padding: '20px',
                border: '1px solid #ddd',
                borderRadius: '8px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
                <div>
                  <h3>Order #{order.id}</h3>
                  <p><strong>Restaurant:</strong> {order.restaurant?.name}</p>
                  <p><strong>Status:</strong> <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    backgroundColor: order.status === 'DELIVERED' ? '#28a745' : order.status === 'CANCELLED' ? '#dc3545' : '#ffc107',
                    color: 'white',
                  }}>{order.status}</span></p>
                  <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <h3 style={{ margin: 0, color: '#28a745' }}>${parseFloat(order.total).toFixed(2)}</h3>
                </div>
              </div>

              <div>
                <h4>Items:</h4>
                <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
                  {order.orderItems?.map((item, idx) => (
                    <li key={idx}>
                      {item.menuItem?.name || 'Unknown'} × {item.quantity} - ${parseFloat(item.price).toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
