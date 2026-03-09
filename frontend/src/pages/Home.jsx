import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { PackageOpen } from 'lucide-react';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="loader-container">
                <span className="loader"></span>
            </div>
        );
    }

    return (
        <div>
            <header className="page-header">
                <h1 className="page-title">Featured Products</h1>
            </header>

            {products.length === 0 ? (
                <div className="empty-state">
                    <PackageOpen size={48} className="empty-state-icon" />
                    <h2 className="empty-state-title">No products found</h2>
                    <p className="empty-state-desc">Please check back later, we are restocking.</p>
                </div>
            ) : (
                <div className="product-grid">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
