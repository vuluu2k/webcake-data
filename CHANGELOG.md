# WebCake Data - Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-01-XX

### Added
- Initial release of WebCake Data library
- `DBConnection` class for managing database connections
- `DBModel` class for collection operations
- `QueryBuilder` class with fluent API for complex queries
- Full TypeScript support with type definitions
- ES6 module support for modern JavaScript environments
- Browser compatibility with global window object
- Comprehensive documentation and usage examples
- MIT license

### Features
- MongoDB-like query interface
- Fluent query builder with method chaining
- Support for all CRUD operations (Create, Read, Update, Delete)
- Advanced querying with comparison operators (eq, gt, gte, lt, lte, in, nin, ne, between, like)
- Population (join) functionality for related data
- Sorting, limiting, and pagination support
- Field selection for optimized queries
- Batch operations for multiple records
- Error handling with clean error messages
- Zero dependencies for lightweight integration

### API Methods

#### DBConnection
- `model(collectionName)` - Create a model for a collection
- `insertOne(tableName, fields)` - Insert a single record
- `insertMany(tableName, records)` - Insert multiple records
- `query(tableName, queryParams)` - Query records
- `updateById(tableName, id, fields)` - Update record by ID
- `updateOne(tableName, filters, fields)` - Update one record
- `updateMany(tableName, filters, fields)` - Update multiple records
- `deleteById(tableName, id)` - Delete record by ID
- `deleteOne(tableName, filters)` - Delete one record
- `deleteMany(tableName, filters)` - Delete multiple records
- `count(tableName, filters)` - Count records
- `exists(tableName, filters)` - Check if records exist

#### DBModel
- `create(data)` - Create a new document
- `insertMany(dataArray)` - Create multiple documents
- `find(filters)` - Find documents (returns QueryBuilder)
- `findOne(filters)` - Find one document
- `findById(id)` - Find document by ID
- `updateOne(filters, updateData)` - Update one document
- `findByIdAndUpdate(id, updateData, options)` - Update document by ID
- `findOneAndUpdate(filters, updateData)` - Find and update one document
- `updateMany(filters, updateData)` - Update multiple documents
- `deleteOne(filters)` - Delete one document
- `findByIdAndDelete(id)` - Delete document by ID
- `findOneAndDelete(filters)` - Find and delete one document
- `deleteMany(filters)` - Delete multiple documents
- `countDocuments(filters)` - Count documents
- `exists(filters)` - Check if documents exist

#### QueryBuilder
- `where(field, operator, value)` - Add filter condition
- `eq(field, value)` - Equality filter
- `gt(field, value)` - Greater than filter
- `gte(field, value)` - Greater than or equal filter
- `lt(field, value)` - Less than filter
- `lte(field, value)` - Less than or equal filter
- `in(field, values)` - In array filter
- `nin(field, values)` - Not in array filter
- `ne(field, value)` - Not equal filter
- `between(field, value1, value2)` - Between values filter
- `like(field, pattern)` - Pattern matching filter
- `sort(sortObj)` - Sort results
- `limit(n)` - Limit number of results
- `skip(n)` - Skip number of results
- `select(fields)` - Select specific fields
- `populate(config)` - Populate related data
- `exec()` - Execute query

### Installation
```bash
npm install webcake-data
```

### Usage
```javascript
import { DBConnection } from 'webcake-data';

const db = new DBConnection({
  baseURL: 'https://api.webcake.com/api/v1',
  siteId: 'your-site-id',
  token: 'your-auth-token'
});

const User = db.model('users');
const users = await User.find({ active: true }).exec();
```
