import React, { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  Container,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { FaUtensils, FaSignOutAlt, FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { token, role } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const goToCarrinho = () => {
    navigate('/carrinho');
  };

  const isAdminPage = location.pathname === '/admin';
  const isCarrinhoPage = location.pathname === '/carrinho';

  return (
    <Navbar color="dark" dark expand="lg" className="p-4">
      <Container className="d-flex justify-content-between align-items-center">
        <NavbarBrand href="/">
          <FaUtensils size={40} />{' '}
          <span className="fs-3 fw-bolder">Mestre do Sabor</span>
        </NavbarBrand>

        {token && role === 'admin' && isAdminPage && (
          <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle caret color="light">
              Opções
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem onClick={goToCarrinho}>
                <FaShoppingCart className="me-2" />
                Carrinho
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={handleLogout}>
                <FaSignOutAlt className="me-2" />
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}

        {token && (!isAdminPage || isCarrinhoPage) && (
          <Button color="danger" onClick={handleLogout}>
            <FaSignOutAlt className="me-2" />
            Logout
          </Button>
        )}
      </Container>
    </Navbar>
  );
}

export default Header;
