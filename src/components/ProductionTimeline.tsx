import React, { useState } from 'react';
import { ProductionStep } from '../types';

interface ProductionTimelineProps {
  steps: ProductionStep[];
}

export const ProductionTimeline: React.FC<ProductionTimelineProps> = ({ steps }) => {
  const [activeStep, setActiveStep] = useState(1);
  const current = steps.find((s) => s.step === activeStep) || steps[0];

  return (
    <div className="space-y-8">
      {/* Step Selector Horizontal Bar */}
      <div className="flex overflow-x-auto pb-2 gap-2 justify-between">
        {steps.map((st) => (
          <button
            key={st.step}
            onClick={() => setActiveStep(st.step)}
            className={`flex-1 min-w-[120px] p-3 rounded-xl border text-center transition flex flex-col items-center space-y-1 ${
              activeStep === st.step
                ? 'bg-[#253B32] text-[#F5F0E7] border-[#D6B889] shadow-md'
                : 'bg-white text-[#292B29]/70 border-[#D6B889]/30 hover:bg-[#F5F0E7]'
            }`}
          >
            <span className={`text-[11px] font-bold uppercase tracking-wider ${
              activeStep === st.step ? 'text-[#D6B889]' : 'text-[#A66D43]'
            }`}>
              Tahap 0{st.step}
            </span>
            <span className="text-xs font-medium truncate w-full">
              {st.title.split(' ')[0]} {st.title.split(' ')[1]}
            </span>
          </button>
        ))}
      </div>

      {/* Active Step Detailed Showcase */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-[#D6B889]/40 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Image Box */}
        <div className="relative rounded-2xl overflow-hidden bg-[#15211C] border border-[#D6B889]/30 shadow-lg h-72 md:h-96">
          <img
            src={current.imageUrl}
            alt={current.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-[#253B32]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[#D6B889] font-bold text-xs border border-[#D6B889]/40">
            Tahap 0{current.step} dari 0{steps.length}
          </div>
        </div>

        {/* Content Box */}
        <div className="space-y-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#A66D43]">
              Alur Kerajinan Kulit Sukaregang
            </span>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#253B32] mt-1">
              {current.title}
            </h3>
            <h5 className="text-sm font-semibold text-[#BFA06F] mt-1">
              {current.subtitle}
            </h5>
          </div>

          <p className="text-sm text-[#292B29]/80 leading-relaxed">
            {current.description}
          </p>

          {/* Key Tools */}
          <div className="bg-[#F5F0E7] p-4 rounded-xl border border-[#D6B889]/40">
            <h6 className="text-xs font-bold uppercase tracking-wider text-[#253B32] mb-2 flex items-center space-x-1.5">
              <span>🔧 Peralatan & Instrumen Utama:</span>
            </h6>
            <div className="flex flex-wrap gap-1.5">
              {current.keyTools.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-white rounded-lg text-xs font-medium text-[#292B29]/80 border border-[#D6B889]/30"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Artisan Insight Quote */}
          <div className="border-l-4 border-[#A66D43] pl-4 py-1 italic text-xs text-[#292B29]/80">
            "{current.artisanInsight}"
          </div>

          {/* Stepper Navigation Buttons */}
          <div className="flex justify-between pt-4 border-t border-[#ECE3D4]">
            <button
              disabled={activeStep === 1}
              onClick={() => setActiveStep((s) => Math.max(1, s - 1))}
              className="px-4 py-2 rounded-xl border border-[#253B32] text-[#253B32] hover:bg-[#253B32] hover:text-[#F5F0E7] text-xs font-semibold disabled:opacity-30 disabled:pointer-events-none transition flex items-center space-x-1"
            >
              <span>← Tahap Sebelumnya</span>
            </button>
            <button
              disabled={activeStep === steps.length}
              onClick={() => setActiveStep((s) => Math.min(steps.length, s + 1))}
              className="px-4 py-2 rounded-xl bg-[#253B32] hover:bg-[#1C2C25] text-[#F5F0E7] text-xs font-semibold disabled:opacity-30 disabled:pointer-events-none transition flex items-center space-x-1"
            >
              <span>Tahap Berikutnya →</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
