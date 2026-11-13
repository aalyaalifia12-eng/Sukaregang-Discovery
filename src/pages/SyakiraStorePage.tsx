import React, { useState, useMemo } from 'react';
import { Product, ProductCategory } from '../types';

interface SyakiraStorePageProps {
  products: Product[];
  customImages: Record<string, string>;
  onSelectDetail: (product: Product) => void;
  onOpenAdminUpload: () => void;
}

export const SyakiraStorePage: React.FC<SyakiraStorePageProps> = ({
  products,
  customImages,
  onSelectDetail,
  onOpenAdminUpload,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('default');

  // Categories definition
  const categories = [
    { id: 'Semua', label: 'Semua Koleksi (20)', count: 20 },
    { id: 'Jaket Kulit Pria', label: 'Jaket Kulit Pria (13)', count: 13 },
    { id: 'Sepatu Pria', label: 'Sepatu Pria (3)', count: 3 },
    { id: 'Sepatu Wanita', label: 'Sepatu Wanita (4)', count: 4 },
  ];

  // Filter & sort
  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (activeCategory !== 'Semua') {
      list = list.filter((p) => p.category === activeCategory);
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
  }, [products, activeCategory, searchQuery, sortBy]);

  return (
    <div className="py-8 bg-[#F5F0E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* =================================================================
            1. BANNER UTAMA SYAKIRA LEATHER
        ================================================================= */}
        <section className="relative rounded-3xl overflow-hidden bg-[#253B32] text-[#F5F0E7] border-2 border-[#D6B889]/40 shadow-2xl p-8 sm:p-12 lg:p-16">
          {/* Subtle Leather Background Texture */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#D6B889_1px,transparent_1px)] [background-size:20px_20px]" />

          <div className="relative max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#D6B889]/20 text-[#D6B889] border border-[#D6B889]/40 text-xs font-semibold">
              <span>🏛️ Sentra Kerajinan Kulit Sukaregang, Garut</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F5F0E7] leading-tight">
              SYAKIRA LEATHER – <br />
              <span className="text-[#D6B889] italic font-normal">Authentic Leather Collection</span>
            </h1>

            <p className="text-base sm:text-lg text-[#F5F0E7]/90 font-serif italic max-w-2xl leading-relaxed">
              "Discover the Art of Genuine Leather. Temukan berbagai koleksi produk kulit berkualitas dari Sukaregang, Garut."
            </p>

            {/* Quick action buttons on banner */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#koleksi-produk"
                className="px-6 py-3.5 rounded-xl bg-[#D6B889] hover:bg-[#BFA06F] text-[#253B32] font-bold text-xs tracking-wider uppercase transition shadow-lg flex items-center space-x-2"
              >
                <span>Lihat Koleksi 20 Produk</span>
                <span>↓</span>
              </a>
              <button
                onClick={onOpenAdminUpload}
                className="px-5 py-3.5 rounded-xl bg-[#A66D43] hover:bg-[#87532F] text-white font-bold text-xs tracking-wider transition shadow flex items-center space-x-2"
                title="Buka studio upload foto jika foto Shopee memerlukan penggantian"
              >
                <span>📸 Dashboard Upload Foto</span>
              </button>
            </div>
          </div>
        </section>

        {/* =================================================================
            2. DESKRIPSI SINGKAT BRAND
        ================================================================= */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-[#D6B889]/40 shadow-lg space-y-4">
          <div className="flex items-center space-x-3">
            <span className="w-9 h-9 rounded-xl bg-[#253B32] text-[#D6B889] flex items-center justify-center font-bold text-base">
              S
            </span>
            <span className="text-xs uppercase font-bold tracking-widest text-[#A66D43]">
              Profil Resmi Brand Mitra
            </span>
          </div>

          <p className="text-base sm:text-lg text-[#292B29]/90 font-serif leading-relaxed italic border-l-4 border-[#A66D43] pl-4 py-1">
            "Syakira Leather menghadirkan pilihan produk jaket kulit dan sepatu kulit untuk melengkapi kebutuhan serta gaya penggunanya. Melalui katalog digital Sukaregang Discovery, pengunjung dapat mengenal dan melihat koleksi produk Syakira Leather dengan lebih mudah."
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#ECE3D4] text-xs text-[#292B29]/80">
            <div className="flex items-start space-x-2.5">
              <span className="text-lg text-[#A66D43]">🛡️</span>
              <div>
                <strong>Material Kulit Asli Garut</strong>
                <p className="text-[#292B29]/70 text-[11px] mt-0.5">Kulit domba & sapi tersamak dari kawasan sentra industri Sukaregang.</p>
              </div>
            </div>
            <div className="flex items-start space-x-2.5">
              <span className="text-lg text-[#A66D43]">🧵</span>
              <div>
                <strong>Keahlian Perajin Lokal</strong>
                <p className="text-[#292B29]/70 text-[11px] mt-0.5">Konstruksi jahit presisi yang mempertahankan standar keawetan tinggi.</p>
              </div>
            </div>
            <div className="flex items-start space-x-2.5">
              <span className="text-lg text-[#A66D43]">🛍️</span>
              <div>
                <strong>Terhubung Shopee Resmi</strong>
                <p className="text-[#292B29]/70 text-[11px] mt-0.5">Seluruh pemesanan diarahkan langsung ke toko resmi Shopee.</p>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            3. KATEGORI PRODUK & KONTROL FILTER / PENCARIAN
        ================================================================= */}
        <section id="koleksi-produk" className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border-2 border-[#D6B889]/40 shadow-lg space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#ECE3D4] pb-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#A66D43]">
                  Katalog Terkurasi
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#253B32] mt-0.5">
                  Daftar Produk Syakira Leather
                </h3>
              </div>

              {/* Upload Foto Shortcut */}
              <button
                onClick={onOpenAdminUpload}
                className="px-3.5 py-2 rounded-xl bg-[#F5F0E7] hover:bg-[#D6B889]/30 text-[#A66D43] text-xs font-bold border border-[#D6B889]/40 transition flex items-center space-x-1.5 self-start md:self-auto"
              >
                <span>📸 Upload / Ganti Foto Produk</span>
              </button>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition ${
                    activeCategory === cat.id
                      ? 'bg-[#253B32] text-[#F5F0E7] shadow'
                      : 'bg-[#F5F0E7] text-[#292B29] hover:bg-[#D6B889]/30'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search & Sort Row */}
            <div className="flex flex-col sm:flex-row gap-3 justify-between items-center pt-2">
              <div className="relative w-full sm:max-w-md">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari jaket jubah, model domba, sepatu formal..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#D6B889]/40 bg-[#F5F0E7]/40 text-xs text-[#292B29] focus:outline-none focus:border-[#253B32]"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#292B29]/40 text-xs">
                  🔍
                </span>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#292B29]/40 hover:text-[#292B29] text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
                <span className="text-xs text-[#292B29]/60">
                  Menampilkan <strong>{filteredProducts.length}</strong> produk
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-[#D6B889]/40 bg-[#F5F0E7]/40 text-xs text-[#292B29] focus:outline-none focus:border-[#253B32]"
                >
                  <option value="default">Urutan Standar</option>
                  <option value="name-asc">Nama Produk A - Z</option>
                  <option value="name-desc">Nama Produk Z - A</option>
                </select>
              </div>
            </div>
          </div>

          {/* =================================================================
              4. DAFTAR PRODUK DALAM BENTUK GRID (ALL 20 PRODUCTS)
          ================================================================= */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => {
                const currentImg = customImages[product.id] || product.imageUrl;

                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl overflow-hidden border border-[#D6B889]/40 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group"
                  >
                    {/* Foto Produk */}
                    <div className="relative h-64 w-full bg-[#F5F0E7] overflow-hidden">
                      <img
                        src={currentImg}
                        alt={product.name}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = product.category.includes('Jaket')
                            ? 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80'
                            : 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80';
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Category Badge */}
                      <div className="absolute top-3 left-3 bg-[#253B32]/85 backdrop-blur-sm text-[#F5F0E7] px-2.5 py-1 rounded-full text-[11px] font-semibold border border-[#D6B889]/40">
                        {product.category}
                      </div>

                      {/* Custom Uploaded Badge indicator */}
                      {customImages[product.id] && (
                        <div className="absolute top-3 right-3 bg-[#A66D43] text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
                          Foto Kustom
                        </div>
                      )}

                      {/* Store Name Badge */}
                      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-[#253B32] px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border border-[#D6B889]/40">
                        {product.storeName}
                      </div>
                    </div>

                    {/* Konten Produk */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-serif text-lg font-bold text-[#253B32] leading-snug group-hover:text-[#A66D43] transition mb-2">
                          {product.name}
                        </h4>
                        <p className="text-xs text-[#292B29]/70 line-clamp-2 leading-relaxed mb-3">
                          {product.description}
                        </p>
                        <div className="text-[11px] text-[#A66D43] font-medium flex items-center space-x-1 mb-4">
                          <span>✓ {product.materialInfo}</span>
                        </div>
                      </div>

                      {/* Tombol Aksi: Lihat Detail & Beli di Shopee */}
                      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#ECE3D4]">
                        <button
                          onClick={() => onSelectDetail(product)}
                          className="w-full py-2 px-3 rounded-xl border border-[#253B32] text-[#253B32] hover:bg-[#253B32] hover:text-[#F5F0E7] text-xs font-semibold transition text-center"
                        >
                          Lihat Detail
                        </button>

                        <a
                          href={product.shopeeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2 px-3 rounded-xl bg-[#A66D43] hover:bg-[#87532F] text-white text-xs font-semibold transition text-center shadow-sm flex items-center justify-center space-x-1"
                        >
                          <span>Beli Sekarang</span>
                          <span className="text-[10px]">↗</span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border-2 border-[#D6B889]/30 shadow-md space-y-4 max-w-lg mx-auto">
              <span className="text-4xl block">🔍</span>
              <h4 className="font-serif text-xl font-bold text-[#253B32]">
                Produk Tidak Ditemukan
              </h4>
              <p className="text-xs text-[#292B29]/70">
                Tidak ada produk yang cocok dengan kata kunci "{searchQuery}".
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('Semua');
                }}
                className="px-4 py-2 rounded-xl bg-[#253B32] text-[#F5F0E7] text-xs font-semibold"
              >
                Reset Pencarian
              </button>
            </div>
          )}
        </section>

        {/* =================================================================
            7. NAVIGASI MEDIA SOSIAL & KONTAK SYAKIRA LEATHER
        ================================================================= */}
        <section className="bg-[#253B32] rounded-3xl p-8 sm:p-12 text-[#F5F0E7] border-2 border-[#D6B889]/40 shadow-xl space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D6B889]">
              Hubungi & Ikuti Kami
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F0E7]">
              Kanal Resmi Syakira Leather
            </h3>
            <p className="text-xs text-[#F5F0E7]/80">
              Terhubung langsung dengan layanan pelanggan dan etalase resmi kami untuk konsultasi model dan ukuran.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {/* Shopee Store */}
            <a
              href="https://shopee.co.id"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-[#15211C] hover:bg-[#1C2C25] border border-[#D6B889]/30 transition flex items-center space-x-3 group"
            >
              <span className="text-2xl p-2 rounded-xl bg-[#A66D43] text-white">🛍️</span>
              <div>
                <span className="text-[10px] text-[#D6B889] uppercase font-bold block">Marketplace</span>
                <span className="text-xs font-bold text-[#F5F0E7] group-hover:text-[#D6B889]">Shopee Official Store</span>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-[#15211C] hover:bg-[#1C2C25] border border-[#D6B889]/30 transition flex items-center space-x-3 group"
            >
              <span className="text-2xl p-2 rounded-xl bg-emerald-700 text-white">💬</span>
              <div>
                <span className="text-[10px] text-[#D6B889] uppercase font-bold block">Layanan Konsultasi</span>
                <span className="text-xs font-bold text-[#F5F0E7] group-hover:text-[#D6B889]">WhatsApp Syakira</span>
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-[#15211C] hover:bg-[#1C2C25] border border-[#D6B889]/30 transition flex items-center space-x-3 group"
            >
              <span className="text-2xl p-2 rounded-xl bg-pink-700 text-white">📸</span>
              <div>
                <span className="text-[10px] text-[#D6B889] uppercase font-bold block">Galeri Foto</span>
                <span className="text-xs font-bold text-[#F5F0E7] group-hover:text-[#D6B889]">Instagram @syakiraleather</span>
              </div>
            </a>

            {/* Lokasi Sentra Sukaregang */}
            <div className="p-4 rounded-2xl bg-[#15211C] border border-[#D6B889]/30 flex items-center space-x-3">
              <span className="text-2xl p-2 rounded-xl bg-[#253B32] text-[#D6B889] border border-[#D6B889]/40">📍</span>
              <div>
                <span className="text-[10px] text-[#D6B889] uppercase font-bold block">Sentra Kerajinan</span>
                <span className="text-xs font-bold text-[#F5F0E7]">Sukaregang, Garut Kota</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
