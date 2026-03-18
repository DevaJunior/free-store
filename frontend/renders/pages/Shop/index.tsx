import React, { useEffect, useState } from 'react';
import './styles.css';
import ProductCard from '../../components/Cards/ProductCard';

interface Product {
    id: number;
    title: string;
    thumbnail: string;
    price: number;
}

const Shop: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchProducts = async (query: string) => {
        setLoading(true);
        try {
            // MUDANÇA 1: Usando o endpoint de busca ou o geral se a busca estiver vazia
            const url = query 
                ? `https://dummyjson.com/products/search?q=${query}`
                : 'https://dummyjson.com/products';

            const response = await fetch(url);
            if (!response.ok) throw new Error('Falha na busca dos produtos');
            
            const data = await response.json();

            // MUDANÇA 2: Acessando o array de produtos de 'data.products'
            setProducts(data.products);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        } finally {
            setLoading(false);
        }
    };

    // Efeito para carregar produtos iniciais
    useEffect(() => {
        fetchProducts('');
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchProducts(searchTerm);
    };

    return (
        <div className="shop-page">
            <h1>Nossa Loja</h1>
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar produtos..."
                />
                <button type="submit">Buscar</button>
            </form>
            {loading ? (
                <p>Carregando...</p>
            ) : (
                <div className="products-grid">
                    {products.map(product => (
                        <ProductCard
                            key={product.id}
                            id={String(product.id)}
                            title={product.title}
                            thumbnail={product.thumbnail}
                            price={product.price}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Shop;