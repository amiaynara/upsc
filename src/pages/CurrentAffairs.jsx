import React, { useState } from 'react';
import { Calendar, List, Typography, Space, Card, Row, Col } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const CurrentAffairs = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const months = [
    { name: 'January', link: 'https://example.com/january' },
    { name: 'February', link: 'https://example.com/february' },
    { name: 'March', link: 'https://example.com/march' },
    { name: 'April', link: 'https://example.com/april' },
    { name: 'May', link: 'https://example.com/may' },
    { name: 'June', link: 'https://example.com/june' },
    { name: 'July', link: 'https://example.com/july' },
    { name: 'August', link: 'https://example.com/august' },
    { name: 'September', link: 'https://example.com/september' },
    { name: 'October', link: 'https://example.com/october' },
    { name: 'November', link: 'https://example.com/november' },
    { name: 'December', link: 'https://example.com/december' }
  ];

  const handleMonthClick = (month) => {
    if (month.link.startsWith('http')) {
      window.open(month.link, '_blank');
    } else {
      navigate(month.link);
    }
  };

  const handleDateSelect = (date, info) => {
    setSelectedDate(date);
    if (info.source === 'date') {
      // Navigate to daily affairs page with selected date
      navigate(`/daily-affairs/${date.format('YYYY-MM-DD')}`);
    }
  };


  return (
    <div style={{ 
      padding: '1rem', 
      maxWidth: '1200px', 
      margin: '0 auto',
      minHeight: 'calc(100vh - 120px)', // Account for header and footer
    }}>
      <Row gutter={[24, 24]}>
        {/* Calendar Section */}
        <Col xs={24} lg={16}>
          <Card style={{ width: '100%' }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Title level={3} style={{ margin: 0, textAlign: 'center' }}>
                <CalendarOutlined /> Select Date
              </Title>
              <Calendar
                value={selectedDate}
                onSelect={handleDateSelect}
                fullscreen={false}
                style={{ width: '100%' }}
              />
            </Space>
          </Card>
        </Col>

        {/* Months Column */}
        <Col xs={24} lg={8}>
          <Card style={{ width: '100%' }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Title level={3} style={{ margin: 0, textAlign: 'center' }}>Monthly Archives</Title>
              <List
                dataSource={months}
                renderItem={(month) => (
                  <List.Item
                    style={{
                      cursor: 'pointer',
                      padding: '0.5rem',
                      borderRadius: '4px',
                      transition: 'background-color 0.2s',
                      border: 'none',
                      marginBottom: '4px'
                    }}
                    onClick={() => handleMonthClick(month)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f5f5f5';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <Text style={{ 
                      fontSize: '1rem',
                      width: '100%',
                      textAlign: 'center'
                    }}>
                      {month.name}
                    </Text>
                  </List.Item>
                )}
              />
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CurrentAffairs;
