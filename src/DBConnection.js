import { DBModel } from './DBModel.js';

/**
 * DBConnection class for managing database connections and operations
 * Main entry point for database operations
 */
export class DBConnection {
  constructor(config = {}) {
    // Get siteId from DOM or config
    const siteId = config.siteId || this._getSiteIdFromDOM();
    
    this.baseURL = config.baseURL || `/api/v1/${siteId}`;
    this.siteId = siteId;
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': config.token ? `Bearer ${config.token}` : '',
      ...config.headers
    };
  }

  /**
   * Get site ID from DOM attributes
   * @private
   * @returns {string} Site ID
   */
  _getSiteIdFromDOM() {
    if (typeof document !== 'undefined') {
      return document.documentElement.getAttribute('x:id') || '';
    }
    return '';
  }

  /**
   * Create a model for a collection
   * @param {string} collectionName - Name of the collection
   * @returns {DBModel} Model instance
   */
  model(collectionName) {
    return new DBModel(collectionName, this);
  }

  /**
   * Insert one record
   * @param {string} tableName - Table name
   * @param {Array} fields - Fields array
   * @returns {Promise<Object>} Insert result
   */
  async insertOne(tableName, fields) {
    const fetchFn = async () => { 
      const response = await fetch(`${this.baseURL}/collections/${tableName}/records`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({ fields })
      });
  
      if (!response.ok) {
        throw new Error(`Failed to insert record: ${response.statusText}`);
      }
  
      return await response.json();
    };

    return await this.cleanFetch(fetchFn);
  }

  /**
   * Insert many records
   * @param {string} tableName - Table name
   * @param {Array} records - Records array
   * @returns {Promise<Object>} Insert result
   */
  async insertMany(tableName, records) {
    const fetchFn = async () => { 
      const response = await fetch(`${this.baseURL}/collections/${tableName}/records/bulk`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({ records })
      });
  
      if (!response.ok) {
        throw new Error(`Failed to insert records: ${response.statusText}`);
      }
  
      return await response.json();
    };

    return await this.cleanFetch(fetchFn);
  }

  /**
   * Query records
   * @param {string} tableName - Table name
   * @param {Object} queryParams - Query parameters
   * @returns {Promise<Array>} Query results
   */
  async query(tableName, queryParams) {
    const fetchFn = async () => { 
      const params = new URLSearchParams(this._buildQueryParams(queryParams));
  
      const response = await fetch(`${this.baseURL}/collections/${tableName}/records?${params}`, {
        headers: this.headers
      });
  
      if (!response.ok) {
        throw new Error(`Failed to query records: ${response.statusText}`);
      }
  
      return await response.json();
    };

    return await this.cleanFetch(fetchFn);
  }

  /**
   * Update record by ID
   * @param {string} tableName - Table name
   * @param {string} id - Record ID
   * @param {Array} fields - Fields array
   * @returns {Promise<Object>} Update result
   */
  async updateById(tableName, id, fields) {
    const fetchFn = async () => { 
      const response = await fetch(`${this.baseURL}/collections/${tableName}/records/${id}`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({ fields })
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update record: ${response.statusText}`);
      }
  
      return await response.json();
    };

    return await this.cleanFetch(fetchFn);
  }

  /**
   * Update one record
   * @param {string} tableName - Table name
   * @param {Object} filters - Filter conditions
   * @param {Array} fields - Fields array
   * @returns {Promise<Object>} Update result
   */
  async updateOne(tableName, filters, fields) {
    const fetchFn = async () => { 
      const response = await fetch(`${this.baseURL}/collections/${tableName}/records/update`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          filters,
          fields,
          limit: 1
        })
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update record: ${response.statusText}`);
      }
  
      return await response.json();
    };

    return await this.cleanFetch(fetchFn);
  }

  /**
   * Update many records
   * @param {string} tableName - Table name
   * @param {Object} filters - Filter conditions
   * @param {Array} fields - Fields array
   * @returns {Promise<Object>} Update result
   */
  async updateMany(tableName, filters, fields) {
    const fetchFn = async () => { 
      const response = await fetch(`${this.baseURL}/collections/${tableName}/records/update`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          filters,
          fields
        })
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update records: ${response.statusText}`);
      }
  
      return await response.json();
    };

    return await this.cleanFetch(fetchFn);
  }

  /**
   * Delete record by ID
   * @param {string} tableName - Table name
   * @param {string} id - Record ID
   * @returns {Promise<Object>} Delete result
   */
  async deleteById(tableName, id) {
    const fetchFn = async () => { 
      const response = await fetch(`${this.baseURL}/collections/${tableName}/records/${id}`, {
        method: 'DELETE',
        headers: this.headers
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete record: ${response.statusText}`);
      }
  
      return await response.json();
    };

    return await this.cleanFetch(fetchFn);
  }

  /**
   * Delete one record
   * @param {string} tableName - Table name
   * @param {Object} filters - Filter conditions
   * @returns {Promise<Object>} Delete result
   */
  async deleteOne(tableName, filters) {
    const fetchFn = async () => { 
      const response = await fetch(`${this.baseURL}/collections/${tableName}/records/delete`, {
        method: 'DELETE',
        headers: this.headers,
        body: JSON.stringify({
          filters,
          limit: 1
        })
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete record: ${response.statusText}`);
      }
  
      return await response.json();
    };

    return await this.cleanFetch(fetchFn);
  }

  /**
   * Delete many records
   * @param {string} tableName - Table name
   * @param {Object} filters - Filter conditions
   * @returns {Promise<Object>} Delete result
   */
  async deleteMany(tableName, filters) {
    const fetchFn = async () => { 
      const response = await fetch(`${this.baseURL}/collections/${tableName}/records/delete`, {
        method: 'DELETE',
        headers: this.headers,
        body: JSON.stringify({ filters })
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete records: ${response.statusText}`);
      }
  
      return await response.json();
    };

    return await this.cleanFetch(fetchFn);
  }

  /**
   * Count records
   * @param {string} tableName - Table name
   * @param {Object} filters - Filter conditions
   * @returns {Promise<Object>} Count result
   */
  async count(tableName, filters) {
    const fetchFn = async () => { 
      const params = new URLSearchParams({
        filters: JSON.stringify(filters)
      });
  
      const response = await fetch(`${this.baseURL}/collections/${tableName}/records/count?${params}`, {
        headers: this.headers
      });
  
      if (!response.ok) {
        throw new Error(`Failed to count records: ${response.statusText}`);
      }
  
      return await response.json();
    };

    return await this.cleanFetch(fetchFn);
  }

  /**
   * Check if record exists
   * @param {string} tableName - Table name
   * @param {Object} filters - Filter conditions
   * @returns {Promise<Object>} Exists result
   */
  async exists(tableName, filters) {
    const fetchFn = async () => {
      const params = new URLSearchParams({
        filters: JSON.stringify(filters)
      });
  
      const response = await fetch(`${this.baseURL}/collections/${tableName}/records/exists?${params}`, {
        headers: this.headers
      });
  
      if (!response.ok) {
        throw new Error(`Failed to check if record exists: ${response.statusText}`);
      }
  
      return await response.json();
    };

    return await this.cleanFetch(fetchFn);
  }

  /**
   * Build query parameters for URL
   * @private
   * @param {Object} queryParams - Query parameters
   * @returns {Object} Formatted parameters
   */
  _buildQueryParams(queryParams) {
    const params = {};

    if (queryParams.filters && Object.keys(queryParams.filters).length > 0) {
      params.filters = JSON.stringify(queryParams.filters);
    }

    if (queryParams.sort && Object.keys(queryParams.sort).length > 0) {
      params.sort = JSON.stringify(queryParams.sort);
    }

    if (queryParams.limit) {
      params.limit = queryParams.limit;
    }

    if (queryParams.skip) {
      params.skip = queryParams.skip;
    }

    if (queryParams.select) {
      params.select = JSON.stringify(queryParams.select);
    }

    if (queryParams.populate && queryParams.populate.length > 0) {
      params.populate = JSON.stringify(queryParams.populate);
    }

    return params;
  }

  /**
   * Clean fetch wrapper with error handling
   * @private
   * @param {Function} fetchFn - Fetch function
   * @returns {Promise<Object>} Cleaned response data
   */
  async cleanFetch(fetchFn) {
    try {
      const response = await fetchFn();
      if (!response.success) {
        throw new Error(response.message); 
      }
        
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
