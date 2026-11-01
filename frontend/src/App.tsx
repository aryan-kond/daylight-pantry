import { Route, Routes } from 'react-router';
import Header from './components/Header/Header';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import HomePage from './pages/HomePage/HomePage';
import ProductsPage from './pages/ProductsPage/ProductsPage';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      {/* cartCount is mock data until the cart store exists */}
      <Header cartCount={2} />
      <main id="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </main>
    </>
  );
}
