import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HeroCarousel from "./components/HeroCarousel";
import CategorySection from "./components/CategorySection";
import ProductTabs from "./components/ProductTabs";
import BatBrandsSection from "./components/BatBrandsSection";
import PopularBrands from "./components/PopularBrands";
import PromoBanners from "./components/PromoBanners";
import Footer from "./components/Footer";
import CricketBatsCollection from "./components/CricketBatsCollection";
import CricketBatsCollectionNew from "./components/CricketBatsCollectionNew";
import KitBagsCollection from "./components/KitBagsCollection";
import BattingGearCollection from "./components/BattingGearCollection";
import CricketHelmetsCollection from "./components/CricketHelmetsCollection";
import BattingPadsCollection from "./components/BattingPadsCollection";
import ProtectionCollection from "./components/ProtectionCollection";
import WicketKeepingCollection from "./components/WicketKeepingCollection";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroCarousel />
        <CategorySection />
        <ProductTabs />
        <BatBrandsSection />
        <PopularBrands />
        <PromoBanners />
      </main>
      <Footer />
    </div>
  );
};

const CricketBatsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <CricketBatsCollectionNew />
      </main>
      <Footer />
    </div>
  );
};

const KitBagsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <KitBagsCollection />
      </main>
      <Footer />
    </div>
  );
};

const BattingGearPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <BattingGearCollection />
      </main>
      <Footer />
    </div>
  );
};

const CricketHelmetsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <CricketHelmetsCollection />
      </main>
      <Footer />
    </div>
  );
};

const BattingPadsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <BattingPadsCollection />
      </main>
      <Footer />
    </div>
  );
};

const ProtectionPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <ProtectionCollection />
      </main>
      <Footer />
    </div>
  );
};

const WicketKeepingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <WicketKeepingCollection />
      </main>
      <Footer />
    </div>
  );
};

const CollectionPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-black text-gray-900 mb-8">Collection</h1>
          <p className="text-gray-600">Products will be displayed here.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const ProductPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-black text-gray-900 mb-8">Product Details</h1>
          <p className="text-gray-600">Product details will be displayed here.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collections/cricket-bats" element={<CricketBatsPage />} />
          <Route path="/collections/kit-bags" element={<KitBagsPage />} />
          <Route path="/collections/batting-gear" element={<BattingGearPage />} />
          <Route path="/collections/helmets" element={<CricketHelmetsPage />} />
          <Route path="/collections/batting-pads" element={<BattingPadsPage />} />
          <Route path="/collections/protection" element={<ProtectionPage />} />
          <Route path="/collections/wicket-keeping" element={<WicketKeepingPage />} />
          <Route path="/collections/*" element={<CollectionPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
