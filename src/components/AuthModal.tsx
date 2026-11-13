import React, { useState } from 'react';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [role, setRole] = useState<'member' | 'admin'>('admin');
  const [email, setEmail] = useState('alya.alifia@sukaregang.id');
  const [password, setPassword] = useState('••••••••');
  const [name, setName] = useState('Alya Alifia');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: UserProfile = {
      id: role === 'admin' ? 'usr-admin-01' : 'usr-member-02',
      name: name || (role === 'admin' ? 'Pengelola Toko Syakira' : 'Pengunjung Sukaregang'),
      email: email || 'pengguna@sukaregang.id',
      role: role,
      avatarUrl: role === 'admin'
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      joinDate: '13 November 2026',
      phone: '+62 812-3456-7890',
    };
    onLoginSuccess(newUser);
    onClose();
  };

  const handleQuickDemo = (selectedRole: 'admin' | 'member') => {
    const demoUser: UserProfile = {
      id: selectedRole === 'admin' ? 'usr-admin-01' : 'usr-member-02',
      name: selectedRole === 'admin' ? 'Alya Alifia (Admin Syakira)' : 'Pengunjung Wisatawan',
      email: selectedRole === 'admin' ? 'admin@syakiraleather.com' : 'wisatawan@sukaregang.id',
      role: selectedRole,
      avatarUrl: selectedRole === 'admin'
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      joinDate: '13 November 2026',
      phone: '+62 812-8888-9999',
    };
    onLoginSuccess(demoUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#292B29]/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border-2 border-[#D6B889]/40 relative">
        {/* Header */}
        <div className="p-6 bg-[#253B32] text-[#F5F0E7] flex items-center justify-between border-b border-[#D6B889]/30">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#F5F0E7]">
              Masuk / Log In
            </h3>
            <p className="text-xs text-[#D6B889] mt-0.5">
              Sukaregang Discovery & Syakira Leather
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1C2C25] hover:bg-[#A66D43] flex items-center justify-center text-[#F5F0E7] transition"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Role Tabs */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-[#F5F0E7] rounded-xl border border-[#D6B889]/30">
            <button
              type="button"
              onClick={() => {
                setRole('admin');
                setName('Alya Alifia (Admin)');
                setEmail('admin@syakiraleather.com');
              }}
              className={`py-2 text-xs font-bold rounded-lg transition ${
                role === 'admin'
                  ? 'bg-[#253B32] text-[#F5F0E7] shadow'
                  : 'text-[#292B29]/70 hover:text-[#253B32]'
              }`}
            >
              👑 Admin Pengelola Toko
            </button>
            <button
              type="button"
              onClick={() => {
                setRole('member');
                setName('Alya Alifia (Member)');
                setEmail('member@sukaregang.id');
              }}
              className={`py-2 text-xs font-bold rounded-lg transition ${
                role === 'member'
                  ? 'bg-[#253B32] text-[#F5F0E7] shadow'
                  : 'text-[#292B29]/70 hover:text-[#253B32]'
              }`}
            >
              👤 Pengunjung / Member
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="text-xs font-bold text-[#253B32] block mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-2.5 rounded-xl border border-[#D6B889]/40 bg-[#F5F0E7]/40 text-xs text-[#292B29] focus:outline-none focus:border-[#253B32]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#253B32] block mb-1">
                Alamat Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2.5 rounded-xl border border-[#D6B889]/40 bg-[#F5F0E7]/40 text-xs text-[#292B29] focus:outline-none focus:border-[#253B32]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#253B32] block mb-1">
                Kata Sandi
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2.5 rounded-xl border border-[#D6B889]/40 bg-[#F5F0E7]/40 text-xs text-[#292B29] focus:outline-none focus:border-[#253B32]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#253B32] hover:bg-[#1C2C25] text-[#F5F0E7] font-bold text-xs rounded-xl transition shadow mt-2"
            >
              Masuk Sekarang
            </button>
          </form>

          {/* Quick 1-Click Demo Login */}
          <div className="pt-3 border-t border-[#ECE3D4] text-center space-y-2">
            <span className="text-[11px] text-[#292B29]/60 block">
              Atau masuk instan dengan satu klik (Demo Mode):
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('admin')}
                className="py-2 px-3 bg-[#F5F0E7] hover:bg-[#D6B889]/40 text-[#253B32] font-semibold text-xs rounded-xl border border-[#D6B889]/40 transition"
              >
                ⚡ Masuk Sebagai Admin
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('member')}
                className="py-2 px-3 bg-[#F5F0E7] hover:bg-[#D6B889]/40 text-[#253B32] font-semibold text-xs rounded-xl border border-[#D6B889]/40 transition"
              >
                ⚡ Masuk Sebagai Member
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
