import { StudyIQStrategy } from './StudyIQStrategy';
import { DrishtiIASStrategy } from './DrishtiIASStrategy';
import { VisionIASStrategy } from './VisionIASStrategy';

/**
 * Factory class for creating source strategies
 * This follows the Factory Pattern to manage different source strategies
 */
export class SourceFactory {
  constructor() {
    this.strategies = new Map();
    this.initializeStrategies();
  }

  /**
   * Initialize all available strategies
   */
  initializeStrategies() {
    this.registerStrategy('study-iq', new StudyIQStrategy());
    this.registerStrategy('drishti-ias', new DrishtiIASStrategy());
    this.registerStrategy('vision-ias', new VisionIASStrategy());
  }

  /**
   * Register a new strategy
   * @param {string} key - Strategy key
   * @param {SourceStrategy} strategy - Strategy instance
   */
  registerStrategy(key, strategy) {
    this.strategies.set(key, strategy);
  }

  /**
   * Get a strategy by key
   * @param {string} key - Strategy key
   * @returns {SourceStrategy} Strategy instance
   */
  getStrategy(key) {
    const strategy = this.strategies.get(key);
    if (!strategy) {
      throw new Error(`Strategy not found for key: ${key}`);
    }
    return strategy;
  }

  /**
   * Get all available strategies
   * @returns {Array} Array of strategy keys
   */
  getAvailableStrategies() {
    return Array.from(this.strategies.keys());
  }

  /**
   * Get all strategy metadata
   * @returns {Array} Array of strategy metadata
   */
  getAllMetadata() {
    const metadata = [];
    for (const [key, strategy] of this.strategies) {
      metadata.push({
        key,
        ...strategy.getMetadata()
      });
    }
    return metadata;
  }

  /**
   * Get strategies available for a specific date
   * @param {string} date - Date in YYYY-MM-DD format
   * @returns {Array} Array of available strategy keys
   */
  getAvailableStrategiesForDate(date) {
    const available = [];
    for (const [key, strategy] of this.strategies) {
      if (strategy.isAvailable(date)) {
        available.push(key);
      }
    }
    return available;
  }
}

// Export singleton instance
export const sourceFactory = new SourceFactory(); 