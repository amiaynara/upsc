import React from 'react';
import { Layout, Menu, Typography, Button } from 'antd';
import { 
  HomeOutlined, 
  GlobalOutlined,
  MenuOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './MainLayout.css';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: 'Home',
    },
    {
      key: '/current-affairs',
      icon: <GlobalOutlined />,
      label: 'Calendar',
    }
  ];

  const handleMenuClick = ({ key }) => {
    navigate(key);
    setMobileMenuVisible(false);
  };

  const getSelectedKey = () => {
    return location.pathname;
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header 
        style={{ 
          background: '#fff', 
          padding: '0 1rem',
          boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          height: 'auto',
          lineHeight: 'normal'
        }}
      >
        <div className="header-content" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          height: '100%',
          padding: '0.5rem 0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Title 
              level={4} 
              style={{ 
                margin: 0, 
                color: '#1890ff',
                cursor: 'pointer',
                fontWeight: 300,
                fontSize: 'clamp(1rem, 4vw, 1.25rem)'
              }}
              onClick={() => navigate('/')}
            >
              Daily Affairs
            </Title>
          </div>
          
          {/* Desktop Menu */}
          <div className="desktop-menu">
            <Menu
              mode="horizontal"
              selectedKeys={[getSelectedKey()]}
              items={menuItems}
              onClick={handleMenuClick}
              style={{ 
                border: 'none',
                background: 'transparent',
                flex: 1,
                justifyContent: 'center'
              }}
            />
          </div>

          {/* Mobile Menu Button */}
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
            className="mobile-menu-button"
            style={{ 
              border: 'none',
              padding: '4px 8px'
            }}
          />
        </div>

        {/* Mobile Menu */}
        {mobileMenuVisible && (
          <div className="mobile-menu">
            <Menu
              mode="vertical"
              selectedKeys={[getSelectedKey()]}
              items={menuItems}
              onClick={handleMenuClick}
              style={{ 
                border: 'none',
                background: 'transparent'
              }}
            />
          </div>
        )}
      </Header>

      <Content style={{ background: '#fafafa' }}>
        {children}
      </Content>

      <Footer style={{ 
        textAlign: 'center', 
        background: '#001529',
        color: '#fff',
        padding: '1rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ color: '#999', fontSize: '0.9rem', margin: 0 }}>
            Created with ❤️ by Amiay
          </p>
        </div>
      </Footer>
    </Layout>
  );
};

export default MainLayout; 