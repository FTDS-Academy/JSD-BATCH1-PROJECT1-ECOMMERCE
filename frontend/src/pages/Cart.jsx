import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Trash2, ArrowRight } from 'lucide-react';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
    const navigate = useNavigate();

    if (cart.length === 0) {
        return (
            <div className="empty-state">
                <ShoppingCart size={48} className="empty-state-icon" />
                <h2 className="empty-state-title">Your cart is empty</h2>
                <p className="empty-state-desc">Looks like you haven't added any items to your cart yet.</p>
                <Link to="/" className="btn btn-primary">Start Shopping</Link>
            </div>
        );
    }

    return (
        <div>
            <header className="page-header">
                <h1 className="page-title">Shopping Cart</h1>
            </header>

            <div className="cart-container">
                <div className="cart-items">
                    {cart.map((item) => (
                        <div key={item.product.id} className="cart-item">
                            <img src={item.product.imageUrl} alt={item.product.name} className="cart-item-img" />

                            <div className="cart-item-details">
                                <Link to={`/product/${item.product.id}`} className="cart-item-title">
                                    {item.product.name}
                                </Link>
                                <div className="cart-item-price">${item.product.price.toFixed(2)}</div>

                                <div className="cart-item-actions">
                                    <div className="quantity-controls">
                                        <button
                                            className="qty-btn"
                                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                        >-</button>
                                        <span style={{ padding: '0 0.5rem' }}>{item.quantity}</span>
                                        <button
                                            className="qty-btn"
                                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                            disabled={item.quantity >= item.product.stockQuantity}
                                        >+</button>
                                    </div>

                                    <button
                                        className="remove-btn"
                                        onClick={() => removeFromCart(item.product.id)}
                                    >
                                        <Trash2 size={16} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px' }} />
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="order-summary">
                    <h3 className="summary-title">Order Summary</h3>
                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                    <div className="summary-row summary-total">
                        <span>Total</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>

                    <button
                        className="btn btn-primary checkout-btn"
                        onClick={() => navigate('/checkout')}
                    >
                        Proceed to Checkout <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
