import React from 'react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#292B29]/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border-2 border-[#D6B889]/40 relative max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-[#253B32] text-[#F5F0E7] flex items-center justify-between border-b border-[#D6B889]/30">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D6B889]"></span>
            <span className="text-xs font-semibold tracking-wider uppercase text-[#D6B889]">
              {product.category}
            </span>
            <span className="text-[#F5F0E7]/50">|</span>
            <span className="text-xs font-semibold text-[#F5F0E7]">{product.storeName}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1C2C25] hover:bg-[#A66D43] flex items-center justify-center text-[#F5F0E7] transition"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Product Visual */}
          <div className="rounded-2xl overflow-hidden bg-[#F5F0E7] border border-[#D6B889]/40 relative">
            <img
              src={product.imageUrl}
              alt={product.name}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = product.category.includes('Jaket')
                  ? 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80'
                  : 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80';
              }}
              className="w-full h-80 object-cover"
            />
            <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md p-2 rounded-xl text-center text-[11px] text-[#292B29]/80 border border-[#D6B889]/30">
              Foto Resmi Syakira Leather Sukaregang
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#253B32] mb-2">
                {product.name}
              </h3>

              <div className="flex items-center space-x-2 mb-4">
                <span className="px-2.5 py-1 bg-[#F5F0E7] rounded-md text-xs font-semibold text-[#253B32] border border-[#D6B889]/40">
                  Toko: {product.storeName}
                </span>
                <span className="px-2.5 py-1 bg-[#F5F0E7] rounded-md text-xs font-semibold text-[#A66D43] border border-[#D6B889]/40">
                  {product.category}
                </span>
              </div>

              <div className="space-y-4 text-xs text-[#292B29]/80 mb-6">
                <div>
                  <h6 className="font-bold uppercase tracking-wider text-[#292B29]/60 mb-1">
                    Deskripsi Produk:
                  </h6>
                  <p className="leading-relaxed bg-[#F5F0E7]/40 p-3 rounded-xl border border-[#D6B889]/20">
                    {product.description}
                  </p>
                </div>

                <div>
                  <h6 className="font-bold uppercase tracking-wider text-[#292B29]/60 mb-1">
                    Informasi Material:
                  </h6>
                  <div className="flex items-center space-x-2 bg-[#F5F0E7] p-3 rounded-xl border border-[#D6B889]/30">
                    <span className="font-medium text-[#253B32]">🛡️ {product.materialInfo}</span>
                  </div>
                </div>

                <div className="bg-[#F2F6F4] p-3 rounded-xl border border-[#253B32]/20 text-[11px] text-[#253B32]/90">
                  <strong>Catatan Transaksi:</strong> Seluruh transaksi dan pengiriman dilakukan langsung melalui platform marketplace Shopee resmi Syakira Leather.
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href={product.shopeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-[#A66D43] hover:bg-[#87532F] text-white font-bold text-sm tracking-wide text-center transition flex items-center justify-center space-x-2 shadow-lg"
            >
              <span>🛍️ Beli Langsung di Shopee Syakira Leather ↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
