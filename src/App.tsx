import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from "react-query";
import HomePage from './pages/HomePage';
import Header from './components/Header';
import ProductsListingPage from './pages/ProductsListingPage';
import MarqueeRibbon from './components/MarqueeRibbon';
import PageNotFound from './pages/PageNotFound';
import { GeneralProvider } from './GeneralProvider';
import CartPage from './pages/CartPage';
import Footer from './components/Footer';
import Copyright from './components/Copyright';
import ContactPage from './pages/ContactPage';
import AboutUsPage from './pages/AboutUsPage';
import ProductsPage from './pages/ProductsPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import './App.css';

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <GeneralProvider>
            <MarqueeRibbon />
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about-us" element={<AboutUsPage />} />
              <Route path="/contact-us" element={<ContactPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:product" element={<ProductsListingPage />} />
              <Route path="/shopping-cart" element={<CartPage />} />
              <Route path="/place-order" element={<PlaceOrderPage />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
            <Copyright />
          </GeneralProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
