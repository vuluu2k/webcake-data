/**
 * QueryBuilder class for building database queries
 * Provides a fluent interface for constructing complex database queries
 */
export class QueryBuilder {
  constructor(collectionName, apiClient) {
    this.collectionName = collectionName;
    this.apiClient = apiClient;
    this.filters = {};
    this.sortOptions = {};
    this.limitValue = null;
    this.skipValue = 0;
    this.selectFields = null;
    this.populateFields = [];
  }

  /**
   * Add a filter condition
   * @param {string} field - Field name
   * @param {string|*} operator - Operator or value (if only 2 args)
   * @param {*} value - Value (if 3 args)
   * @returns {QueryBuilder} This instance for chaining
   */
  where(field, operator, value) {
    if (arguments.length === 2) {
      // where(field, value) - equals
      this.filters[field] = { '$eq': operator };
    } else {
      // where(field, operator, value)
      this.filters[field] = { [operator]: value };
    }
    return this;
  }

  /**
   * Add equality filter
   * @param {string} field - Field name
   * @param {*} value - Value to match
   * @returns {QueryBuilder} This instance for chaining
   */
  eq(field, value) {
    this.filters[field] = { '$eq': value };
    return this;
  }

  /**
   * Add greater than filter
   * @param {string} field - Field name
   * @param {*} value - Value to compare
   * @returns {QueryBuilder} This instance for chaining
   */
  gt(field, value) {
    this.filters[field] = { '$gt': value };
    return this;
  }

  /**
   * Add greater than or equal filter
   * @param {string} field - Field name
   * @param {*} value - Value to compare
   * @returns {QueryBuilder} This instance for chaining
   */
  gte(field, value) {
    this.filters[field] = { '$gte': value };
    return this;
  }

  /**
   * Add less than filter
   * @param {string} field - Field name
   * @param {*} value - Value to compare
   * @returns {QueryBuilder} This instance for chaining
   */
  lt(field, value) {
    this.filters[field] = { '$lt': value };
    return this;
  }

  /**
   * Add less than or equal filter
   * @param {string} field - Field name
   * @param {*} value - Value to compare
   * @returns {QueryBuilder} This instance for chaining
   */
  lte(field, value) {
    this.filters[field] = { '$lte': value };
    return this;
  }

  /**
   * Add in filter
   * @param {string} field - Field name
   * @param {Array} values - Array of values
   * @returns {QueryBuilder} This instance for chaining
   */
  in(field, values) {
    this.filters[field] = { '$in': values };
    return this;
  }

  /**
   * Add not in filter
   * @param {string} field - Field name
   * @param {Array} values - Array of values
   * @returns {QueryBuilder} This instance for chaining
   */
  nin(field, values) {
    this.filters[field] = { '$nin': values };
    return this;
  }

  /**
   * Add not equal filter
   * @param {string} field - Field name
   * @param {*} value - Value to exclude
   * @returns {QueryBuilder} This instance for chaining
   */
  ne(field, value) {
    this.filters[field] = { '$ne': value };
    return this;
  }

  /**
   * Add between filter
   * @param {string} field - Field name
   * @param {*} value1 - Lower bound
   * @param {*} value2 - Upper bound
   * @returns {QueryBuilder} This instance for chaining
   */
  between(field, value1, value2) {
    this.filters[field] = { '$between': [value1, value2] };
    return this;
  }

  /**
   * Add like filter for pattern matching
   * @param {string} field - Field name
   * @param {string} pattern - Pattern to match
   * @returns {QueryBuilder} This instance for chaining
   */
  like(field, pattern) {
    this.filters[field] = { '$like': pattern };
    return this;
  }

  /**
   * Set sort options
   * @param {Object} sortObj - Sort object {field: 1|-1}
   * @returns {QueryBuilder} This instance for chaining
   */
  sort(sortObj) {
    this.sortOptions = sortObj;
    return this;
  }

  /**
   * Set limit
   * @param {number} n - Number of records to limit
   * @returns {QueryBuilder} This instance for chaining
   */
  limit(n) {
    this.limitValue = n;
    return this;
  }

  /**
   * Set skip
   * @param {number} n - Number of records to skip
   * @returns {QueryBuilder} This instance for chaining
   */
  skip(n) {
    this.skipValue = n;
    return this;
  }

  /**
   * Set select fields
   * @param {string|Array} fields - Fields to select
   * @returns {QueryBuilder} This instance for chaining
   */
  select(fields) {
    this.selectFields = fields;
    return this;
  }

  /**
   * Add populate configuration
   * @param {Object} config - Populate configuration
   * @param {string} config.field - Field to populate
   * @param {string} config.table - Table to populate from
   * @param {string} config.referenceField - Reference field
   * @param {string} [config.select=""] - Fields to select
   * @param {string} [config.where=""] - Where conditions
   * @param {string} [config.sort=""] - Sort options
   * @param {number|null} [config.limit=null] - Limit
   * @param {number} [config.skip=0] - Skip
   * @param {boolean} [config.justOne=false] - Return single record
   * @returns {QueryBuilder} This instance for chaining
   */
  populate({
    field,
    table,
    referenceField, 
    select = "", 
    where = "", 
    sort = "", 
    limit = null, 
    skip = 0,
    justOne = false
  }) {
    this.populateFields = this.populateFields.concat([{ 
      field, 
      table, 
      referenceField, 
      select, 
      where, 
      sort, 
      limit, 
      skip, 
      justOne 
    }]);
    return this;
  }

  /**
   * Execute the query
   * @returns {Promise<Array>} Query results
   */
  async exec() {
    const queryParams = {
      filters: this.filters,
      sort: this.sortOptions,
      limit: this.limitValue,
      skip: this.skipValue,
      select: this.selectFields,
      populate: this.populateFields
    };

    return await this.apiClient.query(this.collectionName, queryParams);
  }

  /**
   * Promise-like interface for chaining
   * @param {Function} resolve - Resolve callback
   * @param {Function} reject - Reject callback
   * @returns {Promise} Promise from exec()
   */
  then(resolve, reject) {
    return this.exec().then(resolve, reject);
  }
}
