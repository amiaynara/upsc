/**
 * Base strategy interface for source URL generation
 * This follows the Strategy Pattern to handle different URL generation logic
 */
export class SourceStrategy {
  constructor(name, baseUrl) {
    this.name = name;
    this.baseUrl = baseUrl;
  }

  /**
   * Generate URL for a specific date
   * @param {string} date - Date in YYYY-MM-DD format
   * @param {Object} options - Additional options for URL generation
   * @returns {Array} Array of URLs for this source
   */
  generateUrls(date, options = {}) {
    throw new Error('generateUrls method must be implemented by subclass');
  }

  /**
   * Validate if the source is available for the given date
   * @param {string} date - Date in YYYY-MM-DD format
   * @returns {boolean} Whether the source is available
   */
  isAvailable(date) {
    throw new Error('isAvailable method must be implemented by subclass');
  }

  /**
   * Get source metadata
   * @returns {Object} Source metadata
   */
  getMetadata() {
    throw new Error('getMetadata method must be implemented by subclass');
  }
} 