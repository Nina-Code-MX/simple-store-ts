import React from "react";
import Header from "./Header";

const Home: React.FC = () => {
    return (
        <div className="w-full">
            <Header />
            <h1>Welcome to the Simple Store TS</h1>
            <p>Discover our products and shop online.</p>
        </div>
    );
};

export default Home;