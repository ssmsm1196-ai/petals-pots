import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { CartProvider } from './context/CartContext.jsx';
import { ProductProvider } from './context/ProductContext.jsx';
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <HelmetProvider>
            <ProductProvider>
                <CartProvider>
                    <App />
                </CartProvider>
            </ProductProvider>
        </HelmetProvider>
    </StrictMode>
);
