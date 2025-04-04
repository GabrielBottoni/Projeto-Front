import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from './assets/components/Footer/Footer'
import Header from './assets/components/Header/Header'
import Login from './assets/components/Login/Login'
import { CartProvider } from './assets/Hooks/CartContext';

//

import Store from './assets/components/Store/Store'
import Admin from './assets/components/Admin/Admin';
//Componentes de autenticação

import PrivateRoute from './assets/components/PrivateRoute'; // rota protegida
import { Provider } from 'react-redux';
import { store } from './assets/components/redux/store';

function App() {
  return (
    <>
    <Provider store={store}>
      <CartProvider>

        <Header />
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/carrinho" element={<Store />} />

           <Route path='/Admin' element={<PrivateRoute>
              <Admin />
            </PrivateRoute>
            }
            />
          </Routes>
        </Router>
        <Footer />

      </CartProvider>
      </Provider>
    </>
  )
}

export default App
