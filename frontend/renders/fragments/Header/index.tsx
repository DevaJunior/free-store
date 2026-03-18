import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import { useCart } from '../../../contexts/CartContext';

const Header: React.FC = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          FreeStore
        </Link>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/shop">Loja</Link>
          <Link to="/cart">Carrinho ({totalItems})</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;