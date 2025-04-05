import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from './assets/components/Footer/Footer'
import Header from './assets/components/Header/Header'
import Login from './assets/components/Login/Login'
import { CartProvider } from './assets/Hooks/CartContext';

import Store from './assets/components/Store/Store'
import Admin from './assets/components/Admin/Admin';
import PrivateRoute from './assets/components/PrivateRoute';

import { Provider } from 'react-redux';
import { store } from './assets/components/redux/store';

function App() {
  return (
    <Provider store={store}>
      <CartProvider>
        <Router>
          <Header />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Login />} />

              <Route
                path="/carrinho"
                element={
                  <PrivateRoute>
                    <Store />
                  </PrivateRoute>
                }
              />

              <Route
                path="/admin"
                element={
                  <PrivateRoute requiredRole="admin">
                    <Admin />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </Router>
      </CartProvider>
    </Provider>
  )
}

export default App
