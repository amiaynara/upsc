import { sourceFactory } from './SourceFactory';

/**
 * Service class for handling source operations
 * This acts as a facade for the strategy and factory patterns
 */
export class SourceService {
  constructor() {
    this.factory = sourceFactory;
  }

  /**
   * Get all sources for a specific date
   * @param {string} date - Date in YYYY-MM-DD format
   * @param {Object} options - Additional options for URL generation
   * @returns {Array} Array of source objects with URLs
   */
  async getSourcesForDate(date, options = {}) {
    try {
      const availableStrategies = this.factory.getAvailableStrategiesForDate(date);
      const sources = [];

      for (const strategyKey of availableStrategies) {
        const strategy = this.factory.getStrategy(strategyKey);
        const metadata = strategy.getMetadata();
        const urls = strategy.generateUrls(date, options);

        // Create source object for each URL
        urls.forEach((urlData, index) => {
          sources.push({
            id: `${strategyKey}-${index}`,
            title: metadata.name,
            description: metadata.description,
            source: metadata.name,
            type: metadata.type,
            pdfUrl: urlData.url,
            urlType: urlData.type,
            urlDescription: urlData.description,
            size: this.estimateFileSize(urlData.type),
            pages: this.estimatePages(urlData.type),
            metadata: {
              ...metadata,
              strategyKey,
              urlIndex: index
            }
          });
        });
      }

      return sources;
    } catch (error) {
      console.error('Error getting sources for date:', error);
      throw error;
    }
  }

  /**
   * Get all available source metadata
   * @returns {Array} Array of source metadata
   */
  getAllSourceMetadata() {
    return this.factory.getAllMetadata();
  }

  /**
   * Get sources by type
   * @param {string} type - Source type (e.g., 'Coaching', 'Newspaper')
   * @returns {Array} Array of source metadata
   */
  getSourcesByType(type) {
    const allMetadata = this.getAllSourceMetadata();
    return allMetadata.filter(source => source.type === type);
  }

  /**
   * Validate URL accessibility (placeholder for future implementation)
   * @param {string} url - URL to validate
   * @returns {Promise<boolean>} Whether URL is accessible
   */
  async validateUrl(url) {
    // This would typically make a HEAD request to check if URL is accessible
    // For now, return true as placeholder
    return true;
  }

  /**
   * Estimate file size based on URL type
   * @param {string} urlType - Type of URL (PDF, Web, etc.)
   * @returns {string} Estimated file size
   */
  estimateFileSize(urlType) {
    const sizeMap = {
      'PDF': '2.5 MB',
      'Web': 'N/A',
      'Video': '15 MB'
    };
    return sizeMap[urlType] || 'Unknown';
  }

  /**
   * Estimate number of pages based on URL type
   * @param {string} urlType - Type of URL (PDF, Web, etc.)
   * @returns {number} Estimated number of pages
   */
  estimatePages(urlType) {
    const pageMap = {
      'PDF': 15,
      'Web': 1,
      'Video': 0
    };
    return pageMap[urlType] || 0;
  }

  /**
   * Add a new source strategy
   * @param {string} key - Strategy key
   * @param {SourceStrategy} strategy - Strategy instance
   */
  addSourceStrategy(key, strategy) {
    this.factory.registerStrategy(key, strategy);
  }

  /**
   * Get source statistics
   * @returns {Object} Source statistics
   */
  getSourceStatistics() {
    const metadata = this.getAllSourceMetadata();
    const stats = {
      total: metadata.length,
      byType: {},
      byReliability: {}
    };

    metadata.forEach(source => {
      // Count by type
      stats.byType[source.type] = (stats.byType[source.type] || 0) + 1;
      
      // Count by reliability
      stats.byReliability[source.reliability] = (stats.byReliability[source.reliability] || 0) + 1;
    });

    return stats;
  }
}

// Export singleton instance
export const sourceService = new SourceService();
