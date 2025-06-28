import { SourceStrategy } from './SourceStrategy';
import dayjs from 'dayjs';

/**
 * Study IQ source strategy
 * URL pattern: https://www.studyiq.net/lecture_ppt/lesson187184/CAP-1--May---25--Merged_1746382929.pdf
 */
export class StudyIQStrategy extends SourceStrategy {
  constructor() {
    super('Study IQ', 'https://www.studyiq.net');
  }

  generateUrls(date, options = {}) {
    // we can point this to a location (file) which will have the links for each day
    // this list will be prepared by scraping the website
    // this fille could be on s3
    // or we may have this in the database (as of now this seems like an overkill)

    const urls = [
      {
        url: 'https://www.studyiq.com/articles/ca-category/upsc-daily-current-affairs-pdf-in-english/',
        type: 'WEB',
        description: 'Daily Current Affairs Articles'
      }
    ];

    return urls;
  }

  isAvailable(date) {
    // Study IQ typically has content available for recent dates
    const dateObj = dayjs(date);
    const today = dayjs();
    const daysDiff = today.diff(dateObj, 'day');
    
    // Available for last 30 days
    return daysDiff >= 0 && daysDiff <= 30;
  }

  getMetadata() {
    return {
      name: this.name,
      type: 'Coaching',
      description: 'Comprehensive current affairs from Study IQ',
      color: '#1890ff',
      icon: '📚',
      reliability: 'high'
    };
  }
} 