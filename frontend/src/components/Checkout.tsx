import React, { useState } from 'react';
import Header from './Header';

const Checkout: React.FC = () => {
    const [token, setToken] = useState('');

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();

        const authToken = localStorage.getItem('token');

        if (!authToken) {
            alert('Please login to checkout');
            return;
        }

        try {
            await fetch(process.env.REACT_APP_API_URL + '/checkout', {
                method: 'POST',
                body: JSON.stringify({ token }),
                headers: { Authorization: `Bearer ${authToken}` }
            });
            alert('Payment successful');
        } catch (error) {
            const err = error as Error;
            alert('Payment failed ' + err.message);
        }
    };

    return (
        <div className="w-full">
            <Header />

            <div className="container max-w-2xl mx-auto p-4 w-full">
                <form onSubmit={handleCheckout}>
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="w-full" htmlFor="email">Stripe token</label>
                            <input
                                className="border border-gray-300 p-2 rounded w-full"
                                onChange={e => setToken(e.target.value)}
                                placeholder='Add Stripe Token'
                                type='text'
                                value={token}
                            />
                        </div>

                        <div className="flex items-center justify-end">
                            <button 
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                type="submit"
                            >Checkout</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;