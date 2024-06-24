import React, { useEffect, useState } from 'react';
import Header from './Header';
import { Link } from "react-router-dom";

interface CartItem {
    id: number;
    user: {
        id: number;
        email: string;
    };
    product: {
        id: number;
        name: string;
        price: number;
    };
    quantity: number;
};

const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                alert('Please login to view cart');
                return;
            }

            try {
                const response = await fetch(process.env.REACT_APP_API_URL + '/cart', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await response.json();
                setCartItems(data.data);
            } catch (error) {
                const err = error as Error;
                alert('Failed to fetch cart items ' + err.message);
            }
        };

        fetchCartItems();
    }, []);

    return (
        <div className="w-full">
            <Header />

            <div className="container mx-auto p-4 w-full">
                <h1 className="font-bold mb-4 text-xl">Products in cart</h1>
                <ul>
                    <li className="border-b border-neutral-800 flex gap-4 items-center justify-between p-2">
                        <span className="grow">Product name</span>
                        <span className="min-w-20 text-right">Unit price</span>
                        <span className="min-w-20 text-right">Quantity</span>
                        <span className="min-w-20 text-right">Total</span>
                    </li>
                    {cartItems.map((item: any) => (
                    <li className="border-b border-neutral-800 flex gap-4 items-center justify-between p-2" key={item.id}>
                        <span className="grow">{item.Product.name}</span>
                        <span className="min-w-20 text-right">${parseFloat(item.Product.price).toFixed(2)}</span>
                        <span className="min-w-20 text-right">{item.quantity}</span>
                        <span className="min-w-20 text-right">${(parseFloat(item.Product.price) * item.quantity).toFixed(2)}</span>
                    </li>
                    ))}
                    <li className="border-b border-neutral-800 flex gap-4 items-center justify-between p-2">
                        <span className="grow">&nbsp;</span>
                        <span className="font-bold min-w-20 text-right"></span>
                        <span className="font-bold min-w-20 text-right">Total</span>
                        <span className="font-bold min-w-20 text-right">${
                            cartItems.reduce((total, item: any) => {
                                const productPrice = item.Product?.price ?? 0;
                                return total + (item.quantity * productPrice);
                            }, 0).toFixed(2)
                        }</span>
                    </li>
                </ul>

                <div className="flex items-center justify-end mt-4">
                    <Link to='/checkout' className="border border-neutral-700 block px-2 py-1 rounded w-auto">Go to Checkout</Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;