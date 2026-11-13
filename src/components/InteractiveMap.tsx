import React, { useState } from 'react';
import { ExplorationLocation } from '../types';

interface InteractiveMapProps {
  locations: ExplorationLocation[];
  onSelectLocation?: (location: ExplorationLocation) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ locations, onSelectLocation }) => {
  const [selectedLoc, setSelectedLoc] = useState<ExplorationLocation>(locations[0]);
  const [activeCategory, setActiveCategory] = useState<string>('Semua');

  const categories = ['Semua', 'Sentra Industri', 'Landmark', 'Edukasi', 'Toko Mitra'];

  const filteredLocations = activeCategory === 'Semua'
    ? locations
    : locations.filter((l) => l.category === activeCategory);

  const handleSelect = (loc: ExplorationLocation) => {
    setSelectedLoc(loc);
    if (onSelectLocation) onSelectLocation(loc);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      {/* Interactive Map Area / Visual Container */}
      <div className="lg:col-span-2 rounded-2xl overflow-hidden border-2 border-[#D6B889]/40 shadow-xl bg-[#15211C] relative">
        {/* Category Filter Pills */}
        <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-1.5 bg-[#253B32]/85 backdrop-blur-md p-1.5 rounded-xl border border-[#D6B889]/40 shadow-lg">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs px-2.5 py-1 rounded-lg transition font-medium ${
                activeCategory === cat
                  ? 'bg-[#D6B889] text-[#253B32] font-bold'
                  : 'text-[#F5F0E7]/80 hover:text-[#F5F0E7] hover:bg-[#1C2C25]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Map Display & Pins */}
        <div className="h-[460px] md:h-[540px] w-full relative bg-[#1C2C25] flex items-center justify-center p-6 overflow-hidden">
          {/* Subtle Map Graphic Background */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#D6B889_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          {/* Coordinates Grid Overlay */}
          <div className="absolute inset-0 flex flex-col justify-between p-6 pointer-events-none opacity-30 text-[10px] text-[#D6B889] font-mono">
            <div>7°12'50.4"S 107°54'55.8"E • GARUT KOTA</div>
            <div className="self-end">SUKAREGANG INDUSTRIAL CORRIDOR • JAWA BARAT</div>
          </div>

          {/* Interactive Visual Pins Node Representation */}
          <div className="relative z-10 w-full max-w-lg space-y-3">
            <div className="bg-[#253B32]/90 backdrop-blur-md p-4 rounded-2xl border border-[#D6B889]/40 text-center shadow-2xl mb-4">
              <span className="text-xs uppercase font-bold tracking-widest text-[#D6B889]">
                Sentra Kerajinan Kulit Sukaregang
              </span>
              <p className="text-xs text-[#F5F0E7]/80 mt-1">
                Pilih titik di bawah ini untuk melihat detail lokasi, alamat resmi, dan panduan kunjungan.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {filteredLocations.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => handleSelect(loc)}
                  className={`p-3 rounded-xl border text-left transition flex items-start space-x-2.5 ${
                    selectedLoc.id === loc.id
                      ? 'bg-[#D6B889] text-[#253B32] border-[#D6B889] shadow-lg font-semibold'
                      : 'bg-[#253B32]/70 hover:bg-[#253B32] text-[#F5F0E7] border-[#D6B889]/20'
                  }`}
                >
                  <span className="text-lg flex-shrink-0">📍</span>
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase font-bold tracking-wider opacity-75 block">
                      {loc.category}
                    </span>
                    <h5 className="text-xs font-bold truncate">{loc.name}</h5>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Map Legend */}
        <div className="p-3 bg-[#253B32] text-[#F5F0E7] text-xs border-t border-[#D6B889]/20 flex flex-wrap items-center justify-between gap-2">
          <span className="flex items-center space-x-2 text-[#D6B889]">
            <span>🧭 Peta Interaktif Kawasan Sentra Sukaregang, Garut</span>
          </span>
          <span className="text-[#F5F0E7]/70 text-[11px]">Koordinat Terverifikasi Sukaregang</span>
        </div>
      </div>

      {/* Location Details Inspector Drawer */}
      <div className="bg-white rounded-2xl p-6 border-2 border-[#D6B889]/30 shadow-lg">
        <div className="flex items-center justify-between pb-3 border-b border-[#D6B889]/20 mb-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#253B32]/10 text-[#253B32]">
            {selectedLoc.category}
          </span>
          <span className="text-[11px] text-[#292B29]/60">Titik Terpilih</span>
        </div>

        <img
          src={selectedLoc.imageUrl}
          alt={selectedLoc.name}
          className="w-full h-44 object-cover rounded-xl mb-4 shadow"
        />

        <h3 className="font-serif text-xl font-bold text-[#253B32] mb-2 leading-snug">
          {selectedLoc.name}
        </h3>

        <div className="flex items-start space-x-2 text-xs text-[#292B29]/70 mb-3">
          <span className="text-[#A66D43] flex-shrink-0">📍</span>
          <span>{selectedLoc.address}</span>
        </div>

        <p className="text-xs text-[#292B29]/80 leading-relaxed mb-4">
          {selectedLoc.description}
        </p>

        <div className="bg-[#F5F0E7] p-3.5 rounded-xl border border-[#D6B889]/40 mb-4">
          <div className="flex items-center space-x-1.5 text-[#A66D43] font-semibold text-xs mb-1">
            <span>✨ Tips Kunjungan Wisatawan:</span>
          </div>
          <p className="text-xs text-[#292B29]/80 leading-relaxed">
            {selectedLoc.visitorTip}
          </p>
        </div>

        {/* List of other locations */}
        <div className="border-t border-[#D6B889]/20 pt-4">
          <h5 className="text-xs uppercase font-bold tracking-wider text-[#292B29]/60 mb-2">
            Daftar Titik Eksplorasi Lainnya:
          </h5>
          <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
            {locations.map((loc) => (
              <button
                key={loc.id}
                onClick={() => handleSelect(loc)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs transition flex items-center justify-between ${
                  selectedLoc.id === loc.id
                    ? 'bg-[#253B32] text-[#F5F0E7] font-semibold'
                    : 'hover:bg-[#F5F0E7] text-[#292B29]/80'
                }`}
              >
                <span className="truncate">{loc.name}</span>
                <span className="opacity-60 ml-1">→</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
