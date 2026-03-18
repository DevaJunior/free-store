import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

interface ProductCardProps {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  tag?: string; // Prop opcional para a etiqueta (NEW, OFF, etc.)
}

const ProductCard: React.FC<ProductCardProps> = ({ id, title, thumbnail, price, tag }) => {
  // Preço antigo fictício para simular o desconto
  const oldPrice = (price * 1.2).toFixed(2); // 20% mais caro que o preço atual

  return (
    <div className="product-card">
      <Link to={`/product/${id}`}>
        {tag && <div className="product-tag">{tag}</div>}
        <div className="product-image-container">
          <img src={thumbnail} alt={title} className="product-image" />
        </div>
        <div className="product-info">
          <h3 className="product-title">{title}</h3>
          <p className="product-description">
            A statement piece with vibrant neon details and rebellious street art influences for a standout look.
          </p>
          <div className="product-price-section">
            <span className="current-price">
              {price.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' })}
            </span>
            {/* Preço riscado, usando o valor fictício */}
            <span className="old-price">
              {Number(oldPrice).toLocaleString('pt-BR', { style: 'currency', currency: 'USD' })}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;