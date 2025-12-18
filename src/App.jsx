import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MenPage from './pages/MenPage';
import WomenPage from './pages/WomenPage';
import SneakersPage from './pages/SneakersPage';
import AccessoriesPage from './pages/AccessoriesPage';
import NewArrivalsPage from './pages/NewArrivalsPage';
import FlashSalePage from './pages/FlashSalePage'; // NEW IMPORT
import SalePage from './pages/SalePage';
import MenSalePage from './pages/MenSalePage';
import WomenSalePage from './pages/WomenSalePage';
import SneakerSalePage from './pages/SneakerSalePage';
import AccessorySalePage from './pages/AccessorySalePage';
import BestsellerPage from './pages/BestsellerPage';
import TrendingPage from './pages/TrendingPage';
import TrackOrderPage from './pages/TrackOrderPage';
import ReturnsExchangesPage from './pages/ReturnsExchangesPage';
import ShippingPolicyPage from './pages/ShippingPolicyPage';
import FAQPage from './pages/FAQPage';
import AboutUsPage from './pages/AboutUsPage';
import CareersPage from './pages/CareersPage';
import JoinClub from './components/JoinClub';
import GlobalAuthModal from './components/GlobalAuthModal';
import { AuthProvider } from './context/AuthContext';
import { ShopProvider } from './context/ShopContext';
import { ToastProvider } from './context/ToastContext';

import ScrollToTop from './components/ScrollToTop';
import WishlistPage from './pages/WishlistPage';
import CartPage from './pages/CartPage';
import CategoryPage from './pages/CategoryPage';
import CollectionPage from './pages/CollectionPage';
import SneakerCollectionPage from './pages/SneakerCollectionPage';
import AccessoryCollectionPage from './pages/AccessoryCollectionPage';
import NewsletterSuccessPage from './pages/NewsletterSuccessPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CheckoutPage from './pages/CheckoutPage';

import OrderSuccessPage from './pages/OrderSuccessPage';
import GiftCardPage from './pages/GiftCardPage';
import ContactPage from './pages/ContactPage';
import StoreLocatorPage from './pages/StoreLocatorPage';
import SearchResultsPage from './pages/SearchResultsPage';
import CouponsPage from './pages/CouponsPage';
import SavedAddressesPage from './pages/SavedAddressesPage';

function AppContent() {
  const location = useLocation();
  const hideHeaderFooter = [
    '/cart',
    '/wishlist',
    '/home/newsletter-success',
    '/everyday-essentials',
    '/street-and-utility',
    '/winter-collection',
    '/comfort-outfit',
    '/home/trackOrder',
    '/home/returns-exchanges',
    '/sale/flash-sale'
  ].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-brand-white">
      {!hideHeaderFooter && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/home/men" element={<MenPage />} />
          <Route path="/home/women" element={<WomenPage />} />
          <Route path="/home/sneakers" element={<SneakersPage />} />
          <Route path="/home/accessories" element={<AccessoriesPage />} />
          <Route path="/home/accessories" element={<AccessoriesPage />} />
          {/* Direct routes for Footer */}
          <Route path="/men" element={<MenPage />} />
          <Route path="/women" element={<WomenPage />} />
          <Route path="/sneakers" element={<SneakersPage />} />
          <Route path="/new-arrivals" element={<NewArrivalsPage />} />

          <Route path="/home/new" element={<NewArrivalsPage />} />
          <Route path="/home/sale" element={<SalePage />} />
          <Route path="/sale/flash-sale" element={<FlashSalePage />} /> {/* NEW ROUTE */}
          <Route path="/sale/men-50" element={<MenSalePage />} />
          <Route path="/sale/women-60" element={<WomenSalePage />} />
          <Route path="/sale/sneakers-starting-1999" element={<SneakerSalePage />} />
          <Route path="/sale/accessories-under-999" element={<AccessorySalePage />} />
          <Route path="/home/bestseller" element={<BestsellerPage />} />
          <Route path="/home/trending" element={<TrendingPage />} />
          <Route path="/home/trackOrder" element={<TrackOrderPage />} />
          <Route path="/home/returns-exchanges" element={<ReturnsExchangesPage />} />
          <Route path="/home/shippingpolicy" element={<ShippingPolicyPage />} />
          <Route path="/home/FAQ" element={<FAQPage />} />
          <Route path="/home/aboutus" element={<AboutUsPage />} />
          <Route path="/home/career" element={<CareersPage />} />
          <Route path="/home/career" element={<CareersPage />} />

          {/* Collection Pages - No Header/Footer */}
          <Route
            path="/everyday-essentials"
            element={
              <CollectionPage
                collectionName="Everyday Essentials"
                title="Everyday Essentials"
                description="Timeless everyday pieces designed for comfort and versatility."
              />
            }
          />
          <Route
            path="/street-and-utility"
            element={
              <CollectionPage
                collectionName="Street & Utility"
                title="Street & Utility"
                description="Urban fits with attitude, engineered for the modern streets."
              />
            }
          />
          <Route
            path="/winter-collection"
            element={
              <CollectionPage
                collectionName="Winter Collection"
                title="Winter Collection"
                description="Layered looks and refined finishes for the cold season."
              />
            }
          />
          <Route
            path="/comfort-outfit"
            element={
              <CollectionPage
                collectionName="Comfort Outfit"
                title="Move in Comfort"
                description="Activewear and loungewear designed to perform with you."
              />
            }
          />

          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/home/sneaker/:tag" element={<SneakerCollectionPage />} />
          <Route path="/home/accessory/:tag" element={<AccessoryCollectionPage />} />
          <Route path="/home/:category/:subcategory" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/home/newsletter-success" element={<NewsletterSuccessPage />} />
          <Route path="/gift-cards" element={<GiftCardPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/stores" element={<StoreLocatorPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/coupons" element={<CouponsPage />} />
          <Route path="/saved-addresses" element={<SavedAddressesPage />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <JoinClub />
      {!hideHeaderFooter && <Footer />}
      <GlobalAuthModal />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <ShopProvider>
          <Router>
            <ScrollToTop />
            <AppContent />
          </Router>
        </ShopProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
