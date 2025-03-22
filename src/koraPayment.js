/**
 * KoraPayment SDK
 * A simple wrapper for Kora's Checkout Standard payment gateway
 */

class KoraPayment {
  constructor(config = {}) {
    this.scriptLoaded = false;
    this.scriptSrc = "https://korablobstorage.blob.core.windows.net/modal-bucket/korapay-collections.min.js";
    this.config = config;
    
    this.initialize = this.initialize.bind(this);
    this.close = this.close.bind(this);
    this.loadScript = this.loadScript.bind(this);
  }

  /**
   * Loads the Kora payment script if not already loaded
   * @returns {Promise} - Resolves when script is loaded
   */
  loadScript() {
    return new Promise((resolve, reject) => {
      if (this.scriptLoaded || window.Korapay) {
        this.scriptLoaded = true;
        return resolve();
      }

      const script = document.createElement('script');
      script.src = this.scriptSrc;
      script.async = true;
      
      script.onload = () => {
        this.scriptLoaded = true;
        resolve();
      };
      
      script.onerror = () => {
        reject(new Error('Failed to load Kora Payment script'));
      };
      
      document.body.appendChild(script);
    });
  }

  /**
   * Initialize the payment gateway
   * @param {Object} options - Payment configuration options
   * @returns {Promise} - Resolves when initialized
   */
  async initialize(options = {}) {
    try {
      const paymentOptions = { ...this.config, ...options };
      
      this.validateOptions(paymentOptions);
      
      await this.loadScript();
      
      if (window.Korapay) {
        window.Korapay.initialize(paymentOptions);
        return true;
      }
      
      throw new Error('Kora Payment script loaded but Korapay object not found');
    } catch (error) {
      console.error('Failed to initialize Kora Payment:', error);
      throw error;
    }
  }

  /**
   * Validate required options for payment
   * @param {Object} options - Payment options to validate
   */
  validateOptions(options) {
    const requiredFields = ['key', 'reference', 'amount', 'customer'];
    const customerRequiredFields = ['name', 'email'];
    
    requiredFields.forEach(field => {
      if (!options[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    });
    
    if (options.customer) {
      customerRequiredFields.forEach(field => {
        if (!options.customer[field]) {
          throw new Error(`Missing required customer field: ${field}`);
        }
      });
    }
    
    if (options.amount && isNaN(parseFloat(options.amount))) {
      throw new Error('Amount must be a number');
    }
    
    if (options.metadata && typeof options.metadata === 'object') {
      const metadataKeys = Object.keys(options.metadata);
      if (metadataKeys.length > 5) {
        throw new Error('Metadata can have a maximum of 5 keys');
      }
      
      metadataKeys.forEach(key => {
        if (key.length > 20) {
          throw new Error(`Metadata key "${key}" exceeds maximum length of 20 characters`);
        }
        
        if (!/^[A-Za-z0-9\-]+$/.test(key)) {
          throw new Error(`Metadata key "${key}" contains invalid characters. Only A-Z, a-z, 0-9, and - are allowed`);
        }
      });
    }
  }

  /**
   * Close the payment modal programmatically
   */
  close() {
    if (this.scriptLoaded && window.Korapay) {
      window.Korapay.close();
      return true;
    }
    return false;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = KoraPayment;
}

export default KoraPayment;