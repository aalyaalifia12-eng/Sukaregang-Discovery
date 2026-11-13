import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelectDetail: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelectDetail }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#D6B889]/40 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group">
      {/* Product Image Box */}
      <div className="relative h-64 w-full bg-[#F5F0E7] overflow-hidden">
        <img
          src={product.imageUrl}
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

        {/* Store Name Badge */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-[#253B32] px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border border-[#D6B889]/40">
          {product.storeName}
        </div>
      </div>

      {/* Product Details Content */}
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

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#ECE3D4]">
          <button
            onClick={() => onSelectDetail(product)}
            className="w-full py-2 px-3 rounded-xl border border-[#253B32] text-[#253B32] hover:bg-[#253B32] hover:text-[#F5F0E7] text-xs font-semibold transition flex items-center justify-center space-x-1.5"
          >
            <span>Lihat Detail</span>
          </button>

          <a
            href={product.shopeeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 px-3 rounded-xl bg-[#A66D43] hover:bg-[#87532F] text-white text-xs font-semibold transition flex items-center justify-center space-x-1.5 shadow-sm"
          >
            <span>Beli di Shopee</span>
          </a>
        </div>
      </div>
    </div>
  );
};
