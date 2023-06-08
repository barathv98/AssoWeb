import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import { useRef } from 'react';
import ProductsListingPage from './pages/ProductsListingPage';
import MarqueeRibbon from './components/MarqueeRibbon';
import PageNotFound from './pages/PageNotFound';

function App() {
  const aboutRef = useRef();
  const productRef = useRef();
  const contactRef = useRef();
  return (
    <div className="App">
      <BrowserRouter>
      <MarqueeRibbon />
      <Header aboutRef={aboutRef} productRef={productRef} contactRef={contactRef} />
        <Routes>
          <Route path="/" element={<HomePage aboutRef={aboutRef} productRef={productRef} contactRef={contactRef} />} />
          <Route path="/products-list" element={<ProductsListingPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
