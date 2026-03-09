import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { cartItemCount } = useCart();

    return (
        <nav className="navbar">
            <div className="nav-content">
                <Link to="/" className="logo">
                    <ShoppingBag size={28} color="var(--primary)" />
                    <span>E-Shop</span>
                </Link>
                <Link to="/cart" className="cart-link">
                    <ShoppingCart size={24} />
                    {cartItemCount > 0 && (
                        <span className="cart-badge">{cartItemCount}</span>
                    )}
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
