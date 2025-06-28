import { SourceStrategy } from './SourceStrategy';
import dayjs from 'dayjs';

/**
 * Drishti IAS source strategy
 * URL pattern: https://www.drishtiias.com/pdf/1746091422.pdf
 */
export class DrishtiIASStrategy extends SourceStrategy {
  constructor() {
    super('Drishti IAS', 'https://www.drishtiias.com');
  }

  generateUrls(date, options = {}) {
    const dateObj = dayjs(date);
    
    // Format date as DD-MM-YYYY for Drishti IAS URL pattern
    const formattedDate = dateObj.format('DD-MM-YYYY');
    
    const urls = [
      {
        url: `${this.baseUrl}/current-affairs-news-analysis-editorials/news-analysis/${formattedDate}`,
        type: 'WEB',
        description: 'Daily Current Affairs News Analysis'
      }
    ];

    // // Add additional URLs if available
    // if (options.includeEditorials) {
    //   urls.push({
    //     url: `${this.baseUrl}/current-affairs-news-analysis-editorials/editorials/${formattedDate}`,
    //     type: 'WEB',
    //     description: 'Editorials'
    //   });
    // }

    // if (options.includeHindi) {
    //   urls.push({
    //     url: `${this.baseUrl}/current-affairs-news-analysis-editorials/hindi/${formattedDate}`,
    //     type: 'WEB',
    //     description: 'Hindi Version'
    //   });
    // }

    return urls;
  }

  isAvailable(date) {
    // Drishti IAS typically has content available for recent dates
    const dateObj = dayjs(date);
    const today = dayjs();
    const daysDiff = today.diff(dateObj, 'day');
    
    // Available for last 60 days
    return daysDiff >= 0 && daysDiff <= 60;
  }

  getMetadata() {
    return {
      name: this.name,
      type: 'Coaching',
      description: 'Daily current affairs compilation by Drishti IAS',
      color: '#52c41a',
      icon: '🎯',
      reliability: 'high'
    };
  }
} 