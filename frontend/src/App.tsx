import { Route, Routes } from 'react-router';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import HomePage from './pages/HomePage/HomePage';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import CartPage from './pages/CartPage/CartPage';
import OurStoryPage from './pages/OurStoryPage/OurStoryPage';
import './App.css';

export default function App() {
  return (
    <div className="app-shell">
      <ScrollToTop />
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/our-story" element={<OurStoryPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
