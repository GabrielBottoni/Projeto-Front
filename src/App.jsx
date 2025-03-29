import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from './assets/components/Footer/Footer'
import Header from './assets/components/Header/Header'
import Login from './assets/components/Login/Login'
import { CartProvider } from './assets/Hooks/CartContext';

//

import Users from './assets/components/Users/Users'
import Store from './assets/components/Content/Store';


function App() {
  return (
    <>
    <CartProvider>


      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="/carrinho" element={<Store />} />
        </Routes>
      </Router>
      <Footer />

      </CartProvider>
    </>
  )
}

export default App
