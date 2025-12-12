# WebCake Data - Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.7] - 2025-12-12

### Added
- `domain` configuration option to `DBConnection` to support custom API domains
- Automatic injection of `x-article-id` and `x-product-id` headers when `window.store_post` or `window.store_product` are present
- Updated documentation to reflect new configuration options

## [1.0.6] - 2025-01-XX

### Enhanced
- Enhanced TypeScript definitions for better type safety and IntelliSense support
- Added `DBConnectionHeaders` interface with specific header properties for better autocomplete
- Improved type definitions for `PopulateConfig` to make `table` and `referenceField` optional for more flexible usage

### Changed
- `DBConnectionConfig.headers` now uses `DBConnectionHeaders` interface instead of generic `Record<string, string>`
- `DBConnection.headers` property now has explicit type `DBConnectionHeaders` for better type checking
- `PopulateConfig.table` and `PopulateConfig.referenceField` are now optional to support more flexible populate configurations

### Added
- TypeScript autocomplete support for common headers:
  - `Content-Type`
  - `Authorization`
  - `x-cms-api-key`
  - `x-article-id`
  - `x-product-id`
- Index signature in `DBConnectionHeaders` to allow custom headers while maintaining type safety

## [1.0.5] - 2025-11-13

### Added
- `DBModel.findOne()` and `DBModel.findById()` now accept options for `select`, `sort`, and `populate` to match QueryBuilder capabilities

## [1.0.4] - 2025-11-13

### Added
- Automatically include `x-article-id` header when `window.store_post.viewPost.id` is available
- Automatically include `x-product-id` header when `window.store_product.viewProduct.id` is available

### Changed
- Guard browser-specific headers during `DBConnection` initialization to ensure window dependencies are optional

## [1.0.3] - 2024-11-03


### Enhanced
- Enhanced `QueryBuilder.where()` method to support object-based filters
- Enhanced `populate()` method to support object-based `where` and `sort` parameters
- Improved API consistency between QueryBuilder and populate methods

### Changed
- `QueryBuilder.where()` now supports three calling patterns:
  - `where(filters)` - Pass an object with filter conditions
  - `where(field, value)` - Pass field and value (equals)
  - `where(field, operator, value)` - Pass field, operator, and value
- `populate()` now accepts `where` and `sort` as objects (like QueryBuilder) or strings
- Updated response handling in `updateOne`, `updateMany`, `deleteOne`, and `deleteMany` methods
- Added `window.DBConnection` global export for easier browser usage

### Fixed
- Fixed `DBModel.find()` to use object-based filter application
- Updated TypeScript definitions for better type safety

### Documentation
- Added comprehensive examples for new `where()` object syntax
- Updated all populate examples to use object-based `where` and `sort`
- Enhanced documentation with clearer examples

## [1.0.2] - 2024-01-XX

### Added
- Initial release of WebCake Data library

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
