import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { ShoppingCart, ArrowLeft } from 'lucide-react';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <div className="loader-container"><span className="loader"></span></div>;

    if (!product) return (
        <div className="empty-state">
            <h2 className="empty-state-title">Product not found</h2>
            <button className="btn btn-secondary" onClick={() => navigate('/')}>Return Home</button>
        </div>
    );

    const handleAddToCart = () => {
        addToCart(product, quantity);
        // Simple toast notification could be added here
    };

    return (
        <div>
            <button className="btn" style={{ marginBottom: '2rem', padding: '0.5rem 0' }} onClick={() => navigate(-1)}>
                <ArrowLeft size={20} /> Back
            </button>

            <div className="product-detail-container">
                <img src={product.imageUrl} alt={product.name} className="detail-image" />

                <div className="detail-info">
                    <h1 className="detail-title">{product.name}</h1>
                    <div className="detail-price">${product.price.toFixed(2)}</div>

                    <div className={`detail-stock ${product.stockQuantity > 10 ? 'in-stock' : 'low-stock'}`}>
                        {product.stockQuantity > 0
                            ? `${product.stockQuantity} in stock`
                            : 'Out of stock'}
                    </div>

                    <p className="detail-desc">{product.description}</p>

                    <div className="detail-actions">
                        <div className="quantity-controls" style={{ padding: '0.5rem', background: 'var(--border)' }}>
                            <button
                                className="qty-btn"
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            >-</button>
                            <span style={{ padding: '0 1rem', fontWeight: 'bold' }}>{quantity}</span>
                            <button
                                className="qty-btn"
                                onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                                disabled={quantity >= product.stockQuantity}
                            >+</button>
                        </div>

                        <button
                            className="btn btn-primary"
                            style={{ flex: 1 }}
                            onClick={handleAddToCart}
                            disabled={product.stockQuantity === 0}
                        >
                            <ShoppingCart size={20} />
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
