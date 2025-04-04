import React, { useState } from 'react';
import { Container, Form, FormGroup, Label, Input, Button, Card, CardBody, CardTitle, Row, Col } from 'reactstrap';
import { Login } from "../../services/apiService"; 
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync } from '../redux/authSlice';


function LoginPage() {

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  console.log("Estado do Redux no LoginPage:", auth);


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(loginAsync({email, password}));
    if(loginAsync.fulfilled.match(resultAction)){
      navigate('/Admin');
    }else{
      console.log("Falha no login: ", resultAction.error);
    }
  };

  const errorMessage = auth.error && typeof auth.error === 'object' 
  ? auth.error.error || JSON.stringify(auth.error) 
  : auth.error;

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100">
        <Col md={6} className="d-flex flex-column justify-content-center">
          <h1 className="text-primary">Junte-se a Nós!</h1>
          <p className="text-muted">
            Crie um perfil para comprar deliciosos salgados ou cadastre-se como vendedor e comece a vender agora mesmo!
          </p>
        </Col>
        <Col md={6} className="d-flex justify-content-center">
          <Card className="p-4 shadow-lg" style={{ width: '350px' }}>
          {auth.error && <p style={{color: "red"}}>{errorMessage}</p>}
            <p className='justify-content-center text-center'>Efetue o Login com o E-mail: eve.holt@reqres.in </p>
            <CardBody>
              <CardTitle tag="h4" className="text-center mb-3">Login</CardTitle>
              <Form onSubmit={handleLogin}>
                <FormGroup>
                  <Label for="email">Email</Label>
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
                  <Label for="password">Senha</Label>
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
                <div className="text-center mt-3">
                  <span className="text-muted">Não tem uma conta?</span>
                  <Button color="link" className="p-0 ms-1">Criar Conta</Button>
                </div>
              </Form>
              {auth.status === 'loading' && <p>Carregando...</p>}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
