/**
 * WebCake Data - Database Client Library
 * A modern JavaScript/TypeScript client for WebCake database operations
 * 
 * @author vuluu2k
 * @version 1.0.0
 */

import { DBConnection } from './src/DBConnection.js';
import { DBModel } from './src/DBModel.js';
import { QueryBuilder } from './src/QueryBuilder.js';

// Main export
export { DBConnection, DBModel, QueryBuilder };

// Default export
export default DBConnection;

// Browser global (if not using modules)
if (typeof window !== 'undefined') {
  window.WebCakeData = {
    DBConnection,
    DBModel,
    QueryBuilder
  };
}
