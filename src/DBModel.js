import { QueryBuilder } from './QueryBuilder.js';

/**
 * DBModel class for database operations
 * Provides methods for CRUD operations on database collections
 */
export class DBModel {
  constructor(collectionName, apiClient) {
    this.collectionName = collectionName;
    this.apiClient = apiClient;
  }

  /**
   * Create a new document
   * @param {Object} data - Document data
   * @returns {Promise<Object>} Created document
   */
  async create(data) {
    const fields = this._prepareFields(data);
    return await this.apiClient.insertOne(this.collectionName, fields);
  }

  /**
   * Create multiple documents
   * @param {Array<Object>} dataArray - Array of document data
   * @returns {Promise<Array>} Created documents
   */
  async insertMany(dataArray) {
    const records = dataArray.map(data => this._prepareFields(data));
    return await this.apiClient.insertMany(this.collectionName, records);
  }

  /**
   * Find documents with optional filters
   * @param {Object} [filters={}] - Filter conditions
   * @returns {QueryBuilder} Query builder instance
   */
  find(filters = {}) {
    const query = new QueryBuilder(this.collectionName, this.apiClient);
    
    // Apply filters
    Object.keys(filters).forEach(key => {
      query.where(key, filters[key]);
    });
    
    return query;
  }

  /**
   * Find one document
   * @param {Object} [filters={}] - Filter conditions
   * @returns {Promise<Object|null>} Found document or null
   */
  async findOne(filters = {}) {
    const query = this.find(filters).limit(1);
    const results = await query.exec();
    return results[0] || null;
  }

  /**
   * Find document by ID
   * @param {string} id - Document ID
   * @returns {Promise<Object|null>} Found document or null
   */
  async findById(id) {
    return await this.findOne({ id });
  }

  /**
   * Update one document
   * @param {Object} filters - Filter conditions
   * @param {Object} updateData - Update data
   * @returns {Promise<Object>} Update result
   */
  async updateOne(filters, updateData) {
    const fields = this._prepareFields(updateData);
    const res = await this.apiClient.updateOne(this.collectionName, filters, fields);

    return {
      acknowledged: true,
      matchedCount: res.length,
      modifiedCount: res.length
    };
  }

  /**
   * Update document by ID
   * @param {string} id - Document ID
   * @param {Object} updateData - Update data
   * @param {Object} [options={}] - Update options
   * @param {boolean} [options.new=false] - Return updated document
   * @returns {Promise<Object>} Update result or updated document
   */
  async findByIdAndUpdate(id, updateData, options = {}) {
    const fields = this._prepareFields(updateData);
    const result = await this.apiClient.updateById(this.collectionName, id, fields);
    
    if (options.new) {
      return await this.findById(id);
    }
    return result;
  }

  /**
   * Find and update one document
   * @param {Object} filters - Filter conditions
   * @param {Object} updateData - Update data
   * @returns {Promise<Object>} Update result
   */
  async findOneAndUpdate(filters, updateData) {
    const fields = this._prepareFields(updateData);
    return await this.apiClient.updateOne(this.collectionName, filters, fields);
  }

  /**
   * Update many documents
   * @param {Object} filters - Filter conditions
   * @param {Object} updateData - Update data
   * @returns {Promise<Object>} Update result
   */
  async updateMany(filters, updateData) {
    const fields = this._prepareFields(updateData);
    const res = await this.apiClient.updateMany(this.collectionName, filters, fields);

    return {
      acknowledged: true,
      matchedCount: res.length,
      modifiedCount: res.length
    };
  }

  /**
   * Delete one document
   * @param {Object} filters - Filter conditions
   * @returns {Promise<Object>} Delete result
   */
  async deleteOne(filters) {
    const res = await this.apiClient.deleteOne(this.collectionName, filters);

    return {
      acknowledged: true,
      deletedCount: res.length
    };
  }

  /**
   * Delete document by ID
   * @param {string} id - Document ID
   * @returns {Promise<Object>} Delete result
   */
  async findByIdAndDelete(id) {
    return await this.apiClient.deleteById(this.collectionName, id);
  }

  /**
   * Find and delete one document
   * @param {Object} filters - Filter conditions
   * @returns {Promise<Object>} Delete result
   */
  async findOneAndDelete(filters) {
    return await this.apiClient.deleteOne(this.collectionName, filters);
  }

  /**
   * Delete many documents
   * @param {Object} filters - Filter conditions
   * @returns {Promise<Object>} Delete result
   */
  async deleteMany(filters) {
    const res = await this.apiClient.deleteMany(this.collectionName, filters);

    return {
      acknowledged: true,
      deletedCount: res.length
    };
  }

  /**
   * Count documents
   * @param {Object} [filters={}] - Filter conditions
   * @returns {Promise<number>} Document count
   */
  async countDocuments(filters = {}) {
    const res = await this.apiClient.count(this.collectionName, filters);
    return res.count;
  }

  /**
   * Check if document exists
   * @param {Object} filters - Filter conditions
   * @returns {Promise<boolean>} Existence check result
   */
  async exists(filters) {
    const res = await this.apiClient.exists(this.collectionName, filters);
    return res.exists;
  }

  /**
   * Prepare fields for API request
   * @private
   * @param {Object} data - Raw data object
   * @returns {Array} Formatted fields array
   */
  _prepareFields(data) {
    return Object.keys(data).map(key => ({
      field_name: key,
      field_value: data[key]
    }));
  }
}
