import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Layout from './components/Layout';
import { useEffect } from 'react';

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

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <div className="page-transition">
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
      </div>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
