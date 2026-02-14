
import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import ChatWidget from './ChatWidget';
import CartDrawer from './CartDrawer';
import Footer from './Footer';

const Layout = () => {
    return (
        <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans selection:bg-[var(--accent-primary)]/30 transition-colors duration-300">
            <Navbar />
            <CartDrawer />
            <main className="pt-20 min-h-[calc(100vh-80px)]">
                <Outlet />
            </main>
            <Footer />
            <ChatWidget />
        </div>
    );
};

export default Layout;
