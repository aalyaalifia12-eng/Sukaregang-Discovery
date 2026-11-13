import React from 'react';

interface FooterProps {
  onNavigate: (route: string) => void;
  onSelectCategory: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectCategory }) => {
  return (
    <footer className="bg-[#253B32] text-[#F5F0E7] border-t-2 border-[#D6B889]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#A66D43] flex items-center justify-center text-[#F5F0E7] border border-[#D6B889]/40">
                <span>🧭</span>
              </div>
              <div>
                <h4 className="font-serif text-xl font-bold tracking-tight text-[#F5F0E7]">
                  SUKAREGANG <span className="text-[#D6B889] font-light italic">DISCOVERY</span>
                </h4>
                <p className="text-[10px] tracking-widest uppercase text-[#D6B889]/80">
                  Sentra Kerajinan Kulit Garut
                </p>
              </div>
            </div>

            <p className="text-xs text-[#F5F0E7]/70 leading-relaxed">
              Platform digital interaktif yang memperkenalkan kawasan Sukaregang, Garut, sebagai sentra industri dan kerajinan kulit terkemuka di Indonesia.
            </p>

            <div className="text-[11px] text-[#D6B889]/80 flex items-center space-x-2 pt-2">
              <span>🛡️ Mitra Resmi Katalog: Syakira Leather</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="font-serif text-base font-bold text-[#D6B889]">
              Navigasi Utama
            </h5>
            <ul className="space-y-2 text-xs text-[#F5F0E7]/80">
              {[
                { id: 'beranda', label: 'Beranda' },
                { id: 'explore', label: 'Explore Sukaregang' },
                { id: 'sejarah', label: 'Sejarah Sukaregang' },
                { id: 'academy', label: 'Leather Academy' },
                { id: 'produksi', label: 'Proses Produksi' },
                { id: 'tentang', label: 'Tentang Kami' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="hover:text-[#D6B889] transition"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="font-serif text-base font-bold text-[#D6B889]">
              Kategori Produk
            </h5>
            <ul className="space-y-2 text-xs text-[#F5F0E7]/80">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('Jaket Kulit Pria');
                    onNavigate('katalog');
                  }}
                  className="hover:text-[#D6B889] transition text-left"
                >
                  Jaket Kulit Pria (13 Produk)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('Sepatu Kulit Pria');
                    onNavigate('katalog');
                  }}
                  className="hover:text-[#D6B889] transition text-left"
                >
                  Sepatu Kulit Pria (3 Produk)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('Sepatu Kulit Wanita');
                    onNavigate('katalog');
                  }}
                  className="hover:text-[#D6B889] transition text-left"
                >
                  Sepatu Kulit Wanita (4 Produk)
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => onNavigate('syakira')}
                  className="text-[#D6B889] font-bold hover:underline"
                >
                  Profil Syakira Leather →
                </button>
              </li>
            </ul>
          </div>

          {/* External Shopee Link */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="font-serif text-base font-bold text-[#D6B889]">
              Pembelian Resmi
            </h5>
            <p className="text-xs text-[#F5F0E7]/70 leading-relaxed">
              Seluruh pembelian produk terhubung langsung dengan marketplace resmi Shopee.
            </p>
            <a
              href="https://shopee.co.id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#A66D43] hover:bg-[#87532F] text-white text-xs font-bold transition shadow"
            >
              <span>🛍️ Shopee Syakira</span>
            </a>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-[#D6B889]/20 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-[#F5F0E7]/60 gap-3">
          <div>
            © {new Date().getFullYear()} Sukaregang Discovery. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <span>Garut, Jawa Barat, Indonesia</span>
            <span>•</span>
            <span>Premium Heritage + Modern Digital Exploration</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
