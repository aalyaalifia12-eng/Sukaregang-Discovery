import React, { useState } from 'react';

export const VirtualTour: React.FC = () => {
  const [currentSpot, setCurrentSpot] = useState(0);
  const [yaw, setYaw] = useState(0);
  const [pitch, setPitch] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showInstructions, setShowInstructions] = useState(true);

  const spots = [
    {
      id: 'spot-gerbang',
      title: 'Gerbang Sentra Sukaregang',
      locationName: 'Pintu Gerbang Utama & Tugu Sukaregang',
      desc: 'Titik masuk ikonik ke kawasan sentra industri dan pertokoan kulit Garut.',
      bgUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1600&q=85',
    },
    {
      id: 'spot-koridor',
      title: 'Koridor Galeri Kulit',
      locationName: 'Jl. Gagak Lumayung Sukaregang',
      desc: 'Jajaran etalase perajin kulit dengan display jaket dan sepatu khas Sukaregang.',
      bgUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1600&q=85',
    },
    {
      id: 'spot-workshop',
      title: 'Bengkel Penyamakan Tradisional',
      locationName: 'Workshop Pengolahan & Pengeringan Kulit',
      desc: 'Area penyamakan dan pengolahan lembaran kulit domba dan sapi mentah.',
      bgUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1600&q=85',
    },
    {
      id: 'spot-syakira',
      title: 'Showroom Syakira Leather',
      locationName: 'Pusat Koleksi Jaket & Sepatu Kulit',
      desc: 'Toko kurasi produk kulit asli Sukaregang dengan standar mutu terjamin.',
      bgUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1600&q=85',
    },
  ];

  const activeSpot = spots[currentSpot];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setYaw((prev) => (prev + dx * 0.25) % 360);
    setPitch((prev) => Math.max(-40, Math.min(40, prev - dy * 0.15)));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-[#15211C] border-2 border-[#D6B889]/40 shadow-2xl">
      {/* 360 Viewer Canvas Container */}
      <div
        className="relative h-[480px] md:h-[580px] w-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Simulated 360 Panoramic Background Projection */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-75 will-change-transform"
          style={{
            backgroundImage: `url(${activeSpot.bgUrl})`,
            transform: `scale(${zoom}) translate(${yaw * 1.5}px, ${pitch * 1.2}px)`,
            filter: 'brightness(0.92) contrast(1.05)',
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#15211C]/90 via-transparent to-[#15211C]/50 pointer-events-none" />

        {/* Compass Heading Indicator */}
        <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 bg-[#253B32]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#D6B889]/40 text-[#F5F0E7] text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
          <span className="font-semibold tracking-wider">360° LIVE PANORAMA</span>
          <span className="text-[#D6B889]">| Arah: {Math.round((yaw + 360) % 360)}°</span>
        </div>

        {/* Zoom Controls */}
        <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2 bg-[#253B32]/80 backdrop-blur-md p-1.5 rounded-xl border border-[#D6B889]/40 text-[#F5F0E7]">
          <button
            onClick={() => setZoom((z) => Math.min(2.0, z + 0.2))}
            className="w-8 h-8 flex items-center justify-center hover:bg-[#A66D43] rounded-lg transition"
            title="Perbesar"
          >
            +
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(0.9, z - 0.2))}
            className="w-8 h-8 flex items-center justify-center hover:bg-[#A66D43] rounded-lg transition"
            title="Perkecil"
          >
            -
          </button>
          <button
            onClick={() => { setYaw(0); setPitch(0); setZoom(1); }}
            className="w-8 h-8 flex items-center justify-center hover:bg-[#A66D43] rounded-lg transition text-xs"
            title="Reset"
          >
            ↺
          </button>
        </div>

        {/* Instruction Banner */}
        {showInstructions && (
          <div className="absolute inset-x-4 bottom-24 md:bottom-20 max-w-md mx-auto z-10 bg-[#253B32]/90 backdrop-blur-md text-[#F5F0E7] p-4 rounded-xl border border-[#D6B889]/40 shadow-xl text-center">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[#D6B889] font-semibold text-xs tracking-wider uppercase">
                Petunjuk Virtual Tour 360°
              </span>
              <button onClick={() => setShowInstructions(false)} className="text-[#F5F0E7]/60 hover:text-[#F5F0E7] text-xs">
                ✕
              </button>
            </div>
            <p className="text-xs text-[#F5F0E7]/90 leading-relaxed">
              <strong>Klik & Geser (drag)</strong> mouse Anda untuk memutar sudut pandang 360 derajat. Gunakan tombol + dan - untuk zoom.
            </p>
          </div>
        )}

        {/* Active Vantage Point Info Banner */}
        <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 pointer-events-none">
          <div className="bg-[#253B32]/85 backdrop-blur-md p-3.5 rounded-xl border border-[#D6B889]/40 text-[#F5F0E7] max-w-md pointer-events-auto">
            <div className="text-[10px] uppercase font-bold tracking-widest text-[#D6B889]">
              Titik Eksplorasi {currentSpot + 1} / {spots.length}
            </div>
            <h4 className="font-serif text-lg font-bold text-[#F5F0E7]">{activeSpot.title}</h4>
            <p className="text-xs text-[#F5F0E7]/80 mt-0.5">{activeSpot.desc}</p>
            <div className="mt-2 text-[11px] text-[#D6B889]/90">
              📍 {activeSpot.locationName}
            </div>
          </div>
        </div>
      </div>

      {/* Spot Switcher Bar */}
      <div className="bg-[#253B32] p-3.5 border-t border-[#D6B889]/30 flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs text-[#D6B889] font-medium">Pilih Sudut Pandang Kawasan:</span>
        <div className="flex flex-wrap gap-2">
          {spots.map((spot, idx) => (
            <button
              key={spot.id}
              onClick={() => {
                setCurrentSpot(idx);
                setYaw(0);
                setPitch(0);
              }}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition flex items-center space-x-1.5 ${
                currentSpot === idx
                  ? 'bg-[#D6B889] text-[#253B32] font-bold shadow'
                  : 'bg-[#15211C]/60 text-[#F5F0E7]/80 hover:bg-[#1C2C25] hover:text-[#F5F0E7] border border-[#D6B889]/20'
              }`}
            >
              <span>📷 {spot.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Technical Disclaimer Notice */}
      <div className="bg-[#15211C] px-4 py-2 border-t border-[#D6B889]/10 flex items-center justify-between text-[11px] text-[#F5F0E7]/70">
        <span>ℹ️ Komponen siap menerima file panorama 360° resolusi tinggi dokumentasi resmi Sukaregang.</span>
        <span className="hidden sm:inline text-[#D6B889]/80">Garut Heritage Experience</span>
      </div>
    </div>
  );
};
