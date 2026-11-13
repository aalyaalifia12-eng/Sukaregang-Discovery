import React, { useState } from 'react';
import { UserProfile } from '../types';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  currentUser: UserProfile | null;
  onOpenLogin: () => void;
  onOpenProfile: () => void;
  onOpenAdminManager: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  currentUser,
  onOpenLogin,
  onOpenProfile,
  onOpenAdminManager,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'store', label: 'Syakira Store' },
    { id: 'explore', label: 'Explore Sukaregang' },
    { id: 'sejarah', label: 'Sejarah' },
    { id: 'academy', label: 'Leather Academy' },
    { id: 'produksi', label: 'Proses Produksi' },
    { id: 'katalog', label: 'Katalog Produk' },
    { id: 'tentang', label: 'Tentang Kami' },
  ];

  const handleNavClick = (route: string) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
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
            <span>Official Store: Syakira Leather</span>
            <span>•</span>
            <span className="text-[#D6B889]">100% Asli Sukaregang Garut</span>
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
          <nav className="hidden xl:flex items-center space-x-1 text-xs font-medium">
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

          {/* Right Area: Store CTA + Profil di Pojok Atas */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Quick Store Link */}
            <button
              onClick={() => handleNavClick('store')}
              className="px-3 py-2 rounded-xl bg-[#A66D43] hover:bg-[#87532F] text-white text-xs font-bold transition shadow flex items-center space-x-1.5"
            >
              <span>🛍️ Syakira Store</span>
            </button>

            {/* Profile Widget in Top-Right Corner */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2.5 p-1.5 pr-3 rounded-full bg-[#1C2C25] border border-[#D6B889]/40 hover:border-[#D6B889] transition"
                  aria-expanded={profileDropdownOpen}
                >
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover border border-[#D6B889]"
                  />
                  <div className="text-left text-xs leading-tight">
                    <span className="font-bold text-[#F5F0E7] block truncate max-w-[100px]">
                      {currentUser.name.split(' ')[0]}
                    </span>
                    <span className="text-[10px] text-[#D6B889] block">
                      {currentUser.role === 'admin' ? 'Admin' : 'Member'}
                    </span>
                  </div>
                  <span className="text-xs text-[#D6B889]">▾</span>
                </button>

                {/* Profile Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-[#D6B889]/40 py-2 text-[#292B29] z-50 animate-fadeIn">
                    <div className="px-4 py-2 border-b border-[#ECE3D4]">
                      <p className="text-xs font-bold text-[#253B32] truncate">{currentUser.name}</p>
                      <p className="text-[10px] text-[#292B29]/60 truncate">{currentUser.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onOpenProfile();
                      }}
                      className="w-full text-left px-4 py-2 text-xs hover:bg-[#F5F0E7] flex items-center space-x-2"
                    >
                      <span>👤 Lihat Profil Saya</span>
                    </button>

                    {currentUser.role === 'admin' && (
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          onOpenAdminManager();
                        }}
                        className="w-full text-left px-4 py-2 text-xs hover:bg-[#F5F0E7] text-[#A66D43] font-semibold flex items-center space-x-2"
                      >
                        <span>📸 Dashboard Upload Foto Produk</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleNavClick('store')}
                      className="w-full text-left px-4 py-2 text-xs hover:bg-[#F5F0E7] flex items-center space-x-2"
                    >
                      <span>🛍️ Kunjungi Syakira Store</span>
                    </button>

                    <div className="border-t border-[#ECE3D4] mt-1 pt-1">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          onLogout();
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center space-x-2 font-medium"
                      >
                        <span>🚪 Keluar (Log Out)</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="px-3.5 py-2 rounded-xl bg-[#D6B889] hover:bg-[#BFA06F] text-[#253B32] text-xs font-bold transition shadow flex items-center space-x-1.5"
              >
                <span>👤 Masuk / Log In</span>
              </button>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl bg-[#1C2C25] text-[#F5F0E7] hover:text-[#D6B889]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#15211C] border-t border-[#D6B889]/20 px-4 pt-3 pb-6 space-y-1.5">
            {/* Mobile User Profile Header */}
            <div className="p-3 bg-[#1C2C25] rounded-xl mb-3 flex items-center justify-between border border-[#D6B889]/30">
              {currentUser ? (
                <div className="flex items-center space-x-3">
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.name}
                    className="w-9 h-9 rounded-full object-cover border border-[#D6B889]"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#F5F0E7] block">{currentUser.name}</span>
                    <span className="text-[10px] text-[#D6B889] block">
                      {currentUser.role === 'admin' ? 'Admin Toko' : 'Member'}
                    </span>
                  </div>
                </div>
              ) : (
                <span className="text-xs text-[#F5F0E7]/80">Belum masuk ke akun</span>
              )}

              {currentUser ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenProfile();
                  }}
                  className="px-2.5 py-1 text-[11px] bg-[#253B32] text-[#D6B889] rounded-lg border border-[#D6B889]/40"
                >
                  Profil
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLogin();
                  }}
                  className="px-3 py-1 text-xs bg-[#D6B889] text-[#253B32] font-bold rounded-lg"
                >
                  Log In
                </button>
              )}
            </div>

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

            {currentUser?.role === 'admin' && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminManager();
                }}
                className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#A66D43] text-white"
              >
                📸 Buka Dashboard Upload Foto
              </button>
            )}
          </div>
        )}
      </header>
    </>
  );
};
