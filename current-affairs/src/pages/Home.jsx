import React from 'react';
import { Button, Typography, Space } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const { Title } = Typography;

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/current-affairs');
  };

  return (
    <div className="home">
      <div className="home-content">
        <Space direction="vertical" size="large" align="center">
          <Title 
            level={1} 
            style={{ 
              color: 'white', 
              textAlign: 'center', 
              fontWeight: 300,
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              margin: 0,
              lineHeight: 1.2
            }}
          >
            Daily Affairs
          </Title>
          
          <Button
            type="primary"
            size="large"
            icon={<GlobalOutlined />}
            onClick={handleGetStarted}
            style={{
              height: 'clamp(50px, 8vw, 60px)',
              width: 'clamp(180px, 50vw, 200px)',
              fontSize: 'clamp(1rem, 3vw, 1.2rem)',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
            }}
          >
            Start
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default Home; 