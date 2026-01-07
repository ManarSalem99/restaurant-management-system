import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Layout from './components/Layout';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

// Admin pages
import Restaurants from './pages/admin/Restaurants';
import MenuItems from './pages/admin/MenuItems';

// Customer pages
import RestaurantMenu from './pages/customer/RestaurantMenu';
import CreateOrder from './pages/customer/CreateOrder';
import Orders from './pages/customer/Orders';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/restaurants"
            element={
              <Layout>
                <ProtectedRoute requireAdmin={true}>
                  <Restaurants />
                </ProtectedRoute>
              </Layout>
            }
          />
          <Route
            path="/admin/menu-items"
            element={
              <Layout>
                <ProtectedRoute requireAdmin={true}>
                  <MenuItems />
                </ProtectedRoute>
              </Layout>
            }
          />

          {/* Customer Routes */}
          <Route
            path="/restaurant/:id"
            element={
              <Layout>
                <ProtectedRoute>
                  <RestaurantMenu />
                </ProtectedRoute>
              </Layout>
            }
          />
          <Route
            path="/order/create"
            element={
              <Layout>
                <ProtectedRoute>
                  <CreateOrder />
                </ProtectedRoute>
              </Layout>
            }
          />
          <Route
            path="/orders"
            element={
              <Layout>
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              </Layout>
            }
          />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
