import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import CurrentAffairs from './pages/CurrentAffairs';
import DailyAffairs from './pages/DailyAffairs';
import './App.css';

// Import Ant Design CSS
import 'antd/dist/reset.css';

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 6,
        },
      }}
    >
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/current-affairs" element={<CurrentAffairs />} />
            <Route path="/daily-affairs/:date" element={<DailyAffairs />} />
          </Routes>
        </MainLayout>
      </Router>
    </ConfigProvider>
  );
};

export default App; 