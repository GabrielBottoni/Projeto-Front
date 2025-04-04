import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../../Hooks/CartContext";
import "./Store.css";

const Product = ({ item, onAdd }) => (
  <div className="product-card">
    <img src={item.imagem} alt={item.nome} className="product-image" />
    <h4>{item.nome}</h4>
    <p className="product-price">R$ {item.preco.toFixed(2)}</p>
    <button onClick={() => onAdd(item)} className="add-to-cart">Adicionar</button>
  </div>
);

const Cart = () => {
  const { cart, dispatch } = useCart();

  const updateQuantity = (id, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", id, quantity });
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const totalPrice = cart.reduce((total, item) => total + item.preco * item.quantity, 0);

  return (
    <div className="cart-container">
      <h3>Carrinho</h3>
      {cart.length === 0 ? (
        <p>Seu carrinho está vazio</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <h4>{item.nome} ({item.quantity}x)</h4>
              <p className="cart-price">Subtotal: R$ {(item.preco * item.quantity).toFixed(2)}</p>
              <div className="cart-controls">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="remove-button">Remover</button>
            </div>
          ))}
          <h4>Total: R$ {totalPrice.toFixed(2)}</h4>
          <button onClick={clearCart} className="clear-cart-button">Limpar Carrinho</button>
        </>
      )}
    </div>
  );
};

const Store = () => {
  const [products, setProducts] = useState([]);
  const { dispatch } = useCart();

  useEffect(() => {
    axios
      .get("https://api.npoint.io/8ce53684e826a95ac34c")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Erro ao buscar os produtos: ", error));
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
      <Cart />
    </div>
  );
};

export default Store;
