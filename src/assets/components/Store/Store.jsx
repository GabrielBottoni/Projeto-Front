import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../../Hooks/CartContext";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaPlus,
  FaTrashAlt,
  FaMinus,
  FaPlusCircle,
} from "react-icons/fa";
import { Alert } from "reactstrap";
import "./Store.css";

const Product = ({ item, onAdd }) => (
  <div className="product-card">
    <img src={item.imagem} alt={item.nome} className="product-image" />
    <h4>{item.nome}</h4>
    <p className="product-price">R$ {item.preco.toFixed(2)}</p>
    <button onClick={() => onAdd(item)} className="add-to-cart">
      <FaPlus /> Adicionar
    </button>
  </div>
);

const Cart = ({ role, navigate }) => {
  const { cart, dispatch } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    dispatch({ type: "UPDATE_QUANTITY", id, quantity });
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const handlePurchase = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      clearCart();
    }, 3000);
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.preco * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h3>
        <FaShoppingCart /> Carrinho
      </h3>

      {showSuccess && (
        <Alert color="success" className="d-flex align-items-center gap-2">
          <FaShoppingCart />
          Compra realizada com sucesso!
        </Alert>
      )}

      {cart.length === 0 ? (
        <p>Seu carrinho está vazio</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <h4>
                {item.nome} ({item.quantity}x)
              </h4>
              <p className="cart-price">
                Subtotal: R$ {(item.preco * item.quantity).toFixed(2)}
              </p>
              <div className="cart-controls">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                  <FaMinus />
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  <FaPlus />
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="remove-button"
              >
                <FaTrashAlt /> Remover
              </button>
            </div>
          ))}

          <h4>Total: R$ {totalPrice.toFixed(2)}</h4>

          <div className="d-flex gap-2 mb-3">
            <button onClick={clearCart} className="clear-cart-button">
              <FaTrashAlt /> Limpar Carrinho
            </button>
            <button onClick={handlePurchase} className="buy-button">
              <FaShoppingCart /> Comprar
            </button>
          </div>
        </>
      )}

      {role === "admin" && (
        <button className="admin-button" onClick={() => navigate("/admin")}>
          <FaPlusCircle /> Cadastrar Produto
        </button>
      )}
    </div>
  );
};

const Store = () => {
  const [products, setProducts] = useState([]);
  const { dispatch } = useCart();
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://api.npoint.io/202f0b3a7776777187fe")
      .then((response) => setProducts(response.data))
      .catch((error) =>
        console.error("Erro ao buscar os produtos: ", error)
      );
  }, []);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", product });
  };

  return (
    <div className="store-container">
      <div className="products-container">
        <div className="product-list">
          {products.map((product) => (
            <Product key={product.id} item={product} onAdd={addToCart} />
          ))}
        </div>
      </div>
      <Cart role={role} navigate={navigate} />
    </div>
  );
};

export default Store;
