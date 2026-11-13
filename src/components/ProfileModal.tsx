import React from 'react';
import { UserProfile } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onLogout: () => void;
  onOpenAdminManager: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onLogout,
  onOpenAdminManager,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#292B29]/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border-2 border-[#D6B889]/40 relative">
        {/* Header */}
        <div className="p-6 bg-[#253B32] text-[#F5F0E7] flex items-center justify-between border-b border-[#D6B889]/30">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D6B889]"></span>
            <h3 className="font-serif text-lg font-bold text-[#F5F0E7]">
              Profil Pengguna
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1C2C25] hover:bg-[#A66D43] flex items-center justify-center text-[#F5F0E7] transition"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Avatar and Main Info */}
          <div className="flex items-center space-x-4 pb-4 border-b border-[#ECE3D4]">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-[#D6B889] shadow"
            />
            <div>
              <div className="flex items-center space-x-1.5">
                <h4 className="font-serif text-lg font-bold text-[#253B32]">
                  {user.name}
                </h4>
                {user.role === 'admin' && (
                  <span className="bg-[#A66D43] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Admin
                  </span>
                )}
              </div>
              <p className="text-xs text-[#292B29]/70">{user.email}</p>
              <span className="text-[11px] text-[#A66D43] font-medium block mt-0.5">
                {user.role === 'admin' ? '👑 Pengelola Toko Syakira Leather' : '⭐ Wisatawan / Member Aktif'}
              </span>
            </div>
          </div>

          {/* Details list */}
          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1.5 px-3 bg-[#F5F0E7] rounded-xl">
              <span className="text-[#292B29]/70">ID Akun:</span>
              <span className="font-mono font-bold text-[#253B32]">{user.id}</span>
            </div>
            <div className="flex justify-between py-1.5 px-3 bg-[#F5F0E7] rounded-xl">
              <span className="text-[#292B29]/70">Tanggal Bergabung:</span>
              <span className="font-medium text-[#253B32]">{user.joinDate}</span>
            </div>
            <div className="flex justify-between py-1.5 px-3 bg-[#F5F0E7] rounded-xl">
              <span className="text-[#292B29]/70">Status Akun:</span>
              <span className="font-semibold text-emerald-700">✓ Aktif & Terverifikasi</span>
            </div>
          </div>

          {/* Admin Action */}
          {user.role === 'admin' && (
            <button
              onClick={() => {
                onClose();
                onOpenAdminManager();
              }}
              className="w-full py-2.5 px-4 bg-[#A66D43] hover:bg-[#87532F] text-white text-xs font-bold rounded-xl transition shadow flex items-center justify-center space-x-2"
            >
              <span>📸 Buka Dashboard Upload Foto Produk</span>
            </button>
          )}

          {/* Logout Button */}
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="w-full py-2.5 px-4 bg-white hover:bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-200 transition text-center"
          >
            Keluar dari Akun (Log Out)
          </button>
        </div>
      </div>
    </div>
  );
};
