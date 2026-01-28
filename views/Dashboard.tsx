
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_UPLIFT_DATA, CAMPAIGN_HISTORY } from '../constants';

const StatsCard: React.FC<{ title: string; value: string; trend: number; icon: string }> = ({ title, value, trend, icon }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-slate-50 rounded-lg">
        <i className={`fa-solid ${icon} text-blue-600 text-xl`}></i>
      </div>
      <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend >= 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
        {trend >= 0 ? '+' : ''}{trend}%
      </span>
    </div>
    <h4 className="text-slate-500 text-sm font-medium">{title}</h4>
    <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
  </div>
);

const Dashboard: React.FC = () => {
  const trendData = [
    { name: 'Mon', revenue: 4000 },
    { name: 'Tue', revenue: 3000 },
    { name: 'Wed', revenue: 2000 },
    { name: 'Thu', revenue: 2780 },
    { name: 'Fri', revenue: 1890 },
    { name: 'Sat', revenue: 2390 },
    { name: 'Sun', revenue: 3490 },
  ];

  return (
    <div className="space-y-8">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Causal ROI" value="4.2x" trend={12} icon="fa-chart-pie" />
        <StatsCard title="Incremental GMV" value="¥1,240,500" trend={8.4} icon="fa-money-bill-trend-up" />
        <StatsCard title="Persuadables Found" value="12,450" trend={15.2} icon="fa-user-check" />
        <StatsCard title="Marketing Efficiency" value="88.5%" trend={-2.1} icon="fa-bolt" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800">Incremental Revenue Trend</h3>
            <select className="text-sm bg-slate-50 border-none rounded-md px-3 py-1 outline-none cursor-pointer">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Campaigns */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="font-bold text-slate-800 mb-6">Attribution History</h3>
          <div className="space-y-6 flex-1">
            {CAMPAIGN_HISTORY.map((campaign) => (
              <div key={campaign.id} className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-semibold text-slate-800">{campaign.name}</h4>
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                      {campaign.method}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{campaign.date}</p>
                  <div className="mt-2 flex items-center justify-between text-xs text-slate-600">
                    <span>ROI: <span className="font-bold text-slate-800">{campaign.roi}x</span></span>
                    <span>+{campaign.incrementalRevenue.toLocaleString()} CNY</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 text-sm text-blue-600 font-semibold hover:text-blue-700 w-full text-center">
            View All Experiments
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
