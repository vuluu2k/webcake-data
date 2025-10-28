# WebCake Data

A modern JavaScript/TypeScript client library for WebCake database operations with MongoDB-like query interface.

## Features

- 🚀 **Modern ES6+ Module Support** - Works with both Node.js and browsers
- 🔍 **MongoDB-like Query Interface** - Familiar query syntax for easy adoption
- 🎯 **TypeScript Support** - Full TypeScript definitions included
- 🌐 **Browser & Node.js Compatible** - Works everywhere JavaScript runs
- 📦 **Zero Dependencies** - Lightweight with no external dependencies
- 🔗 **Fluent API** - Chainable query builder for complex operations
- ⚡ **Minified Builds** - Optimized and compressed for production use

## Installation

```bash
npm install webcake-data
```

## Quick Start

### ES6 Modules

```javascript
import { DBConnection } from 'webcake-data';

// Initialize connection
const db = new DBConnection({
  baseURL: 'https://api.webcake.com/api/v1',
  siteId: 'your-site-id',
  token: 'your-auth-token',
  headers: {
    'x-cms-api-key': 'your-api-key' // For API permission checking
  }
});

// Create a model
const User = db.model('users');

// Create a user
const user = await User.create({
  name: 'John Doe',
  email: 'john@example.com',
  age: 30,
  active: true
});

// Find users
const users = await User.find({ active: true }).exec();
```

### CommonJS (Node.js)

```javascript
const { DBConnection } = require('webcake-data');
```

### Browser (Global)

Using CDN (Unpkg or JSDelivr):

```html
<!-- Minified version (recommended for production) -->
<script src="https://unpkg.com/webcake-data@latest/dist/webcake-data.umd.min.js"></script>
<script>
  const db = new WebCakeData.DBConnection({
    baseURL: '/api/v1',
    siteId: 'your-site-id',
    headers: {
      'x-cms-api-key': 'your-api-key' // For API permission checking
    }
  });
</script>
```

Using JSDelivr:

```html
<script src="https://cdn.jsdelivr.net/npm/webcake-data@latest/dist/webcake-data.umd.min.js"></script>
```

## API Reference

### DBConnection

Main connection class for database operations.

#### Constructor

```javascript
new DBConnection(config)
```

**Parameters:**
- `config.baseURL` (string, optional): API base URL
- `config.siteId` (string, optional): Site ID (auto-detected from DOM if not provided)
- `config.token` (string, optional): Authentication token
- `config.headers` (object, optional): Additional headers
- `config.headers['x-cms-api-key']` (string, optional): API key for permission checking

**Example:**
```javascript
const db = new DBConnection({
  baseURL: 'https://api.webcake.com/api/v1',
  siteId: 'your-site-id',
  token: 'your-auth-token',
  headers: {
    'x-cms-api-key': 'your-api-key' // For API permission checking
  }
});
```

#### Methods

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

### DBModel

Model class for collection operations.

#### Methods

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

### QueryBuilder

Fluent query builder for complex database queries.

#### Methods

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

## Usage Examples

### Basic CRUD Operations

```javascript
import { DBConnection } from 'webcake-data';

const db = new DBConnection({
  baseURL: 'https://api.webcake.com/api/v1',
  siteId: 'your-site-id',
  token: 'your-auth-token',
  headers: {
    'x-cms-api-key': 'your-api-key' // For API permission checking
  }
});

const User = db.model('users');

// Create
const user = await User.create({
  name: 'John Doe',
  email: 'john@example.com',
  age: 30,
  active: true
});

// Read
const users = await User.find({ active: true }).exec();
const user = await User.findOne({ email: 'john@example.com' });
const userById = await User.findById('user-id');

// Update
await User.updateOne(
  { email: 'john@example.com' },
  { age: 31, active: false }
);

await User.findByIdAndUpdate('user-id', { age: 32 }, { new: true });

// Delete
await User.deleteOne({ email: 'john@example.com' });
await User.findByIdAndDelete('user-id');
```

### Advanced Queries

```javascript
// Complex query with multiple conditions
const results = await User.find()
  .where('age').gte(25).lte(40)
  .where('active', true)
  .in('name', ['John', 'Jane', 'Bob'])
  .like('email', '%@example.com')
  .sort({ age: -1, name: 1 })
  .limit(20)
  .skip(10)
  .select('name email age')
  .exec();

// Population (joins)
const usersWithPosts = await User.find()
  .populate({
    field: 'posts',
    table: 'posts',
    referenceField: 'user_id',
    select: 'title content',
    where: 'published = true',
    sort: 'created_at DESC',
    limit: 5
  })
  .exec();

// Count and exists
const activeUserCount = await User.countDocuments({ active: true });
const userExists = await User.exists({ email: 'john@example.com' });
```

### Batch Operations

```javascript
// Insert multiple records
await User.insertMany([
  { name: 'Jane', email: 'jane@example.com', age: 25, active: true },
  { name: 'Bob', email: 'bob@example.com', age: 35, active: false }
]);

// Update multiple records
await User.updateMany({ active: false }, { active: true });

// Delete multiple records
await User.deleteMany({ active: false });
```

### Error Handling

```javascript
try {
  const user = await User.create({
    name: 'John Doe',
    email: 'john@example.com'
  });
} catch (error) {
  console.error('Failed to create user:', error.message);
}
```

## TypeScript Support

The library includes full TypeScript definitions:

```typescript
import { DBConnection, DBModel, QueryBuilder } from 'webcake-data';

interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  active: boolean;
}

const db = new DBConnection({
  baseURL: 'https://api.webcake.com/api/v1',
  siteId: 'your-site-id',
  headers: {
    'x-cms-api-key': 'your-api-key' // For API permission checking
  }
});

const UserModel: DBModel = db.model<User>('users');
```

## Browser Integration

The library automatically detects the site ID from DOM attributes:

```html
<html x:id="your-site-id" x:env="production">
  <!-- Your content -->
</html>
```

Or you can provide it explicitly:

```javascript
const db = new DBConnection({
  siteId: 'your-site-id'
});
```

## Development

### Building the Library

The library uses [Rollup](https://rollupjs.org/) for bundling and minification. Build scripts are available:

```bash
# Build minified and unminified versions for all formats
npm run build

# Production build with optimizations
npm run build:prod
```

Build outputs are generated in the `dist/` directory:

- `webcake-data.esm.min.js` - ES Module (minified, ~7.4KB)
- `webcake-data.umd.min.js` - UMD format (minified, ~7.6KB) - for browsers
- `webcake-data.esm.js` - ES Module (unminified)
- `webcake-data.umd.js` - UMD format (unminified)

### File Sizes

The minified builds are optimized for production use:

- **ESM Minified**: ~7.4KB
- **UMD Minified**: ~7.6KB (includes browser global export)

### Minification Details

The library is minified using [Terser](https://github.com/terser/terser) with the following optimizations:

- Variable name mangling
- Dead code elimination
- Whitespace and comment removal
- Property access optimization
- 2-pass compression for maximum size reduction

### Contributing

To contribute to the library:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes and add tests
4. Run the build: `npm run build`
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue on [GitHub](https://github.com/vuluu2k/webcake-data/issues).
