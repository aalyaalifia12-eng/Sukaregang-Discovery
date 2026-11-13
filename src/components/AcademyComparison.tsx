import React from 'react';
import { LeatherMaterial } from '../types';

interface AcademyComparisonProps {
  materials: LeatherMaterial[];
}

export const AcademyComparison: React.FC<AcademyComparisonProps> = ({ materials }) => {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border-2 border-[#D6B889]/40 shadow-lg bg-white">
      <table className="w-full text-left text-xs border-collapse min-w-[700px]">
        <thead>
          <tr className="bg-[#253B32] text-[#F5F0E7] font-serif text-sm border-b border-[#D6B889]/30">
            <th className="py-4 px-4 font-semibold">Jenis Material</th>
            <th className="py-4 px-4 font-semibold">Tekstur Permukaan</th>
            <th className="py-4 px-4 font-semibold">Fleksibilitas</th>
            <th className="py-4 px-4 font-semibold">Ketebalan Relatif</th>
            <th className="py-4 px-4 font-semibold">Daya Tahan</th>
            <th className="py-4 px-4 font-semibold">Tingkat Perawatan</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#ECE3D4]">
          {materials.map((m) => (
            <tr key={m.id} className="hover:bg-[#F5F0E7]/40 transition">
              <td className="py-3.5 px-4 font-bold text-[#253B32]">
                {m.name}
              </td>
              <td className="py-3.5 px-4 text-[#292B29]/80">
                {m.comparison.texture}
              </td>
              <td className="py-3.5 px-4 font-medium text-[#253B32]">
                {m.comparison.flexibility}
              </td>
              <td className="py-3.5 px-4 text-[#292B29]/80">
                {m.comparison.thickness}
              </td>
              <td className="py-3.5 px-4 text-[#292B29]/80">
                {m.comparison.durability}
              </td>
              <td className="py-3.5 px-4 text-[#A66D43] font-medium">
                {m.comparison.maintenance}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-3 bg-[#F5F0E7] text-[11px] text-[#292B29]/70 border-t border-[#D6B889]/30">
        * Karakteristik material di atas dapat bervariasi bergantung pada proses penyamakan (tanning), teknik finishing, serta grading kualitas kulit.
      </div>
    </div>
  );
};
