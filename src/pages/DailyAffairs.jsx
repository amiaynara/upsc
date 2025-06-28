import React, { useState, useEffect } from 'react';
import { 
  Row, 
  Col, 
  Typography, 
  Space, 
  Button,
  Spin,
  Empty,
  Alert
} from 'antd';
import { 
  CalendarOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import SourceCard from '../components/SourceCard';
import { formatDate } from '../utils/helpers';
import { sourceService } from '../utils/sources/SourceService';

const { Text } = Typography;

const DailyAffairs = () => {
  const { date } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [sources, setSources] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSources = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Get sources with additional options
        const sourcesData = await sourceService.getSourcesForDate(date, {
          includeAnalysis: true,
          includeHindi: true,
          includePDF: true
        });
        
        setSources(sourcesData);
      } catch (err) {
        console.error('Error fetching sources:', err);
        setError('Failed to load sources. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchSources();
  }, [date]);

  const handleSourceClick = (source) => {
    // Open the URL in a new tab
    window.open(source.pdfUrl, '_blank');
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh',
        padding: '1rem'
      }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ 
      padding: 'clamp(0.5rem, 2vw, 1rem)', 
      maxWidth: '1200px', 
      margin: '0 auto',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <div style={{ 
        marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
        position: 'sticky',
        top: 0,
        backgroundColor: 'white',
        zIndex: 10,
        padding: 'clamp(0.25rem, 1vw, 0.5rem) 0',
        borderRadius: '8px'
      }}>
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/current-affairs')}
          style={{ 
            marginBottom: 'clamp(0.5rem, 2vw, 1rem)',
            fontSize: 'clamp(0.8rem, 2.5vw, 1rem)',
            height: 'auto',
            padding: 'clamp(0.3rem, 1.5vw, 0.5rem) clamp(0.5rem, 2vw, 1rem)'
          }}
          type="text"
        >
          Back
        </Button>
        
        <div style={{ textAlign: 'center' }}>
          <Space align="center" direction="vertical" size="small">
            <CalendarOutlined style={{ 
              color: '#666', 
              fontSize: 'clamp(1.2rem, 4vw, 1.5rem)' 
            }} />
            <Text style={{ 
              fontSize: 'clamp(1rem, 3vw, 1.2rem)', 
              color: '#666',
              fontWeight: 500,
              lineHeight: 1.2
            }}>
              {formatDate(date)}
            </Text>
          </Space>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          style={{ 
            marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
            borderRadius: '8px'
          }}
        />
      )}

      {/* Sources Grid */}
      {sources.length > 0 ? (
        <Row gutter={[16, 16]}>
          {sources.map((source) => (
            <Col 
              xs={24} 
              sm={12} 
              md={8} 
              lg={6} 
              xl={6} 
              key={source.id}
              style={{ marginBottom: '1rem' }}
            >
              <SourceCard 
                source={source} 
                onSourceClick={handleSourceClick}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <Empty
          description="No sources available for this date"
          style={{ 
            marginTop: 'clamp(2rem, 6vw, 3rem)',
            padding: 'clamp(1rem, 3vw, 2rem) clamp(0.5rem, 2vw, 1rem)'
          }}
        />
      )}
    </div>
  );
};

export default DailyAffairs;