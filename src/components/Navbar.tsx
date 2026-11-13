import React, { useState } from 'react';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'explore', label: 'Explore Sukaregang' },
    { id: 'sejarah', label: 'Sejarah' },
    { id: 'academy', label: 'Leather Academy' },
    { id: 'produksi', label: 'Proses Produksi' },
    { id: 'katalog', label: 'Katalog Produk' },
    { id: 'syakira', label: 'Syakira Leather' },
    { id: 'tentang', label: 'Tentang Kami' },
  ];

  const handleNavClick = (route: string) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Banner */}
      <div className="bg-[#15211C] text-[#F5F0E7] py-1.5 px-4 text-xs tracking-wider border-b border-[#D6B889]/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="flex items-center space-x-1.5 text-[#D6B889]">
            <span>📍 Sukaregang, Garut - Sentra Kerajinan Kulit Indonesia</span>
          </span>
          <div className="hidden sm:flex items-center space-x-4 text-[11px] text-[#F5F0E7]/70">
            <span>Koleksi Eksklusif: Syakira Leather</span>
            <span>•</span>
            <span className="text-[#D6B889]">Garansi Kulit Asli Garut</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-[#253B32]/95 backdrop-blur-md text-[#F5F0E7] border-b border-[#D6B889]/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('beranda')}
            className="flex items-center space-x-3 text-left group"
          >
            <div className="w-11 h-11 rounded-xl bg-[#A66D43] flex items-center justify-center text-[#F5F0E7] shadow-md border border-[#D6B889]/40 group-hover:scale-105 transition">
              <span className="text-xl">🧭</span>
            </div>
            <div>
              <h1 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#F5F0E7]">
                SUKAREGANG <span className="text-[#D6B889] font-light italic">DISCOVERY</span>
              </h1>
              <p className="text-[10px] tracking-widest uppercase text-[#D6B889]/80">
                Digital Tourism & Leather Heritage
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 text-xs font-medium">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-xl transition ${
                  currentRoute === item.id
                    ? 'bg-[#D6B889] text-[#253B32] font-bold shadow'
                    : 'text-[#F5F0E7]/90 hover:text-[#D6B889] hover:bg-[#1C2C25]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center space-x-2">
            <button
              onClick={() => handleNavClick('explore')}
              className="px-3.5 py-2 rounded-xl border border-[#D6B889] text-[#D6B889] hover:bg-[#D6B889] hover:text-[#253B32] text-xs font-semibold transition"
            >
              Jelajahi Sukaregang
            </button>
            <button
              onClick={() => handleNavClick('katalog')}
              className="px-3.5 py-2 rounded-xl bg-[#A66D43] hover:bg-[#87532F] text-white text-xs font-semibold transition shadow"
            >
              Lihat Koleksi
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[#1C2C25] text-[#F5F0E7] hover:text-[#D6B889]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#15211C] border-t border-[#D6B889]/20 px-4 pt-3 pb-6 space-y-1.5">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                  currentRoute === item.id
                    ? 'bg-[#D6B889] text-[#253B32] font-bold'
                    : 'text-[#F5F0E7]/90 hover:bg-[#1C2C25]'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-3 border-t border-[#D6B889]/20 grid grid-cols-2 gap-2">
              <button
                onClick={() => handleNavClick('explore')}
                className="py-2.5 rounded-xl border border-[#D6B889] text-[#D6B889] text-center text-xs font-semibold"
              >
                Mulai Eksplorasi
              </button>
              <button
                onClick={() => handleNavClick('katalog')}
                className="py-2.5 rounded-xl bg-[#A66D43] text-white text-center text-xs font-semibold"
              >
                Katalog Produk
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
