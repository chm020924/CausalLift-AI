
import React, { useState } from 'react';
import { explainCausalMethod } from '../services/geminiService';
import ReactMarkdown from 'https://esm.sh/react-markdown@9';

const InterviewHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'S' | 'T' | 'X' | 'DR'>('X');
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const methods = {
    'S': 'S-Learner (Single)',
    'T': 'T-Learner (Two)',
    'X': 'X-Learner (Cross)',
    'DR': 'DR-Learner (Doubly Robust)'
  };

  const handleFetch = async (m: 'S' | 'T' | 'X' | 'DR') => {
    setActiveTab(m);
    setLoading(true);
    const res = await explainCausalMethod(methods[m]);
    setContent(res || '');
    setLoading(false);
  };

  // Initial fetch
  React.useEffect(() => {
    handleFetch('X');
  }, []);

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-2xl text-white">
        <h3 className="text-2xl font-bold mb-2">Causal Inference Interview Vault</h3>
        <p className="text-blue-100 opacity-90 max-w-2xl">
          Master the technical rounds at ByteDance, Meituan, and Alibaba. 
          Understand the "why" behind the algorithms and how to explain them to hiring managers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-2">
          {Object.entries(methods).map(([key, label]) => (
            <button
              key={key}
              onClick={() => handleFetch(key as any)}
              className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${
                activeTab === key 
                  ? 'bg-white border-blue-500 text-blue-600 shadow-md ring-1 ring-blue-500' 
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              <p className="text-xs font-bold opacity-50 uppercase">{key} LEARNER</p>
              <p className="font-semibold">{label.split(' ')[0]}</p>
            </button>
          ))}
          
          <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-100">
            <h4 className="text-amber-800 font-bold text-sm mb-2">Interview Prep Tip</h4>
            <p className="text-xs text-amber-700 leading-normal">
              When asked about ROI, always distinguish between "Observed ROI" and "Causal (Incremental) ROI". Companies care about the latter.
            </p>
          </div>
        </div>

        <div className="lg:col-span-3 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm min-h-[500px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <p className="mt-4 text-slate-500 font-medium">Synthesizing causal knowledge...</p>
            </div>
          ) : (
            <div className="prose prose-slate max-w-none">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewHub;
