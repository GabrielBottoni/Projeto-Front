import React, { useState } from 'react';
import "./admin.css";

const Admin = ({onAddProduct}) => {

  const [product, setProduct] = useState({
    nome:"",
    preco:"",
    imagem:"",
    descricao:"",
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!product.nome || !product.preco || !product.imagem) {
      alert("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    onAddProduct({ ...product, id: Date.now(), preco: parseFloat(product.preco)});
    setProduct({ nome:"", preco:"", imagem:"", descricao:""});
  };

  return (
    <div className="product-form-container">
      <h3>Adicionar Novo Produto</h3>
      <form onSubmit={handleSubmit} className="product-form">
        <label>Nome do Produto:</label>
        <input type="text" name="nome" value={product.nome} onChange={handleChange} required />

        <label>Preço (R$):</label>
        <input type="number" name="preco" value={product.preco} onChange={handleChange} step="0.01" required />

        <label>Imagem (URL):</label>
        <input type="text" name="imagem" value={product.imagem} onChange={handleChange} required />

        <label>Descrição:</label>
        <textarea name="descricao" value={product.descricao} onChange={handleChange} />

        <button type="submit">Adicionar Produto</button>
      </form>
    </div>
  )
}

export default Admin;
