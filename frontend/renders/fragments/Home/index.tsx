import ProductCard from '../../components/Cards/ProductCard';
import './styles.css';
import React, { useEffect, useState } from 'react';

interface Product {
    id: number;
    title: string;
    thumbnail: string;
    price: number;
}

const Home: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products?limit=8');

                if (!response.ok) {
                    throw new Error('Falha ao buscar dados da API');
                }

                const data = await response.json();

                if (data.products) {
                    setProducts(data.products);
                } else {
                    throw new Error('Formato de dados inesperado da API');
                }

            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
                setError("Não foi possível carregar os produtos. Tente novamente mais tarde.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <p>Carregando produtos...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div className="home-page">

            {/* <section className="testimonials-images-section">
                <div className="testimonials-intro">
                    <span className="testimonials-tag">Testimonials</span>
                    <h2>Trusted by creatives and leaders</h2>
                    <p>from various industries</p>
                </div>
            </section> */}

            <section className="hero-section">
                <div className="hero-content">
                    <h1>FIND YOUR STRENGTH</h1>
                    <h2>INSIDE AND OUT.</h2>
                </div>
            </section>

            <section className="new-drops-section">
                <div className="section-header">
                    <h2>NEW DROPS</h2>
                    <p>Stand out with our latest collection—bold designs, premium fabrics, and reflective details that keep you in the spotlight, day in and day out.</p>
                </div>

                <div className="products-grid">
                    {products.map(product => (
                        <ProductCard
                            key={product.id}
                            id={String(product.id)}
                            title={product.title}
                            thumbnail={product.thumbnail}
                            price={product.price}
                            tag="NEW"
                        />
                    ))}
                </div>
            </section>

            {/* Testimonials Images Section (Image 2) */}
            <section className="testimonials-images-section">
                <div className="testimonials-grid">
                    <div className="grid-item tall"><img src="https://images.unsplash.com/photo-1596526113144-884849312560?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG9mZmljZSUyMGxhcmdlfGVufDB8fDB8fHww" alt="Office 1" /></div>
                    <div className="grid-item"><img src="https://images.unsplash.com/photo-1599305445657-cf43a67d4d7a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG9mZmljZSUyMGxhcmdlfGVufDB8fDB8fHww" alt="Office 2" /></div>
                    <div className="grid-item small-tall"><img src="https://images.unsplash.com/photo-1549923746-c50e7f7815d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2ZmaWNlJTIwbGFyZ2V8ZW58MHx8MHx8fDA%3D" alt="Office 3" /></div>
                    <div className="grid-item tall"><img src="https://images.unsplash.com/photo-1596526113144-884849312560?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG9mZmljZSUyMGxhcmdlfGVufDB8fDB8fHww" alt="Office 4" /></div>
                    <div className="grid-item"><img src="https://images.unsplash.com/photo-1549923746-c50e7f7815d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2ZmaWNlJTIwbGFyZ2V8ZW58MHx8MHx8fDA%3D" alt="Office 5" /></div>
                    <div className="grid-item small-tall"><img src="https://images.unsplash.com/photo-1549923746-c50e7f7815d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2ZmaWNlJTIwbGFyZ2V8ZW58MHx8MHx8fDA%3D" alt="Office 6" /></div>
                </div>
                <div className="testimonials-intro">
                    <span className="testimonials-tag">Testimonials</span>
                    <h2>Trusted by creatives and leaders</h2>
                    <p>from various industries</p>
                </div>
            </section>

            {/* Actual Testimonials Section (Image 3) */}
            <section className="actual-testimonials-section">
                <div className="testimonial-card">
                    <div className="stars">⭐⭐⭐⭐⭐</div>
                    <p>"WorkNook makes finding a coworking space so easy! I can book a desk in minutes and get straight to work. Highly recommend!"</p>
                    <div className="author-info">
                        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Joao M." className="author-avatar" />
                        <div>
                            <p className="author-name">Joao M.</p>
                            <p className="author-role">Startup Founder</p>
                        </div>
                    </div>
                </div>
                <div className="testimonial-card">
                    <div className="stars">⭐⭐⭐⭐⭐</div>
                    <p>"Our team needed a flexible meeting space, and WorkNook delivered. The process was smooth, and the space was exactly what we needed!"</p>
                    <div className="author-info">
                        <img src="https://randomuser.me/api/portraits/men/44.jpg" alt="Bruno K." className="author-avatar" />
                        <div>
                            <p className="author-name">Bruno K.</p>
                            <p className="author-role">UX Designer</p>
                        </div>
                    </div>
                </div>
                <div className="testimonial-card">
                    <div className="stars">⭐⭐⭐⭐⭐</div>
                    <p>"I love the variety of spaces available! Whether I need a quiet spot or a collaborative space, WorkNook always has the perfect option."</p>
                    <div className="author-info">
                        <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Lais A." className="author-avatar" />
                        <div>
                            <p className="author-name">Lais A.</p>
                            <p className="author-role">Digital Marketer</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;