
import React, { useState, useEffect } from 'react';
import { MOCK_UPLIFT_DATA } from '../constants';
import UpliftChart from '../components/UpliftChart';
import { getCausalInsights } from '../services/geminiService';
import ReactMarkdown from 'https://esm.sh/react-markdown@9';

const UpliftAnalysis: React.FC = () => {
  const [insights, setInsights] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      const res = await getCausalInsights(MOCK_UPLIFT_DATA);
      setInsights(res || '');
      setLoading(false);
    };
    fetchInsights();
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <UpliftChart data={MOCK_UPLIFT_DATA} />
          
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">Heterogeneous Treatment Effects (HTE)</h3>
            <div className="grid grid-cols-2 gap-4">
              {MOCK_UPLIFT_DATA.map(item => (
                <div key={item.segment} className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{item.segment}</p>
                  <p className="text-xl font-bold mt-1" style={{ color: item.color }}>
                    {(item.uplift * 100).toFixed(1)}%
                    <span className="text-xs ml-1 text-slate-500 font-normal">Uplift</span>
                  </p>
                  <div className="mt-2 text-[10px] text-slate-500 leading-tight">
                    Treat CR: {(item.conversionRateTreatment * 100).toFixed(0)}% | 
                    Ctrl CR: {(item.conversionRateControl * 100).toFixed(0)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <i className="fa-solid fa-sparkles text-blue-400 text-xl animate-pulse"></i>
          </div>
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            AI Causal Strategist Insights
          </h3>
          
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-slate-500 text-sm italic">Gemini is analyzing causal relationships...</p>
            </div>
          ) : (
            <div className="prose prose-slate prose-sm max-w-none prose-headings:mb-2 prose-p:mb-3">
              <ReactMarkdown>{insights}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpliftAnalysis;
