import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import AuthPage from './pages/AuthPage';
import SearchResults from './pages/SearchResults';

import { LanguageProvider } from './context/LanguageContext';

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) return <AuthPage />;

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
