# Source Architecture & Design Patterns

## Overview

This application uses a robust OOP-based design pattern to handle multiple current affairs sources with different URL patterns and requirements. The architecture is built using the **Strategy Pattern** combined with the **Factory Pattern** for maximum flexibility and maintainability.

## Design Patterns Used

### 1. Strategy Pattern
- **Purpose**: Handle different URL generation logic for each source
- **Implementation**: `SourceStrategy` base class with concrete implementations for each source
- **Benefits**: 
  - Easy to add new sources without modifying existing code
  - Each source can have its own URL generation logic
  - Supports multiple URLs per source

### 2. Factory Pattern
- **Purpose**: Manage and create source strategy instances
- **Implementation**: `SourceFactory` class that registers and manages all strategies
- **Benefits**:
  - Centralized strategy management
  - Easy to add/remove sources
  - Singleton pattern ensures consistent state

### 3. Service Layer Pattern
- **Purpose**: Provide a clean interface for source operations
- **Implementation**: `SourceService` class that acts as a facade
- **Benefits**:
  - Encapsulates complex logic
  - Provides error handling
  - Easy to test and maintain

## Architecture Structure

```
src/utils/sources/
├── SourceStrategy.js          # Base strategy interface
├── StudyIQStrategy.js         # Study IQ implementation
├── DrishtiIASStrategy.js      # Drishti IAS implementation
├── VisionIASStrategy.js       # Vision IAS implementation
├── InsightsIASStrategy.js     # Insights IAS implementation
├── SourceFactory.js           # Factory for managing strategies
├── SourceService.js           # Service layer
└── index.js                   # Clean exports
```

## How to Add a New Source

### Step 1: Create Strategy Class
```javascript
import { SourceStrategy } from './SourceStrategy';
import dayjs from 'dayjs';

export class NewSourceStrategy extends SourceStrategy {
  constructor() {
    super('New Source', 'https://newsource.com');
  }

  generateUrls(date, options = {}) {
    // Implement URL generation logic
    return [
      {
        url: `${this.baseUrl}/path/to/resource`,
        type: 'PDF', // or 'Web', 'Video'
        description: 'Resource description'
      }
    ];
  }

  isAvailable(date) {
    // Implement availability logic
    return true;
  }

  getMetadata() {
    return {
      name: this.name,
      type: 'Coaching', // or 'Newspaper', 'Government'
      description: 'Source description',
      color: '#1890ff',
      icon: '📚',
      reliability: 'high'
    };
  }
}
```

### Step 2: Register in Factory
```javascript
// In SourceFactory.js
import { NewSourceStrategy } from './NewSourceStrategy';

initializeStrategies() {
  // ... existing strategies
  this.registerStrategy('new-source', new NewSourceStrategy());
}
```

### Step 3: Done!
The new source will automatically appear in the application without any other code changes.

## URL Patterns Supported

### Study IQ
- **Pattern**: `https://www.studyiq.net/lecture_ppt/lesson187184/CAP-1--May---25--Merged_1746382929.pdf`
- **Features**: PDF downloads, timestamp-based URLs

### Drishti IAS
- **Pattern**: `https://www.drishtiias.com/pdf/1746091422.pdf`
- **Features**: Simple PDF URLs, timestamp-based

### Vision IAS
- **Pattern**: `https://www.visionias.in/resources/material/?id=4868&type=daily_current_affairs`
- **Features**: Web-based resources, query parameters

### Insights IAS
- **Pattern**: `https://www.insightsias.com/current-affairs/2024-01-15/daily-analysis`
- **Features**: Date-based URLs, multiple formats

## Benefits of This Architecture

### 1. **Extensibility**
- Add new sources without touching existing code
- Each source can have completely different URL patterns
- Support for multiple URLs per source

### 2. **Maintainability**
- Clear separation of concerns
- Easy to test individual components
- Centralized error handling

### 3. **Flexibility**
- Support for different URL types (PDF, Web, Video)
- Configurable options per source
- Date-based availability checking

### 4. **Scalability**
- Easy to add new features (caching, validation, etc.)
- Support for complex URL generation logic
- Future-proof for additional sources

## Usage Example

```javascript
import { sourceService } from '../utils/sources/SourceService';

// Get all sources for a date
const sources = await sourceService.getSourcesForDate('2024-01-15', {
  includeAnalysis: true,
  includeHindi: true,
  includePDF: true
});

// Get source statistics
const stats = sourceService.getSourceStatistics();

// Add a new source dynamically
sourceService.addSourceStrategy('custom-source', new CustomStrategy());
```

## Future Enhancements

1. **URL Validation**: Add HEAD requests to validate URL accessibility
2. **Caching**: Implement caching for frequently accessed sources
3. **Rate Limiting**: Add rate limiting for external API calls
4. **Analytics**: Track source usage and reliability
5. **Fallback URLs**: Implement fallback mechanisms for failed URLs

This architecture provides a solid foundation for handling complex source management requirements while maintaining code quality and extensibility. 