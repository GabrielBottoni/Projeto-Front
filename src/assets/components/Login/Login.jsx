import React, { useState, useEffect } from 'react';
import {
  Container, Form, FormGroup, Label, Input, Button,
  Card, CardBody, CardTitle, Row, Col, Alert
} from 'reactstrap';
import { FaCheckCircle, FaExclamationCircle, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync } from '../redux/authSlice';
import './login.css';

function LoginPage() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorVisible, setErrorVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(loginAsync({ email, password }));

    if (loginAsync.fulfilled.match(resultAction)) {
      setSuccessVisible(true);
      setTimeout(() => {
        const { role } = resultAction.payload;
        role === 'admin' ? navigate('/Admin') : navigate('/carrinho');
      }, 2000);
    } else {
      setErrorVisible(true);
    }
  };

  const errorMessage = auth.error && typeof auth.error === 'object'
    ? auth.error.error || JSON.stringify(auth.error)
    : auth.error;

  useEffect(() => {
    if (auth.error) {
      setErrorVisible(true);
      const timer = setTimeout(() => setErrorVisible(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [auth.error]);

  return (
    <Container
      fluid
      className="container-login min-vh-100 d-flex align-items-center justify-content-center"
    >
      <Row className="w-100 px-3" style={{ maxWidth: '1200px' }}>
        <Col
          xs="12"
          md="6"
          className="mb-4 mb-md-0 d-flex flex-column justify-content-center text-center text-md-start login-text"
        >
          <h1 className="text-primary fw-bold">Junte-se a Nós!</h1>
          <p className="text-muted fs-5">
            Crie um perfil para comprar deliciosos salgados<br />
            ou cadastre-se como vendedor e comece a vender agora mesmo!
          </p>
          <br/>
          <br/>
          <p className="fonte-dados">E-mail Cliente: cliente1@salgados.com | Senha: 123456</p>
          <p className="fonte-dados">E-mail Admin: admin@salgados.com      | Senha: 123456</p>
        </Col>

        <Col xs="12" md="6" className="d-flex justify-content-center login-form">
          <Card
            className="w-100"
            style={{
              maxWidth: '400px',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
              border: 'none'
            }}
          >
            <CardBody>
              <CardTitle tag="h4" className="text-center mt-3 d-flex justify-content-center align-items-center gap-2">
                <FaUser /> Login
              </CardTitle>

              <Alert
                color="danger"
                isOpen={errorVisible}
                fade
                className="d-flex align-items-center gap-2"
              >
                <FaExclamationCircle size={18} />
                {errorMessage}
              </Alert>

              <Alert
                color="success"
                isOpen={successVisible}
                fade
                className="d-flex align-items-center gap-2"
              >
                <FaCheckCircle size={18} />
                Login realizado com sucesso! Redirecionando...
              </Alert>

              <Form onSubmit={handleLogin}>
                <FormGroup>
                  <Label for="email" className="d-flex align-items-center gap-2">
                    <FaEnvelope /> Email
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Digite seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password" className="d-flex align-items-center gap-2">
                    <FaLock /> Senha
                  </Label>
                  <Input
                    type="password"
                    id="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </FormGroup>
                <Button type="submit" color="primary" block>Entrar</Button>

                //<div className="text-center mt-3">
                //  <span className="text-muted">Não tem uma conta?</span>
                //  <Button color="link" className="p-0 ms-1">Criar Conta</Button>
                //</div>

                {auth.status === 'loading' && <p className="text-center mt-3">Carregando...</p>}
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
