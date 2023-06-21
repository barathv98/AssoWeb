import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import { useRef } from 'react';
import ProductsListingPage from './pages/ProductsListingPage';
import MarqueeRibbon from './components/MarqueeRibbon';
import PageNotFound from './pages/PageNotFound';
import { GeneralProvider } from './GeneralProvider';
import CartPage from './pages/CartPage';
import ConfirmationPage from './pages/ConfirmationPage';
import Footer from './components/Footer';
import Copyright from './components/Copyright';

function App() {
  const aboutRef = useRef();
  const productRef = useRef();
  const contactRef = useRef();
  return (
    <div className="App">
      <BrowserRouter>
        <GeneralProvider>
          <MarqueeRibbon />
          <Header aboutRef={aboutRef} productRef={productRef} contactRef={contactRef} />
          <Routes>
            <Route path="/" element={<HomePage aboutRef={aboutRef} productRef={productRef} contactRef={contactRef} />} />
            <Route path="/products/:product" element={<ProductsListingPage />} />
            <Route path="/shopping-cart" element={<CartPage />} />
            <Route path="/order-confirmation/:state" element={<ConfirmationPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
          <Copyright />
        </GeneralProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
