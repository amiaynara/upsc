import React from 'react';
import { Typography, Space, Card, Row, Col, Button } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const { Title, Paragraph } = Typography;

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/current-affairs');
  };

  return (
    <div className="home">
      <div className="home-content">
        <Space direction="vertical" size="middle" align="center">
          <Title level={1} style={{ color: 'white', textAlign: 'center', marginBottom: '1rem' }}>
            Daily Affairs
          </Title>
          <Paragraph style={{ color: 'white', fontSize: '1.1rem', textAlign: 'center', opacity: 0.9, marginBottom: '2rem' }}>
            Stay updated with the latest news and events for UPSC preparation
          </Paragraph>
          
          <Button
            type="primary"
            size="large"
            icon={<GlobalOutlined />}
            onClick={handleGetStarted}
            style={{
              height: '50px',
              width: '180px',
              fontSize: '1.1rem',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              marginBottom: '2rem'
            }}
          >
            Get Started
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default Home;
