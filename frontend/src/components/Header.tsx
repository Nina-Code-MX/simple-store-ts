import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
    return (
        <header className="bg-neutral-100 py-2 w-full">
            <ul className="container flex items-center justify-between mx-auto w-full">
                <li className="">
                    <Link to='/' className="border border-neutral-700 block px-2 py-1 rounded">Home</Link>
                </li>
                <li className="">
                    <Link to='/products' className="border border-neutral-700 block px-2 py-1 rounded">Products</Link>
                </li>
                <li className="">
                    <Link to='/cart' className="border border-neutral-700 block px-2 py-1 rounded">Cart</Link>
                </li>
                <li className="">
                    <Link to='/login' className="border border-neutral-700 block px-2 py-1 rounded">Login</Link>
                </li>
                <li className="">
                    <Link to='/register' className="border border-neutral-700 block px-2 py-1 rounded">Register</Link>
                </li>
            </ul>
        </header>
    );
};

export default Header;