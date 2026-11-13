import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { InteractiveMap } from './components/InteractiveMap';
import { VirtualTour } from './components/VirtualTour';
import { AcademyComparison } from './components/AcademyComparison';
import { ProductionTimeline } from './components/ProductionTimeline';
import { AuthModal } from './components/AuthModal';
import { ProfileModal } from './components/ProfileModal';
import { AdminPhotoManagerModal } from './components/AdminPhotoManagerModal';
import { SyakiraStorePage } from './pages/SyakiraStorePage';
import { PRODUCTS_DATA } from './data/products';
import { SUKAREGANG_LOCATIONS } from './data/locations';
import { LEATHER_MATERIALS, LEATHER_CARE_GUIDELINES } from './data/academy';
import { PRODUCTION_STEPS } from './data/production';
import { HISTORY_MILESTONES } from './data/history';
import { Product, UserProfile } from './types';

export const App: React.FC = () => {
  // Routes: 'beranda' (landing page di awal), 'store', 'explore', 'sejarah', 'academy', 'produksi', 'katalog', 'tentang'
  const [currentRoute, setCurrentRoute] = useState<string>('beranda');

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isAdminPhotoModalOpen, setIsAdminPhotoModalOpen] = useState<boolean>(false);

  // User Profile state (persisted in localStorage, default to active profile)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('syakira_current_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Default active profile for smooth experience
    return {
      id: 'usr-admin-01',
      name: 'Alya Alifia',
      email: 'alya.alifia@sukaregang.id',
      role: 'admin',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      joinDate: '13 November 2026',
      phone: '+62 812-3456-7890',
    };
  });

  // Custom Product Images uploaded via Admin Studio (persisted in localStorage)
  const [customImages, setCustomImages] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('syakira_custom_product_images');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {};
  });

  // Save custom images
  const handleUpdateProductImage = (productId: string, newImageUrl: string) => {
    setCustomImages((prev) => {
      const updated = { ...prev, [productId]: newImageUrl };
      try {
        localStorage.setItem('syakira_custom_product_images', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const handleResetProductImage = (productId: string) => {
    setCustomImages((prev) => {
      const updated = { ...prev };
      delete updated[productId];
      try {
        localStorage.setItem('syakira_custom_product_images', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const handleResetAllProductImages = () => {
    setCustomImages({});
    try {
      localStorage.removeItem('syakira_custom_product_images');
    } catch (e) {
      console.error(e);
    }
  };

  // Auth Handlers
  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('syakira_current_user', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('syakira_current_user');
    } catch (e) {
      console.error(e);
    }
  };

  // Leather Academy State
  const [selectedMaterial, setSelectedMaterial] = useState(LEATHER_MATERIALS[0]);

  // Catalog State
  const [catalogCategory, setCatalogCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('default');

  // Filter & sort products for standard catalog page
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS_DATA];

    if (catalogCategory !== 'Semua') {
      list = list.filter((p) => p.category === catalogCategory);
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'name-asc') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      list.sort((a, b) => b.name.localeCompare(a.name));
    }

    return list;
  }, [catalogCategory, searchQuery, sortBy]);

  const featuredJaket = PRODUCTS_DATA.filter((p) => p.category === 'Jaket Kulit Pria' && p.isFeatured).slice(0, 2);
  const featuredSepatuPria = PRODUCTS_DATA.filter((p) => p.category === 'Sepatu Pria' && p.isFeatured).slice(0, 1);
  const featuredSepatuWanita = PRODUCTS_DATA.filter((p) => p.category === 'Sepatu Wanita' && p.isFeatured).slice(0, 1);

  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRoute]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F0E7] text-[#292B29]">
      {/* Navbar with Profile Widget in Top-Right Corner */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={(r) => setCurrentRoute(r)}
        currentUser={currentUser}
        onOpenLogin={() => setIsAuthModalOpen(true)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenAdminManager={() => setIsAdminPhotoModalOpen(true)}
        onLogout={handleLogout}
      />

      <main className="flex-1">
        {/* =================================================================
            1. BERANDA (LANDING PAGE DI AWAL)
        ================================================================= */}
        {currentRoute === 'beranda' && (
          <div>
            {/* Hero Section */}
            <section className="relative bg-[#253B32] text-[#F5F0E7] py-20 lg:py-28 overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D6B889]/20 text-[#D6B889] border border-[#D6B889]/40 text-xs font-semibold">
                    <span>🏆 Sentra Industri & Kerajinan Kulit Garut</span>
                  </div>

                  <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F5F0E7] leading-tight">
                    DISCOVER THE <br />
                    <span className="text-[#D6B889] italic font-normal">HERITAGE OF LEATHER</span>
                  </h2>

                  <p className="text-base sm:text-lg text-[#F5F0E7]/80 max-w-xl font-normal leading-relaxed">
                    Jelajahi Sukaregang, mengenal cerita di balik kerajinan kulit, dan temukan karya lokal yang memiliki nilai serta karakter.
                  </p>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      onClick={() => setCurrentRoute('explore')}
                      className="px-6 py-3.5 rounded-xl bg-[#D6B889] hover:bg-[#BFA06F] text-[#253B32] font-bold text-sm tracking-wide transition shadow-lg"
                    >
                      🧭 Mulai Eksplorasi
                    </button>
                    <button
                      onClick={() => setCurrentRoute('store')}
                      className="px-6 py-3.5 rounded-xl bg-[#A66D43] hover:bg-[#87532F] text-white font-bold text-sm tracking-wide transition shadow-lg flex items-center space-x-2"
                    >
                      <span>🛍️ Kunjungi Syakira Store</span>
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 relative">
                  <div className="rounded-3xl p-3 bg-white/10 backdrop-blur-md border border-[#D6B889]/40 shadow-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80"
                      alt="Jaket Kulit Sukaregang"
                      className="w-full h-[400px] object-cover rounded-2xl"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Pengenalan Sukaregang */}
            <section className="py-20 bg-[#F5F0E7]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-6">
                    <img
                      src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80"
                      alt="Suasana Sukaregang"
                      className="w-full h-[380px] object-cover rounded-3xl border-2 border-[#D6B889]/40 shadow-xl"
                    />
                  </div>
                  <div className="lg:col-span-6 space-y-5">
                    <span className="text-xs uppercase font-bold tracking-widest text-[#A66D43]">
                      Identitas Kawasan
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#253B32]">
                      Mengenal Sukaregang
                    </h3>
                    <p className="text-base text-[#292B29]/80 leading-relaxed font-normal">
                      Sukaregang merupakan kawasan di Garut yang dikenal dengan aktivitas industri dan kerajinan kulit. Kawasan ini menjadi tempat berkembangnya berbagai produk berbahan kulit, mulai dari jaket hingga alas kaki.
                    </p>
                    <button
                      onClick={() => setCurrentRoute('sejarah')}
                      className="px-5 py-3 rounded-xl bg-[#253B32] hover:bg-[#1C2C25] text-[#F5F0E7] text-xs font-semibold tracking-wide transition shadow"
                    >
                      Selengkapnya Mengenai Sejarah →
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* 3 Kartu Eksplorasi */}
            <section className="py-20 bg-[#F2F6F4] border-y border-[#D6B889]/30">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white rounded-3xl p-8 border border-[#D6B889]/40 shadow-lg">
                    <span className="text-xs font-bold text-[#A66D43] uppercase tracking-wider">01. Tourism</span>
                    <h4 className="font-serif text-2xl font-bold text-[#253B32] mt-1 mb-3">Explore the Area</h4>
                    <p className="text-sm text-[#292B29]/70 leading-relaxed mb-6">
                      Jelajahi kawasan Sukaregang melalui peta dan pengalaman virtual tour.
                    </p>
                    <button onClick={() => setCurrentRoute('explore')} className="text-xs font-bold text-[#253B32] hover:text-[#A66D43]">
                      Mulai Jelajah Kawasan →
                    </button>
                  </div>

                  <div className="bg-white rounded-3xl p-8 border border-[#D6B889]/40 shadow-lg">
                    <span className="text-xs font-bold text-[#A66D43] uppercase tracking-wider">02. Heritage</span>
                    <h4 className="font-serif text-2xl font-bold text-[#253B32] mt-1 mb-3">Discover the Heritage</h4>
                    <p className="text-sm text-[#292B29]/70 leading-relaxed mb-6">
                      Pelajari sejarah dan perkembangan kerajinan kulit Sukaregang.
                    </p>
                    <button onClick={() => setCurrentRoute('sejarah')} className="text-xs font-bold text-[#253B32] hover:text-[#A66D43]">
                      Baca Garis Waktu Sejarah →
                    </button>
                  </div>

                  <div className="bg-white rounded-3xl p-8 border border-[#D6B889]/40 shadow-lg">
                    <span className="text-xs font-bold text-[#A66D43] uppercase tracking-wider">03. Education</span>
                    <h4 className="font-serif text-2xl font-bold text-[#253B32] mt-1 mb-3">Learn the Craft</h4>
                    <p className="text-sm text-[#292B29]/70 leading-relaxed mb-6">
                      Kenali jenis kulit serta proses pembuatan produk kulit.
                    </p>
                    <button onClick={() => setCurrentRoute('academy')} className="text-xs font-bold text-[#253B32] hover:text-[#A66D43]">
                      Masuk Leather Academy →
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Produk Unggulan */}
            <section className="py-20 bg-[#F5F0E7]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-widest text-[#A66D43]">Koleksi Pilihan</span>
                    <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#253B32] mt-1">Produk Unggulan Syakira Leather</h3>
                  </div>
                  <button onClick={() => setCurrentRoute('store')} className="px-5 py-2.5 rounded-xl border-2 border-[#253B32] text-[#253B32] hover:bg-[#253B32] hover:text-[#F5F0E7] text-xs font-bold">
                    Kunjungi Syakira Store (20 Produk) →
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[...featuredJaket, ...featuredSepatuPria, ...featuredSepatuWanita].map((p) => (
                    <ProductCard
                      key={p.id}
                      product={{ ...p, imageUrl: customImages[p.id] || p.imageUrl }}
                      onSelectDetail={(prod) => setSelectedProduct(prod)}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-[#253B32] text-[#F5F0E7] text-center">
              <div className="max-w-3xl mx-auto px-4 space-y-5">
                <h3 className="font-serif text-3xl sm:text-4xl font-bold">Your Journey into Leather Heritage Starts Here</h3>
                <p className="text-sm sm:text-base text-[#F5F0E7]/80">Kenali lebih dekat Sukaregang dan temukan berbagai produk kulit pilihan.</p>
                <div className="flex justify-center gap-3 pt-2">
                  <button onClick={() => setCurrentRoute('explore')} className="px-8 py-3.5 rounded-xl bg-[#D6B889] text-[#253B32] font-bold text-sm">
                    Mulai Menjelajahi
                  </button>
                  <button onClick={() => setCurrentRoute('store')} className="px-8 py-3.5 rounded-xl bg-[#A66D43] text-white font-bold text-sm">
                    Buka Syakira Store
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* =================================================================
            2. HALAMAN KHUSUS: SYAKIRA LEATHER STORE
        ================================================================= */}
        {currentRoute === 'store' && (
          <SyakiraStorePage
            products={PRODUCTS_DATA}
            customImages={customImages}
            onSelectDetail={(prod) => setSelectedProduct(prod)}
            onOpenAdminUpload={() => setIsAdminPhotoModalOpen(true)}
          />
        )}

        {/* =================================================================
            3. EXPLORE SUKAREGANG (MAP & VIRTUAL TOUR)
        ================================================================= */}
        {currentRoute === 'explore' && (
          <div className="py-12 bg-[#F5F0E7]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="text-xs uppercase font-bold tracking-widest text-[#A66D43]">Digital Tourism</span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#253B32]">Explore Sukaregang</h2>
                <p className="text-sm text-[#292B29]/70">Peta kawasan terverifikasi dan simulasi virtual tour 360 derajat.</p>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-[#253B32] mb-4">A. Interactive Map Sentra Sukaregang</h3>
                <InteractiveMap locations={SUKAREGANG_LOCATIONS} />
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-[#253B32] mb-4">B. Virtual Tour 360 Derajat</h3>
                <VirtualTour />
              </div>
            </div>
          </div>
        )}

        {/* =================================================================
            4. SEJARAH SUKAREGANG
        ================================================================= */}
        {currentRoute === 'sejarah' && (
          <div className="py-12 bg-[#F5F0E7]">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="text-xs uppercase font-bold tracking-widest text-[#A66D43]">Storytelling & Narasi</span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#253B32]">Sejarah Sukaregang</h2>
              </div>
              <div className="bg-[#F2F6F4] p-4 rounded-xl border-l-4 border-[#D6B889] text-xs text-[#253B32]">
                <strong>Pemberitahuan Data Sejarah:</strong> Bagian konten ini menyajikan narasi perkembangan umum dan dapat diperbarui apabila informasi sejarah yang terverifikasi telah tersedia.
              </div>
              <div className="space-y-6">
                {HISTORY_MILESTONES.map((item, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-3xl border border-[#D6B889]/40 shadow-md">
                    <span className="text-xs font-bold text-[#A66D43]">{item.yearRange} • {item.era}</span>
                    <h3 className="font-serif text-xl font-bold text-[#253B32] mt-1 mb-2">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-[#292B29]/80 leading-relaxed mb-4">{item.narrative}</p>
                    <ul className="text-xs space-y-1 text-[#292B29]/70">
                      {item.keyHighlights.map((hl, hIdx) => (
                        <li key={hIdx}>✓ {hl}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =================================================================
            5. LEATHER ACADEMY
        ================================================================= */}
        {currentRoute === 'academy' && (
          <div className="py-12 bg-[#F5F0E7]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="text-xs uppercase font-bold tracking-widest text-[#A66D43]">Interactive Education</span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#253B32]">Understand the Leather</h2>
                <p className="text-sm text-[#292B29]/80">Mengenal material kulit, karakteristik, kegunaan, dan cara merawatnya.</p>
              </div>

              {/* Material tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {LEATHER_MATERIALS.map((mat) => (
                  <button
                    key={mat.id}
                    onClick={() => setSelectedMaterial(mat)}
                    className={`p-3.5 rounded-2xl border text-center transition ${
                      selectedMaterial.id === mat.id ? 'bg-[#253B32] text-[#F5F0E7]' : 'bg-white text-[#292B29]'
                    }`}
                  >
                    <span className="text-xs font-bold">{mat.name}</span>
                  </button>
                ))}
              </div>

              {/* Active Material */}
              <div className="bg-white p-8 rounded-3xl border border-[#D6B889]/40 shadow-xl space-y-4">
                <h3 className="font-serif text-2xl font-bold text-[#253B32]">{selectedMaterial.name}</h3>
                <p className="text-sm text-[#292B29]/80">{selectedMaterial.origin}</p>
                <div className="bg-[#F5F0E7] p-4 rounded-xl text-xs space-y-2">
                  <div className="font-bold text-[#A66D43]">Tekstur: {selectedMaterial.textureDescription}</div>
                  <div>Diferensiasi Asli vs Sintetis: {selectedMaterial.genuineComparison}</div>
                </div>
              </div>

              {/* Comparison Table */}
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#253B32] mb-4">Perbandingan Material</h3>
                <AcademyComparison materials={LEATHER_MATERIALS} />
              </div>

              {/* Care Guidelines */}
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#253B32] mb-4">Leather Care: Panduan Perawatan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {LEATHER_CARE_GUIDELINES.map((g) => (
                    <div key={g.stepNumber} className="bg-white p-6 rounded-3xl border border-[#D6B889]/40 shadow">
                      <span className="text-xs font-bold text-[#A66D43]">{g.stepNumber}</span>
                      <h4 className="font-serif text-lg font-bold text-[#253B32] mb-2">{g.title}</h4>
                      <p className="text-xs text-[#292B29]/70 mb-3">{g.summary}</p>
                      <ul className="text-xs space-y-1.5 text-[#292B29]/80">
                        {g.points.map((pt, pIdx) => (
                          <li key={pIdx}>• {pt}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================
            6. PROSES PRODUKSI
        ================================================================= */}
        {currentRoute === 'produksi' && (
          <div className="py-12 bg-[#F5F0E7]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="text-xs uppercase font-bold tracking-widest text-[#A66D43]">Visual Storytelling</span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#253B32]">Behind the Leather Craft</h2>
                <p className="text-sm text-[#292B29]/80">Melihat bagaimana material kulit diolah menjadi produk yang memiliki fungsi, karakter, dan nilai kerajinan.</p>
              </div>

              <ProductionTimeline steps={PRODUCTION_STEPS} />
            </div>
          </div>
        )}

        {/* =================================================================
            7. KATALOG PRODUK (STANDARD VIEW)
        ================================================================= */}
        {currentRoute === 'katalog' && (
          <div className="py-12 bg-[#F5F0E7]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="text-xs uppercase font-bold tracking-widest text-[#A66D43]">Katalog Terkurasi</span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#253B32]">Katalog Produk Syakira Leather</h2>
                <p className="text-sm text-[#292B29]/70">20 Produk: 13 Jaket Kulit Pria, 3 Sepatu Pria, 4 Sepatu Wanita.</p>
              </div>

              {/* Filter controls */}
              <div className="bg-white p-6 rounded-3xl border border-[#D6B889]/40 shadow space-y-4">
                <div className="flex flex-wrap gap-2">
                  {['Semua', 'Jaket Kulit Pria', 'Sepatu Pria', 'Sepatu Wanita'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCatalogCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold ${
                        catalogCategory === cat ? 'bg-[#253B32] text-[#F5F0E7]' : 'bg-[#F5F0E7] text-[#292B29]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-between">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari nama produk..."
                    className="p-2.5 rounded-xl border border-[#D6B889]/40 bg-[#F5F0E7]/40 text-xs w-full sm:max-w-md"
                  />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="p-2.5 rounded-xl border border-[#D6B889]/40 bg-[#F5F0E7]/40 text-xs"
                  >
                    <option value="default">Urutan Standar</option>
                    <option value="name-asc">Nama A - Z</option>
                    <option value="name-desc">Nama Z - A</option>
                  </select>
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={{ ...p, imageUrl: customImages[p.id] || p.imageUrl }}
                    onSelectDetail={(prod) => setSelectedProduct(prod)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =================================================================
            8. TENTANG KAMI
        ================================================================= */}
        {currentRoute === 'tentang' && (
          <div className="py-12 bg-[#F5F0E7]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="text-center space-y-3">
                <span className="text-xs uppercase font-bold tracking-widest text-[#A66D43]">Inisiatif Platform</span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#253B32]">About Sukaregang Discovery</h2>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-[#D6B889]/40 shadow-xl space-y-6">
                <p className="text-base sm:text-lg text-[#292B29]/90 leading-relaxed font-serif italic">
                  "Sukaregang Discovery merupakan platform digital yang dirancang untuk memperkenalkan potensi kawasan Sukaregang, Garut, melalui pengalaman eksplorasi, informasi sejarah, edukasi kerajinan kulit, serta pengenalan produk lokal. Melalui platform ini, pengunjung dapat mengenal Sukaregang lebih dekat dalam satu pengalaman digital yang informatif dan interaktif."
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* --- MODALS --- */}
      {/* 1. Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct ? { ...selectedProduct, imageUrl: customImages[selectedProduct.id] || selectedProduct.imageUrl } : null}
        onClose={() => setSelectedProduct(null)}
      />

      {/* 2. Auth Modal (Login) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* 3. User Profile Modal */}
      {currentUser && (
        <ProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          user={currentUser}
          onLogout={handleLogout}
          onOpenAdminManager={() => setIsAdminPhotoModalOpen(true)}
        />
      )}

      {/* 4. Admin Photo Upload & Management Studio Modal */}
      <AdminPhotoManagerModal
        isOpen={isAdminPhotoModalOpen}
        onClose={() => setIsAdminPhotoModalOpen(false)}
        products={PRODUCTS_DATA}
        customImages={customImages}
        onUpdateImage={handleUpdateProductImage}
        onResetImage={handleResetProductImage}
        onResetAllImages={handleResetAllProductImages}
      />

      {/* Footer */}
      <Footer
        onNavigate={(r) => setCurrentRoute(r)}
        onSelectCategory={(c) => {
          setCatalogCategory(c);
          setCurrentRoute('store');
        }}
      />
    </div>
  );
};

export default App;
