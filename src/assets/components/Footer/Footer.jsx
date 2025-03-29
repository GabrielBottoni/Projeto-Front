import React from 'react';
import { Container } from 'reactstrap';

function Footer() {
  return (
    <footer className="bg-dark text-light text-center py-3">
      <Container>
        <p className="mb-0">© {new Date().getFullYear()} Meu Projeto. Todos os direitos reservados.</p>
      </Container>
    </footer>
  );
}

export default Footer;
