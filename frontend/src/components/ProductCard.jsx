import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart(product);
    };

    return (
        <Link to={`/product/${product.id}`} className="product-card">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <div className="product-info">
                <h3 className="product-title">{product.name}</h3>
                <p className="product-desc">{product.description}</p>
                <div className="product-footer">
                    <span className="product-price">${product.price.toFixed(2)}</span>
                    <button
                        className="btn btn-primary"
                        onClick={handleAddToCart}
                        disabled={product.stockQuantity === 0}
                    >
                        <ShoppingCart size={18} />
                        {product.stockQuantity === 0 ? 'Out of Stock' : 'Add'}
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
