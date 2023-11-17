import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { GeneralProvider } from './GeneralProvider';
import Copyright from './components/Copyright';
import Footer from './components/Footer';
import Header from './components/Header';
import MarqueeRibbon from './components/MarqueeRibbon';
import AboutUsPage from './pages/AboutUsPage';
import CartPage from './pages/CartPage';
import ContactPage from './pages/ContactPage';
import HomePage from './pages/HomePage';
import PageNotFound from './pages/PageNotFound';
import PlaceOrderPage from './pages/PlaceOrderPage';
import ProductsListingPage from './pages/ProductsListingPage';
import ProductsPage from './pages/ProductsPage';

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
