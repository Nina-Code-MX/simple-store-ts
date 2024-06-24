import React, { useEffect, useState } from 'react';
import Header from './Header';

interface Product {
    id: number;
    name: string;
    price: number;
}

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_API_URL + '/products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                const err = error as Error;
                alert('Failed to fetch products ' + err.message);
            }
        };

        fetchProducts();
    }, []);

    const addToCart = async (productId: number) => {
        const token = localStorage.getItem('token');

        if (!token) {
            alert('Please login to add products to cart');
            return;
        }

        try {
            const response = await fetch(process.env.REACT_APP_API_URL + '/cart/add', {
                method: 'POST',
                body: JSON.stringify({ productId, quantity: 1 }),
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            alert(`Product added to cart`);
        } catch (error) {
            const err = error as Error;
            alert('Failed to add product to cart ' + err.message);
        }
    };

    return (
        <div className="w-full">
            <Header />

            <div className="container mx-auto p-4 w-full">
                <h1 className="font-bold mb-4 text-xl">Products</h1>
                <ul>
                    {products.map((product: any) => (
                    <li className="border-b border-neutral-800 flex gap-4 items-center justify-between p-2" key={product.id}>
                        <span className="grow">{product.name}</span>
                        <span className="text-right min-w-20">${parseFloat(product.price).toFixed(2)}</span>
                        <button onClick={() => addToCart(product.id)}>Add to cart</button>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProductList;