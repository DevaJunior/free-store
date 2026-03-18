import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css';
import { useCart } from '../../../contexts/CartContext';

// Interface atualizada para conter mais detalhes do produto
interface ProductDetails {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

// Dados fictícios para os seletores
const SIZES = ['40.5', '41', '42', '43', '43.5', '44', '44.5', '45', '46'];
const COLORS = ['White', 'Black', 'Gray']; // Vamos simular cores baseadas nas imagens

const Product: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const [product, setProduct] = useState<ProductDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    
    // Estados para interatividade da UI
    const [mainImage, setMainImage] = useState<string>('');
    const [selectedSize, setSelectedSize] = useState<string>('41');
    const [selectedColor, setSelectedColor] = useState<string>('White');

    useEffect(() => {
        const fetchProduct = async () => {
            if (!productId) return;
            try {
                const response = await fetch(`https://dummyjson.com/products/${productId}`);
                if (!response.ok) throw new Error('Produto não encontrado');
                const data = await response.json();
                setProduct(data);
                setMainImage(data.images[0]); // Define a primeira imagem como principal
            } catch (error) {
                console.error("Erro ao buscar detalhes do produto:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    if (loading) return <div className="loading-container"><p>Carregando produto...</p></div>;
    if (!product) return <div className="loading-container"><p>Produto não encontrado.</p></div>;

    const handleAddToCart = () => {
        addToCart({
            id: String(product.id),
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            quantity: 1,
        });
        alert('Produto adicionado ao carrinho!');
    };

    return (
        <div className="product-page-container">
            {/* Coluna da Esquerda: Galeria de Imagens */}
            <div className="product-gallery">
                <div className="main-image-wrapper">
                    <img src={mainImage} alt={product.title} className="main-image" />
                </div>
                <div className="thumbnail-list">
                    {product.images.slice(0, 5).map((img, index) => (
                        <div 
                            key={index} 
                            className={`thumbnail-item ${img === mainImage ? 'active' : ''}`}
                            onClick={() => setMainImage(img)}
                        >
                            <img src={img} alt={`Thumbnail ${index + 1}`} />
                        </div>
                    ))}
                    {product.images.length > 5 && (
                        <div className="thumbnail-item more">
                            +{product.images.length - 5}
                        </div>
                    )}
                </div>
            </div>

            {/* Coluna da Direita: Detalhes do Produto */}
            <div className="product-details">
                <div className="product-brand-info">
                    <span className="brand-logo">{product.brand}</span>
                    <span className="product-code">ID: {product.id}</span>
                </div>

                <h1 className="product-main-title">{product.title}</h1>
                
                <div className="product-reviews">
                    <span className="stars">{'⭐'.repeat(Math.round(product.rating))}</span>
                    <span className="review-count">{Math.floor(product.rating * 8)} reviews</span>
                </div>

                <p className="product-price">
                    {product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </p>

                <div className="selectors-container">
                    {/* Seletor de Cores */}
                    <div className="color-selector">
                        <p className="selector-label">Color: <span>{selectedColor}</span></p>
                        <div className="swatches">
                            {COLORS.map(color => (
                                <button 
                                    key={color} 
                                    className={`color-swatch ${selectedColor === color ? 'active' : ''}`}
                                    onClick={() => setSelectedColor(color)}
                                    style={{ 
                                        backgroundColor: color.toLowerCase(), 
                                        border: color === 'White' ? '1px solid #ccc' : 'none' 
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Seletor de Tamanhos */}
                    <div className="size-selector">
                        <div className="selector-label-group">
                            <p className="selector-label">Size: <span>EU Men</span></p>
                            <a href="#" className="size-guide">Size guide</a>
                        </div>
                        <div className="sizes">
                            {SIZES.map(size => (
                                <button 
                                    key={size}
                                    className={`size-box ${selectedSize === size ? 'active' : ''}`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="action-buttons">
                    <button className="add-to-cart-btn" onClick={handleAddToCart}>
                        <span>🛒</span> Add to cart
                    </button>
                    <button className="wishlist-btn">
                        <span>♡</span>
                    </button>
                </div>
                
                <p className="delivery-info">
                    🚚 Free delivery on orders over $300.0
                </p>
            </div>
        </div>
    );
};

export default Product;