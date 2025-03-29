import React, { useState } from 'react';
import { Container, Form, FormGroup, Label, Input, Button, Card, CardBody, CardTitle } from 'reactstrap';
import { Login } from "../../services/apiService";

function Content() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] =useState(null);

  const handleLogin = async () => {

    try {
      const data = await Login({email, password});
      setResponse(data);
    } catch (error) {
      console.error(error.message);
    } 
  }

  return (
    
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow-lg" style={{ width: '350px' }}>
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
            <Button onClick={handleLogin} color="primary" block>Entrar</Button>
            <div className="text-center mt-3">
              <span className="text-muted">Não tem uma conta?</span>
              <Button color="link" className="p-0 ms-1">Criar Conta</Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
}

export default Content;
