
import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import ChatWidget from './ChatWidget';
import CartDrawer from './CartDrawer';

const Layout = ({ onSearch, searchQuery }) => {
    return (
        <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans selection:bg-indigo-500/30 transition-colors duration-300">
            <Navbar onSearch={onSearch} />
            <CartDrawer />
            <main className="pt-20 min-h-[calc(100vh-80px)]">
                <Outlet context={{ searchQuery }} />
            </main>
            <footer className="border-t border-[var(--border-color)] py-12 mt-20">
                <div className="max-w-7xl mx-auto px-6 text-center text-[var(--text-secondary)] text-sm">
                    <p>© 2026 StoreDash. All rights reserved.</p>
                </div>
            </footer>
            <ChatWidget />
        </div>
    );
};

export default Layout;
