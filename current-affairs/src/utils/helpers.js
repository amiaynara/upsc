import dayjs from 'dayjs';

// Date formatting utilities
export const formatDate = (dateString) => {
  return dayjs(dateString).format('DD MMMM YYYY');
};

export const formatDateShort = (dateString) => {
  return dayjs(dateString).format('DD MMM YYYY');
};

export const getCurrentDate = () => {
  return dayjs().format('YYYY-MM-DD');
};

// Source type color mapping
export const getSourceColor = (type) => {
  const colorMap = {
    'Newspaper': 'blue',
    'Government': 'green',
    'Coaching': 'orange',
    'default': 'default'
  };
  return colorMap[type] || colorMap.default;
};

// Generate years array for dropdown
export const generateYears = (count = 10) => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: count }, (_, i) => currentYear - i);
};

// Validate date format
export const isValidDate = (dateString) => {
  return dayjs(dateString, 'YYYY-MM-DD', true).isValid();
}; 