
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './views/Dashboard';
import UpliftAnalysis from './views/UpliftAnalysis';
import PSMTool from './views/PSMTool';
import InterviewHub from './views/InterviewHub';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/uplift" element={<UpliftAnalysis />} />
          <Route path="/psm" element={<PSMTool />} />
          <Route path="/roi" element={<div className="p-8 text-center text-slate-500">ROI Optimization module coming soon...</div>} />
          <Route path="/interview" element={<InterviewHub />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
