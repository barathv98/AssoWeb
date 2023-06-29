import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import ProductsListingPage from './pages/ProductsListingPage';
import MarqueeRibbon from './components/MarqueeRibbon';
import PageNotFound from './pages/PageNotFound';
import { GeneralProvider } from './GeneralProvider';
import CartPage from './pages/CartPage';
import ConfirmationPage from './pages/ConfirmationPage';
import Footer from './components/Footer';
import Copyright from './components/Copyright';
import ContactPage from './pages/ContactPage';
import AboutUsPage from './pages/AboutUsPage';
import ProductsPage from './pages/ProductsPage';
import DownloadsPage from './pages/DownloadsPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <GeneralProvider>
          <MarqueeRibbon />
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/contact-us" element={<ContactPage />} />
            <Route path="/downloads" element={<DownloadsPage />} />
            <Route path="/products" element={<ProductsPage />} />
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
