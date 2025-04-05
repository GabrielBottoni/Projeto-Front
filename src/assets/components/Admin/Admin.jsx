import React, { useState, useEffect } from 'react';
import { getProductsFromAPI } from '../../services/productService';
import {
  Container, Row, Col, Form, FormGroup, Label, Input, Button, Card, CardImg, CardBody, CardTitle, CardText
} from 'reactstrap';
import { FaShoppingCart, FaBoxOpen, FaPlusCircle, FaTrashAlt } from 'react-icons/fa';
import './admin.css';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    nome: "",
    preco: "",
    imagem: "",
    descricao: "",
  });

  useEffect(() => {
    const loadInitialData = async () => {
      const localData = localStorage.getItem("products");
      if (localData) {
        setProducts(JSON.parse(localData));
      } else {
        const data = await getProductsFromAPI();
        setProducts(data);
        localStorage.setItem("products", JSON.stringify(data));
      }
    };
    loadInitialData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!product.nome || !product.preco || !product.imagem) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    const newProduct = {
      ...product,
      id: Date.now(),
      preco: parseFloat(product.preco),
    };

    const updatedList = [...products, newProduct];
    setProducts(updatedList);
    localStorage.setItem("products", JSON.stringify(updatedList));
    setProduct({ nome: "", preco: "", imagem: "", descricao: "" });
  };

  const handleDelete = (id) => {
    const updatedList = products.filter((p) => p.id !== id);
    setProducts(updatedList);
    localStorage.setItem("products", JSON.stringify(updatedList));
  };

  return (
    <Container fluid className="py-4 admin-container">
      <Row className="flex-column flex-md-row-reverse">
        <Col xs="12" md="4" className="mb-4">
          <h3 className="mb-4 d-flex align-items-center fw-bold">
            <FaBoxOpen className="me-2" />
            Adicionar Produto
          </h3>
          <Form onSubmit={handleSubmit} className="bg-white p-4 shadow-sm rounded-4 border">
            <FormGroup>
              <Label for="nome" className="fw-semibold">Nome do Produto</Label>
              <Input type="text" name="nome" id="nome" value={product.nome} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Label for="preco" className="fw-semibold">Preço (R$)</Label>
              <Input type="number" name="preco" id="preco" value={product.preco} onChange={handleChange} step="0.01" required />
            </FormGroup>
            <FormGroup>
              <Label for="imagem" className="fw-semibold">Imagem (URL)</Label>
              <Input type="text" name="imagem" id="imagem" value={product.imagem} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <Label for="descricao" className="fw-semibold">Descrição</Label>
              <Input type="textarea" name="descricao" id="descricao" value={product.descricao} onChange={handleChange} />
            </FormGroup>
            <Button color="success" block type="submit" className="mt-3 d-flex align-items-center justify-content-center">
              <FaPlusCircle className="me-2" />
              Adicionar Produto
            </Button>
          </Form>
        </Col>

        {/* Lista de Produtos */}
        <Col xs="12" md="8">
          <h3 className="mb-4 d-flex align-items-center fw-bold">
            <FaShoppingCart className="me-2" />
            Produtos Cadastrados
          </h3>
          <Row>
            {products.map((item) => (
              <Col xs={12} sm={6} lg={4} key={item.id} className="mb-4">
                <Card className="h-100 shadow border-0 rounded-4">
                  <CardImg top src={item.imagem} alt={item.nome} style={{ height: "200px", objectFit: "cover", borderTopLeftRadius: "0.75rem", borderTopRightRadius: "0.75rem" }} />
                  <CardBody className="d-flex flex-column justify-content-between">
                    <div>
                      <CardTitle tag="h5" className="fw-semibold">{item.nome}</CardTitle>
                      <CardText className="text-muted small">{item.descricao}</CardText>
                    </div>
                    <div>
                      <CardText className="fw-bold mb-2">R$ {item.preco.toFixed(2)}</CardText>
                      <Button color="danger" onClick={() => handleDelete(item.id)} block className="d-flex align-items-center justify-content-center">
                        <FaTrashAlt className="me-2" />
                        Excluir
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
