import React from 'react';
import { Card, Typography, Space, Tag, Button, Tooltip } from 'antd';
import { FilePdfOutlined, GlobalOutlined, VideoCameraOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { getSourceColor } from '../utils/helpers';

const { Title, Text } = Typography;

const SourceCard = ({ source, onSourceClick }) => {
  const handleCardClick = () => {
    if (onSourceClick) {
      onSourceClick(source);
    }
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
    if (onSourceClick) {
      onSourceClick(source);
    }
  };

  const getUrlIcon = (urlType) => {
    switch (urlType) {
      case 'PDF':
        return <FilePdfOutlined />;
      case 'Web':
      case 'WEB':
        return <GlobalOutlined />;
      case 'Video':
        return <PlayCircleOutlined />;
      default:
        return <FilePdfOutlined />;
    }
  };

  const getUrlTypeText = (urlType) => {
    switch (urlType) {
      case 'PDF':
        return 'View PDF';
      case 'Web':
      case 'WEB':
        return 'Visit Site';
      case 'Video':
        return 'Watch Video';
      default:
        return 'View';
    }
  };

  const getButtonStyle = (urlType) => {
    const baseStyle = {
      fontSize: '0.875rem',
      height: '36px',
      padding: '0 16px',
      borderRadius: '6px',
      fontWeight: 500,
      border: 'none',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      minWidth: '120px',
      justifyContent: 'center'
    };

    switch (urlType) {
      case 'PDF':
        return {
          ...baseStyle,
          backgroundColor: '#ff4d4f',
          color: 'white',
          ':hover': {
            backgroundColor: '#ff7875',
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 8px rgba(255,77,79,0.3)'
          }
        };
      case 'Web':
      case 'WEB':
        return {
          ...baseStyle,
          backgroundColor: '#1890ff',
          color: 'white',
          ':hover': {
            backgroundColor: '#40a9ff',
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 8px rgba(24,144,255,0.3)'
          }
        };
      case 'Video':
        return {
          ...baseStyle,
          backgroundColor: '#52c41a',
          color: 'white',
          ':hover': {
            backgroundColor: '#73d13d',
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 8px rgba(82,196,26,0.3)'
          }
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: '#722ed1',
          color: 'white',
          ':hover': {
            backgroundColor: '#9254de',
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 8px rgba(114,46,209,0.3)'
          }
        };
    }
  };

  return (
    <Card
      hoverable
      style={{ 
        height: '100%',
        border: '1px solid #f0f0f0',
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'all 0.3s ease'
      }}
      onClick={handleCardClick}
      bodyStyle={{ 
        padding: '20px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <span style={{ 
          fontSize: '2rem',
          display: 'block'
        }}>
          {source.metadata?.icon || '📄'}
        </span>
      </div>
      
      <Title 
        level={4} 
        style={{ 
          marginBottom: '8px', 
          textAlign: 'center',
          fontSize: '1.1rem',
          lineHeight: 1.3
        }}
      >
        {source.title}
      </Title>

      {/* URL Description */}
      {source.urlDescription && (
        <Text 
          type="secondary" 
          style={{ 
            display: 'block', 
            textAlign: 'center', 
            marginBottom: '16px',
            fontSize: '0.875rem',
            lineHeight: 1.4
          }}
        >
          {source.urlDescription}
        </Text>
      )}
      
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Tag color={getSourceColor(source.type)} style={{ marginBottom: '8px' }}>
            {source.type}
          </Tag>
          
          {/* URL Type Badge */}
          <Tag color={source.urlType === 'PDF' ? 'red' : source.urlType === 'Web' || source.urlType === 'WEB' ? 'blue' : 'green'}>
            {source.urlType}
          </Tag>
          
          <div>
            <Text type="secondary" style={{ 
              fontSize: '0.8rem',
              lineHeight: 1.3
            }}>
              {source.size !== 'N/A' ? `${source.size} • ${source.pages} pages` : 'Web Resource'}
            </Text>
          </div>
        </Space>
      </div>
      
      <div style={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 8px'
      }}>
        <Tooltip title={`Open ${source.urlType} resource`}>
          <Button 
            icon={getUrlIcon(source.urlType)}
            onClick={handleButtonClick}
            style={getButtonStyle(source.urlType)}
            onMouseEnter={(e) => {
              const style = getButtonStyle(source.urlType);
              e.target.style.backgroundColor = style[':hover'].backgroundColor;
              e.target.style.transform = style[':hover'].transform;
              e.target.style.boxShadow = style[':hover'].boxShadow;
            }}
            onMouseLeave={(e) => {
              const style = getButtonStyle(source.urlType);
              e.target.style.backgroundColor = style.backgroundColor;
              e.target.style.transform = 'none';
              e.target.style.boxShadow = style.boxShadow;
            }}
          >
            {getUrlTypeText(source.urlType)}
          </Button>
        </Tooltip>
      </div>

      {/* Reliability indicator */}
      {source.metadata?.reliability && (
        <div style={{ 
          position: 'absolute', 
          top: '8px', 
          right: '8px' 
        }}>
          <Tooltip title={`Reliability: ${source.metadata.reliability}`}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: source.metadata.reliability === 'high' ? '#52c41a' : '#faad14',
              border: '1px solid #fff'
            }} />
          </Tooltip>
        </div>
      )}
    </Card>
  );
};

export default SourceCard;
