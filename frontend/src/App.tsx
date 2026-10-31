import Header from './components/Header/Header';

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      {/* cartCount is mock data until the cart store exists */}
      <Header cartCount={2} />
      <main id="main" />
    </>
  );
}
