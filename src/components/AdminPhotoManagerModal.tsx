import React, { useState } from 'react';
import { Product } from '../types';

interface AdminPhotoManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  customImages: Record<string, string>;
  onUpdateImage: (productId: string, newImageUrl: string) => void;
  onResetImage: (productId: string) => void;
  onResetAllImages: () => void;
}

export const AdminPhotoManagerModal: React.FC<AdminPhotoManagerModalProps> = ({
  isOpen,
  onClose,
  products,
  customImages,
  onUpdateImage,
  onResetImage,
  onResetAllImages,
}) => {
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || '');
  const [urlInput, setUrlInput] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string>('');

  if (!isOpen) return null;

  const currentProduct = products.find((p) => p.id === selectedProductId) || products[0];
  const activeImage = customImages[currentProduct.id] || currentProduct.imageUrl;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Mohon pilih file gambar (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setPreviewUrl(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const imageToSave = previewUrl || urlInput.trim();
    if (!imageToSave) {
      alert('Silakan pilih file gambar dari komputer atau tempelkan URL gambar.');
      return;
    }

    onUpdateImage(currentProduct.id, imageToSave);
    setStatusMessage(`✓ Foto untuk "${currentProduct.name}" berhasil diperbarui!`);
    setPreviewUrl('');
    setUrlInput('');
    setTimeout(() => setStatusMessage(''), 3000);
  };

  const handleResetCurrent = () => {
    onResetImage(currentProduct.id);
    setPreviewUrl('');
    setUrlInput('');
    setStatusMessage(`✓ Foto untuk "${currentProduct.name}" dikembalikan ke default Shopee.`);
    setTimeout(() => setStatusMessage(''), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#292B29]/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border-2 border-[#D6B889]/40 relative max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-[#253B32] text-[#F5F0E7] flex items-center justify-between border-b border-[#D6B889]/30">
          <div className="flex items-center space-x-3">
            <span className="w-10 h-10 rounded-xl bg-[#A66D43] flex items-center justify-center text-[#F5F0E7] border border-[#D6B889]/40 text-lg">
              📸
            </span>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#F5F0E7]">
                Dashboard Admin: Kelola & Upload Foto Produk
              </h3>
              <p className="text-[11px] text-[#D6B889]">
                Syakira Leather • Fitur khusus upload foto produk asli jika gambar Shopee memerlukan pembaruan
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1C2C25] hover:bg-[#A66D43] flex items-center justify-center text-[#F5F0E7] transition"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Product Selector List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-[#292B29]/70">
                Pilih Produk (20 Produk)
              </span>
              <span className="text-[10px] text-[#A66D43] font-semibold bg-[#F5F0E7] px-2 py-0.5 rounded-full border border-[#D6B889]/40">
                {Object.keys(customImages).length} Foto Kustom Aktif
              </span>
            </div>

            <div className="space-y-1.5 max-h-[460px] overflow-y-auto pr-1">
              {products.map((p, idx) => {
                const hasCustom = !!customImages[p.id];
                const isSelected = p.id === selectedProductId;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedProductId(p.id);
                      setPreviewUrl('');
                      setUrlInput('');
                    }}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition flex items-center justify-between border ${
                      isSelected
                        ? 'bg-[#253B32] text-[#F5F0E7] border-[#D6B889] font-semibold shadow'
                        : 'bg-white hover:bg-[#F5F0E7] text-[#292B29] border-[#D6B889]/20'
                    }`}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <span className="text-[10px] font-mono opacity-60">#{idx + 1}</span>
                      <span className="truncate">{p.name}</span>
                    </div>
                    {hasCustom && (
                      <span className="text-[10px] bg-[#A66D43] text-white px-1.5 py-0.5 rounded-md flex-shrink-0 ml-1">
                        Kustom
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={onResetAllImages}
              className="w-full py-2 px-3 text-[11px] font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-xl transition text-center border border-red-200"
            >
              Reset Semua Foto ke Asli Shopee
            </button>
          </div>

          {/* Right Column: Upload / Preview Studio */}
          <div className="lg:col-span-7 space-y-5 bg-[#F5F0E7]/60 p-5 rounded-2xl border border-[#D6B889]/40">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#A66D43]">
                {currentProduct.category} • Syakira Leather
              </span>
              <h4 className="font-serif text-xl font-bold text-[#253B32] mt-0.5">
                {currentProduct.name}
              </h4>
            </div>

            {/* Notification alert */}
            {statusMessage && (
              <div className="bg-emerald-50 text-emerald-800 text-xs p-3 rounded-xl border border-emerald-300 animate-fadeIn">
                {statusMessage}
              </div>
            )}

            {/* Current vs Preview Image */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[11px] font-semibold text-[#292B29]/70 block mb-1">
                  Foto yang Tampil Saat Ini:
                </span>
                <div className="h-44 rounded-xl overflow-hidden bg-white border border-[#D6B889]/40 shadow-sm relative">
                  <img
                    src={activeImage}
                    alt={currentProduct.name}
                    className="w-full h-full object-cover"
                  />
                  {customImages[currentProduct.id] && (
                    <span className="absolute top-2 left-2 bg-[#A66D43] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                      Foto Kustom
                    </span>
                  )}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-[#292B29]/70 block mb-1">
                  Preview Foto Baru:
                </span>
                <div className="h-44 rounded-xl overflow-hidden bg-white border-2 border-dashed border-[#D6B889] flex items-center justify-center p-2 text-center relative">
                  {previewUrl || urlInput ? (
                    <img
                      src={previewUrl || urlInput}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-[11px] text-[#292B29]/50">
                      Pilih file atau tempel URL untuk melihat preview foto
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Upload Method 1: Local File Picker */}
            <div className="space-y-1.5 bg-white p-3.5 rounded-xl border border-[#D6B889]/30">
              <label className="text-xs font-bold text-[#253B32] flex items-center space-x-1.5">
                <span>📁 Unggah File Foto dari Komputer:</span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="w-full text-xs text-[#292B29] file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#A66D43] file:text-white hover:file:bg-[#87532F] cursor-pointer"
              />
              <p className="text-[10px] text-[#292B29]/60">
                Pilih foto asli produk dari galeri Anda (otomatis tersimpan di browser Anda).
              </p>
            </div>

            {/* Upload Method 2: Direct URL */}
            <div className="space-y-1.5 bg-white p-3.5 rounded-xl border border-[#D6B889]/30">
              <label className="text-xs font-bold text-[#253B32]">
                🔗 Atau Tempel URL Gambar Online:
              </label>
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://contoh-link-foto.com/jaket-syakira.jpg"
                className="w-full p-2 rounded-lg border border-[#D6B889]/40 text-xs bg-[#F5F0E7]/40 focus:outline-none focus:border-[#253B32]"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2 pt-2">
              <button
                onClick={handleSave}
                className="flex-1 py-2.5 px-4 bg-[#253B32] hover:bg-[#1C2C25] text-[#F5F0E7] text-xs font-bold rounded-xl transition shadow"
              >
                Simpan & Terapkan Foto Produk
              </button>
              {customImages[currentProduct.id] && (
                <button
                  onClick={handleResetCurrent}
                  className="py-2.5 px-3 bg-white hover:bg-gray-100 text-red-600 text-xs font-semibold rounded-xl border border-red-200 transition"
                  title="Kembalikan produk ini ke foto asli Shopee"
                >
                  Reset Produk Ini
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
