import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { CheckCircle } from 'lucide-react';

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        customerName: '',
        customerEmail: '',
        customerAddress: ''
    });
    const [loading, setLoading] = useState(false);
    const [orderComplete, setOrderComplete] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (cart.length === 0) return;

        setLoading(true);
        setError(null);

        try {
            const orderRequest = {
                ...formData,
                items: cart.map(item => ({
                    productId: item.product.id,
                    quantity: item.quantity
                }))
            };

            const response = await axios.post('http://localhost:8080/api/orders', orderRequest);
            setOrderComplete(response.data);
            clearCart();
        } catch (err) {
            console.error('Checkout error:', err);
            setError(err.response?.data || 'An error occurred during checkout. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (orderComplete) {
        return (
            <div className="empty-state">
                <CheckCircle size={64} color="var(--secondary)" className="empty-state-icon" style={{ color: 'var(--secondary)' }} />
                <h2 className="empty-state-title">Order Confirmed!</h2>
                <p className="empty-state-desc">Thank you for your purchase. Order #{orderComplete.id} has been placed successfully.</p>
                <button className="btn btn-primary" onClick={() => navigate('/')}>Continue Shopping</button>
            </div>
        );
    }

    if (cart.length === 0 && !orderComplete) {
        return (
            <div className="empty-state">
                <h2 className="empty-state-title">Your cart is empty</h2>
                <button className="btn btn-secondary" onClick={() => navigate('/')}>Return Home</button>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <div className="order-summary" style={{ position: 'static' }}>
                <h3 className="summary-title" style={{ borderBottom: 'none', marginBottom: '1rem' }}>Checkout Details</h3>

                {error && (
                    <div style={{ padding: '1rem', backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: 'var(--radius)', marginBottom: '1.5rem' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="customerName">Full Name</label>
                        <input
                            type="text"
                            id="customerName"
                            name="customerName"
                            className="form-input"
                            value={formData.customerName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="customerEmail">Email</label>
                        <input
                            type="email"
                            id="customerEmail"
                            name="customerEmail"
                            className="form-input"
                            value={formData.customerEmail}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="customerAddress">Shipping Address</label>
                        <textarea
                            id="customerAddress"
                            name="customerAddress"
                            className="form-input"
                            rows="3"
                            value={formData.customerAddress}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary checkout-btn"
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : `Pay $${cartTotal.toFixed(2)}`}
                    </button>
                </form>
            </div>

            <div className="order-summary">
                <h3 className="summary-title">Order Summary</h3>
                <div style={{ marginBottom: '1rem', maxHeight: '300px', overflowY: 'auto' }}>
                    {cart.map(item => (
                        <div key={item.product.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                            <span style={{ color: 'var(--text-light)' }}>
                                {item.quantity}x {item.product.name}
                            </span>
                            <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                </div>
                <div className="summary-row summary-total">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
