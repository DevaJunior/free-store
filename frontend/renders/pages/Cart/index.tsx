import React from 'react';
import './styles.css';
import { useCart } from '../../../contexts/CartContext';

const Cart: React.FC = () => {
    const { cartItems, removeFromCart, updateQuantity } = useCart();

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const shippingCost = 18.00; // Valor fixo para o frete, como no exemplo
    const total = subtotal + shippingCost;

    return (
        <div className="cart-page-container">
            {cartItems.length === 0 ? (
                <div className="empty-cart">
                    <h1>Seu carrinho está vazio.</h1>
                    <a href="/shop">Continuar comprando</a>
                </div>
            ) : (
                <>
                    {/* Coluna da Esquerda: Itens do Carrinho */}
                    <div className="cart-items-column">
                        <div className="cart-header">
                            <span className="header-select">SELECT ALL</span>
                            <span className="header-quantity">QUANTITY</span>
                            <span className="header-total">TOTAL</span>
                        </div>

                        <div className="cart-items-list">
                            {cartItems.map(item => (
                                <div key={item.id} className="cart-item-row">
                                    <div className="item-product-details">
                                        <input type="checkbox" className="item-checkbox" />
                                        <img src={item.thumbnail} alt={item.title} className="item-image" />
                                        <div className="item-info">
                                            <h3 className="item-title">{item.title}</h3>
                                            <p className="item-specs">Color: Blue / Size: S</p> {/* Specs Fictícias */}
                                        </div>
                                    </div>
                                    <div className="item-quantity-selector">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                    </div>
                                    <div className="item-total-price">
                                        <span>
                                            {(item.price * item.quantity).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                        </span>
                                        <button className="remove-item-btn" onClick={() => removeFromCart(item.id)}>
                                            &times;
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Coluna da Direita: Sumário do Pedido */}
                    <div className="cart-summary-column">
                        <div className="summary-box">
                            <h2>SUMMARY</h2>
                            <div className="promo-code">
                                <label htmlFor="promo">Do you have a promo code?</label>
                                <input type="text" id="promo" placeholder="Enter code" />
                            </div>
                            <div className="summary-details">
                                <div className="summary-line">
                                    <span>Subtotal</span>
                                    <span>{subtotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                                </div>
                                <div className="summary-line">
                                    <span>International Shipping</span>
                                    <span>{shippingCost.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                                </div>
                            </div>
                            <div className="summary-total">
                                <span>Total</span>
                                <span>{total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                            </div>
                            <button className="checkout-btn">CHECK OUT</button>
                            <button className="checkout-paypal-btn">Check out with PayPal</button>
                        </div>
                        <div className="extra-info">
                            <div className="free-shipping-info">
                                <h4>FREE SHIPPING</h4>
                                <p>YOUR ORDER QUALIFIES FOR FREE SHIPPING. Join US for free shipping on every order, every time.</p>
                            </div>
                            <div className="need-help-info">
                                <h4>NEED HELP?</h4>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;