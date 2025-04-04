import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Container,
} from 'reactstrap';
import { FaPizzaSlice, FaUtensils } from 'react-icons/fa';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="dark" dark expand="lg" className="p-4"> 
    <Container>
        <NavbarBrand href="/"><FaUtensils size={40}/> <span className='fs-3 fw-bolder'>Mestre do Sabor </span></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
        </Collapse>
        </Container>
    </Navbar>
  );
}

export default Header;
