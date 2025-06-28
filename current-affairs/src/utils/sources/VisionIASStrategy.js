import { SourceStrategy } from './SourceStrategy';
import dayjs from 'dayjs';

/**
 * Vision IAS source strategy
 * URL pattern: https://www.visionias.in/resources/material/?id=4868&type=daily_current_affairs
 */
export class VisionIASStrategy extends SourceStrategy {
  constructor() {
    super('Vision IAS', 'https://www.visionias.in');
  }
  generateUrls(date, options = {}) {
    const dateObj = dayjs(date);
    const month = dateObj.format('MM');
    const year = dateObj.format('YYYY');
    
    // Construct the monthly page URL
    const monthlyPageUrl = `${this.baseUrl}/resources/daily_current_affairs_programs.php?type=1&m=${month}&y=${year}`;
    
    return [
      {
        url: monthlyPageUrl,
        type: 'WEB',
        description: 'Daily Current Affairs Monthly Page'
      }
    ];
  }

  isAvailable(date) {
    // Vision IAS typically has content available for recent dates
    const dateObj = dayjs(date);
    const today = dayjs();
    const daysDiff = today.diff(dateObj, 'day');
    
    // Available for last 90 days
    return daysDiff >= 0 && daysDiff <= 90;
  }

  getMetadata() {
    return {
      name: this.name,
      type: 'Coaching',
      description: 'Structured current affairs analysis by Vision IAS',
      color: '#fa8c16',
      icon: '👁️',
      reliability: 'high'
    };
  }
} 