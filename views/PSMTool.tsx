
import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceArea } from 'recharts';

type PSModel = 'Logistic Regression' | 'Random Forest' | 'XGBoost';
type MatchingMethod = 'Nearest Neighbor' | 'Radius Matching' | 'Kernel Matching';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xl ring-1 ring-black/5">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
          <i className="fa-solid fa-crosshairs text-blue-500 text-xs"></i>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Propensity Score: <span className="text-slate-900 ml-1 font-mono">{label}</span>
          </p>
        </div>
        <div className="space-y-2">
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex justify-between items-center gap-6">
              <div className="flex items-center gap-2">
                <div 
                  className="w-2.5 h-2.5 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-xs font-medium text-slate-600">{entry.name}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-bold text-slate-900 font-mono">
                  {entry.value.toFixed(4)}
                </span>
                <span className="text-[10px] text-slate-400 uppercase font-medium">Density</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const PSMTool: React.FC = () => {
  const [psModel, setPsModel] = useState<PSModel>('Logistic Regression');
  const [matchingMethod, setMatchingMethod] = useState<MatchingMethod>('Nearest Neighbor');
  const [caliper, setCaliper] = useState<number>(0.05);
  const [isCalculating, setIsCalculating] = useState(false);
  const [selectedScore, setSelectedScore] = useState<string | null>(null);

  // Mock data generation based on selected model
  const distributionData = useMemo(() => {
    const length = 50;
    const shift = psModel === 'Logistic Regression' ? 0.4 : psModel === 'Random Forest' ? 0.2 : 0.1;
    const spread = psModel === 'Logistic Regression' ? 0.08 : 0.05;

    return Array.from({ length }, (_, i) => {
      const x = i / (length - 1);
      const treatment = Math.exp(-Math.pow(x - (0.5 + shift / 2), 2) / spread);
      const control = Math.exp(-Math.pow(x - (0.5 - shift / 2), 2) / (spread * 1.2));
      return {
        score: x.toFixed(3),
        Treatment: treatment,
        Control: control,
      };
    });
  }, [psModel]);

  const handleCalculate = () => {
    setIsCalculating(true);
    setSelectedScore(null);
    setTimeout(() => setIsCalculating(false), 800);
  };

  const getMethodSummary = () => {
    switch (matchingMethod) {
      case 'Nearest Neighbor':
        return {
          title: "Nearest Neighbor (NN) Matching",
          desc: "Pairs each treatment unit with the control unit that has the closest propensity score.",
          params: `k=1, Caliper=${caliper}, Replacement=False`,
          pros: "Simple, easy to interpret, good for large samples.",
          cons: "Sensitive to the order of data if matching without replacement."
        };
      case 'Radius Matching':
        return {
          title: "Radius Matching",
          desc: "Matches each treatment unit with all control units within a predefined score distance (radius).",
          params: `Radius=${caliper * 2}`,
          pros: "Uses more information when many good matches are available.",
          cons: "Risk of poor matches if the radius is too large."
        };
      case 'Kernel Matching':
        return {
          title: "Kernel Matching",
          desc: "Uses a weighted average of all control group units to create a counterfactual for each treatment unit.",
          params: `Kernel=Gaussian, Bandwidth=0.06`,
          pros: "Low variance because it uses more data points.",
          cons: "Can be biased if many units are far from the treatment unit."
        };
    }
  };

  const summary = getMethodSummary();

  const handleChartClick = (data: any) => {
    if (data && data.activeLabel) {
      setSelectedScore(data.activeLabel);
    }
  };

  // Range bounds for selection highlighting
  const selectionRange = useMemo(() => {
    if (!selectedScore) return null;
    const scoreVal = parseFloat(selectedScore);
    const delta = 0.05;
    return {
      x1: (scoreVal - delta).toFixed(3),
      x2: (scoreVal + delta).toFixed(3)
    };
  }, [selectedScore]);

  return (
    <div className="space-y-6 pb-12">
      {/* Control Panel */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">PS Model</label>
            <select 
              value={psModel} 
              onChange={(e) => setPsModel(e.target.value as PSModel)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            >
              <option>Logistic Regression</option>
              <option>Random Forest</option>
              <option>XGBoost</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Matching Method</label>
            <select 
              value={matchingMethod} 
              onChange={(e) => setMatchingMethod(e.target.value as MatchingMethod)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            >
              <option>Nearest Neighbor</option>
              <option>Radius Matching</option>
              <option>Kernel Matching</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase flex justify-between">
              Caliper <span>{caliper}</span>
            </label>
            <input 
              type="range" 
              min="0.01" 
              max="0.2" 
              step="0.01" 
              value={caliper} 
              onChange={(e) => setCaliper(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
          <button 
            onClick={handleCalculate}
            disabled={isCalculating}
            className={`w-full py-2 rounded-lg font-semibold text-sm shadow-sm transition-all active:scale-[0.98] ${
              isCalculating ? 'bg-slate-100 text-slate-400' : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isCalculating ? <i className="fa-solid fa-spinner fa-spin mr-2"></i> : <i className="fa-solid fa-play mr-2"></i>}
            Run Estimation
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-slate-800">Common Support Visualization</h3>
              <p className="text-xs text-slate-400 mt-1 italic">Click the chart to inspect specific score segments</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                <span className="flex items-center gap-1"><i className="fa-solid fa-circle text-blue-500 text-[6px]"></i> T=1</span>
                <span className="flex items-center gap-1"><i className="fa-solid fa-circle text-slate-400 text-[6px]"></i> T=0</span>
              </div>
              {selectedScore && (
                <button 
                  onClick={() => setSelectedScore(null)}
                  className="text-[10px] text-blue-600 hover:text-blue-800 font-bold underline"
                >
                  Clear Selection
                </button>
              )}
            </div>
          </div>
          <div className="h-[350px] cursor-pointer">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart 
                data={distributionData} 
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                onClick={handleChartClick}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="score" 
                  fontSize={11} 
                  stroke="#64748b" 
                  axisLine={false} 
                  tickLine={false}
                  label={{ value: 'Propensity Score P(T=1|X)', position: 'insideBottom', offset: -10, fontSize: 10, fill: '#94a3b8' }}
                />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }} />
                <Legend verticalAlign="top" align="right" iconType="circle" height={36} />
                
                {selectionRange && (
                  <ReferenceArea 
                    x1={selectionRange.x1} 
                    x2={selectionRange.x2} 
                    fill="#3b82f6" 
                    fillOpacity={0.08} 
                    stroke="#3b82f6"
                    strokeOpacity={0.4}
                    strokeDasharray="3 3"
                  />
                )}

                <Area 
                  type="monotone" 
                  name="Treatment"
                  dataKey="Treatment" 
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={selectedScore ? 0.03 : 0.1} 
                  strokeWidth={2.5}
                  animationDuration={1500}
                />
                <Area 
                  type="monotone" 
                  name="Control"
                  dataKey="Control" 
                  stroke="#94a3b8" 
                  fill="#94a3b8" 
                  fillOpacity={selectedScore ? 0.03 : 0.1} 
                  strokeWidth={2.5}
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Algorithm Summary Section */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <i className="fa-solid fa-circle-info text-blue-500"></i>
            Algorithm Summary
          </h3>
          <div className="space-y-4 flex-1">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Selected Method</p>
              <p className="text-sm font-semibold text-slate-800 mt-1">{summary.title}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Mechanism</p>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{summary.desc}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 font-mono text-[10px] text-blue-700">
              <span className="font-bold text-slate-500 block mb-1">Active Parameters:</span>
              {summary.params}
            </div>
            <div className="grid grid-cols-2 gap-3 text-[10px]">
              <div className="p-2 bg-emerald-50 rounded border border-emerald-100 text-emerald-800">
                <span className="font-bold block mb-1 underline decoration-emerald-200">PROS</span>
                {summary.pros}
              </div>
              <div className="p-2 bg-red-50 rounded border border-red-100 text-red-800">
                <span className="font-bold block mb-1 underline decoration-red-200">CONS</span>
                {summary.cons}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Segment Inspector / Selected Range Stats */}
      {selectedScore && (
        <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg border border-blue-500 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex-1">
              <h4 className="text-xl font-bold flex items-center gap-2">
                <i className="fa-solid fa-magnifying-glass-chart"></i>
                Segment Inspection: PS Range {selectionRange?.x1} - {selectionRange?.x2}
              </h4>
              <p className="text-blue-100 text-sm mt-2">
                Showing statistics for users matched in this specific likelihood neighborhood. 
                Balancing check for covariates shows high overlap in this region.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 pr-4">
              <div className="text-center">
                <p className="text-xs font-bold text-blue-200 uppercase tracking-widest">Matched Pairs</p>
                <p className="text-3xl font-bold mt-1">1,245</p>
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-blue-200 uppercase tracking-widest">Local ATE</p>
                <p className="text-3xl font-bold mt-1">+8.2%</p>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-blue-500 grid grid-cols-1 md:grid-cols-4 gap-4">
             {[
               { name: "Avg Age", val: "34.2 vs 33.9" },
               { name: "Active Days", val: "12.5 vs 12.8" },
               { name: "Prior Spend", val: "¥450 vs ¥448" },
               { name: "Matched Bias", val: "< 0.001" }
             ].map(stat => (
               <div key={stat.name} className="bg-blue-700/50 p-3 rounded-lg border border-blue-400/30">
                 <p className="text-[10px] font-bold text-blue-200 uppercase">{stat.name}</p>
                 <p className="text-sm font-mono mt-1">{stat.val}</p>
               </div>
             ))}
          </div>
        </div>
      )}

      {/* Parameter Explanation Deep Dive Section */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
          <i className="fa-solid fa-book-open text-indigo-500"></i>
          Parameter Deep Dive & Impact Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">C</span>
              <h4 className="font-bold text-slate-700">Caliper (Tolerance)</h4>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              The maximum distance allowed between the Propensity Scores of treated and control units for a match to be valid.
            </p>
            <div className="bg-slate-50 p-3 rounded-lg text-[10px] space-y-2 border border-slate-100">
              <p><span className="font-bold text-blue-600">Lower:</span> Increases quality of matches (lower bias), but leads to more dropped units (higher sample loss).</p>
              <p><span className="font-bold text-slate-600">Higher:</span> Maximizes sample size, but risks matching "dissimilar" users, potentially introducing bias.</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">K</span>
              <h4 className="font-bold text-slate-700">Kernel (Weighting)</h4>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              A function that assigns weights to control group units. Closer units get exponentially higher weights than distant ones.
            </p>
            <div className="bg-slate-50 p-3 rounded-lg text-[10px] space-y-2 border border-slate-100">
              <p><span className="font-bold text-indigo-600">Epanechnikov:</span> Efficient kernel often used to minimize mean squared error in non-parametric estimation.</p>
              <p><span className="font-bold text-slate-600">Gaussian:</span> Uses all control units but gives negligible weight to those with large score differences.</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">B</span>
              <h4 className="font-bold text-slate-700">Bandwidth (Smoothness)</h4>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Specifically used in Kernel Matching. It determines how fast weights decrease as the score distance increases.
            </p>
            <div className="bg-slate-50 p-3 rounded-lg text-[10px] space-y-2 border border-slate-100">
              <p><span className="font-bold text-emerald-600">Narrower:</span> High sensitivity to local score differences. Low bias but high variance in the final estimate.</p>
              <p><span className="font-bold text-slate-600">Wider:</span> Smooths out differences. More robust but may overlook specific local selection biases.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm group hover:border-blue-200 transition-colors">
          <div className="flex justify-between items-start">
            <p className="text-xs font-bold text-slate-400 uppercase">SMD (Before)</p>
            <i className="fa-solid fa-triangle-exclamation text-amber-500 group-hover:scale-110 transition-transform"></i>
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">0.45</p>
          <div className="mt-3 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-amber-400 h-full w-[45%] transition-all duration-1000"></div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm group hover:border-emerald-200 transition-colors">
          <div className="flex justify-between items-start">
            <p className="text-xs font-bold text-slate-400 uppercase">SMD (After)</p>
            <i className="fa-solid fa-circle-check text-emerald-500 group-hover:scale-110 transition-transform"></i>
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">0.02</p>
          <div className="mt-3 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full w-[2%] transition-all duration-1000"></div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm group hover:border-slate-300 transition-colors">
          <div className="flex justify-between items-start">
            <p className="text-xs font-bold text-slate-400 uppercase">Sample Loss</p>
            <i className="fa-solid fa-user-minus text-slate-400 group-hover:scale-110 transition-transform"></i>
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2">12.4%</p>
          <p className="text-[10px] text-slate-500 mt-1 italic">Due to lack of common support</p>
        </div>
      </div>
    </div>
  );
};

export default PSMTool;
