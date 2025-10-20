# WebCake Data - Usage Examples

This file contains comprehensive usage examples for the WebCake Data library.

## Basic Setup

```javascript
import { DBConnection } from 'webcake-data';

// Initialize connection
const db = new DBConnection({
  baseURL: 'https://api.webcake.com/api/v1',
  siteId: 'your-site-id',
  token: 'your-auth-token'
});

// Create models
const User = db.model('users');
const Post = db.model('posts');
const Comment = db.model('comments');
```

## CRUD Operations

### Create Operations

```javascript
// Create a single user
const user = await User.create({
  name: 'John Doe',
  email: 'john@example.com',
  age: 30,
  active: true,
  metadata: { role: 'admin' }
});

// Create multiple users
const users = await User.insertMany([
  { name: 'Jane Smith', email: 'jane@example.com', age: 25, active: true },
  { name: 'Bob Johnson', email: 'bob@example.com', age: 35, active: false },
  { name: 'Alice Brown', email: 'alice@example.com', age: 28, active: true }
]);
```

### Read Operations

```javascript
// Find all active users
const activeUsers = await User.find({ active: true }).exec();

// Find one user by email
const user = await User.findOne({ email: 'john@example.com' });

// Find user by ID
const userById = await User.findById('user-uuid-here');

// Count users
const userCount = await User.countDocuments({ active: true });

// Check if user exists
const userExists = await User.exists({ email: 'john@example.com' });
```

### Update Operations

```javascript
// Update one user
await User.updateOne(
  { email: 'john@example.com' },
  { age: 31, metadata: { role: 'superadmin' } }
);

// Update user by ID
await User.findByIdAndUpdate(
  'user-uuid-here',
  { age: 32 },
  { new: true } // Return updated document
);

// Update multiple users
await User.updateMany(
  { active: false },
  { active: true }
);
```

### Delete Operations

```javascript
// Delete one user
await User.deleteOne({ email: 'john@example.com' });

// Delete user by ID
await User.findByIdAndDelete('user-uuid-here');

// Delete multiple users
await User.deleteMany({ active: false });
```

## Advanced Querying

### Query Builder Examples

```javascript
// Simple where conditions
const users = await User.find()
  .where('active', true)
  .where('age', '$gte', 25)
  .exec();

// Comparison operators
const youngUsers = await User.find()
  .gte('age', 18)
  .lt('age', 30)
  .exec();

const specificUsers = await User.find()
  .in('name', ['John', 'Jane', 'Bob'])
  .nin('status', ['banned', 'suspended'])
  .ne('email', 'admin@example.com')
  .exec();

// Pattern matching
const gmailUsers = await User.find()
  .like('email', '%@gmail.com')
  .exec();

// Range queries
const usersInRange = await User.find()
  .between('age', 25, 40)
  .exec();

// Sorting and pagination
const paginatedUsers = await User.find()
  .sort({ age: -1, name: 1 })
  .limit(10)
  .skip(20)
  .exec();

// Field selection
const userNames = await User.find()
  .select('name email')
  .exec();
```

### Complex Queries

```javascript
// Complex multi-condition query
const complexQuery = await User.find()
  .where('active', true)
  .gte('age', 25)
  .lte('age', 40)
  .in('role', ['admin', 'moderator'])
  .like('email', '%@company.com')
  .sort({ created_at: -1 })
  .limit(50)
  .skip(0)
  .select('name email role created_at')
  .exec();

// Chained conditions
const chainedQuery = await User.find()
  .where('status').ne('inactive')
  .where('age').gte(21)
  .where('verified', true)
  .exec();
```

## Population (Joins)

```javascript
// Simple population
const usersWithPosts = await User.find()
  .populate({
    field: 'posts',
    table: 'posts',
    referenceField: 'user_id',
    select: 'title content created_at'
  })
  .exec();

// Complex population with conditions
const usersWithRecentPosts = await User.find()
  .populate({
    field: 'posts',
    table: 'posts',
    referenceField: 'user_id',
    select: 'title content',
    where: 'published = true AND created_at > NOW() - INTERVAL 7 DAY',
    sort: 'created_at DESC',
    limit: 5,
    justOne: false
  })
  .exec();

// Multiple populations
const usersWithPostsAndComments = await User.find()
  .populate({
    field: 'posts',
    table: 'posts',
    referenceField: 'user_id',
    select: 'title content'
  })
  .populate({
    field: 'comments',
    table: 'comments',
    referenceField: 'user_id',
    select: 'content created_at',
    limit: 10
  })
  .exec();
```

## Error Handling

```javascript
try {
  const user = await User.create({
    name: 'John Doe',
    email: 'john@example.com'
  });
  console.log('User created:', user);
} catch (error) {
  console.error('Failed to create user:', error.message);
  // Handle specific error types
  if (error.message.includes('duplicate')) {
    console.log('User already exists');
  }
}

// Batch operation error handling
try {
  await User.insertMany([
    { name: 'User 1', email: 'user1@example.com' },
    { name: 'User 2', email: 'user2@example.com' }
  ]);
} catch (error) {
  console.error('Batch insert failed:', error.message);
}
```

## Real-world Examples

### User Management System

```javascript
class UserService {
  constructor(db) {
    this.User = db.model('users');
  }

  async createUser(userData) {
    return await this.User.create({
      ...userData,
      created_at: new Date(),
      active: true
    });
  }

  async getActiveUsers(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return await this.User.find({ active: true })
      .sort({ created_at: -1 })
      .limit(limit)
      .skip(skip)
      .exec();
  }

  async searchUsers(searchTerm) {
    return await this.User.find()
      .or([
        { name: { $like: `%${searchTerm}%` } },
        { email: { $like: `%${searchTerm}%` } }
      ])
      .exec();
  }

  async getUserWithPosts(userId) {
    return await this.User.findById(userId)
      .populate({
        field: 'posts',
        table: 'posts',
        referenceField: 'user_id',
        select: 'title content created_at',
        sort: 'created_at DESC'
      })
      .exec();
  }

  async deactivateUser(userId) {
    return await this.User.findByIdAndUpdate(
      userId,
      { active: false, deactivated_at: new Date() },
      { new: true }
    );
  }
}

// Usage
const userService = new UserService(db);
const users = await userService.getActiveUsers(1, 20);
```

### Blog System

```javascript
class BlogService {
  constructor(db) {
    this.Post = db.model('posts');
    this.Comment = db.model('comments');
    this.User = db.model('users');
  }

  async createPost(postData, userId) {
    return await this.Post.create({
      ...postData,
      user_id: userId,
      published: false,
      created_at: new Date()
    });
  }

  async getPublishedPosts(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return await this.Post.find({ published: true })
      .populate({
        field: 'author',
        table: 'users',
        referenceField: 'user_id',
        select: 'name email'
      })
      .sort({ published_at: -1 })
      .limit(limit)
      .skip(skip)
      .exec();
  }

  async getPostWithComments(postId) {
    return await this.Post.findById(postId)
      .populate({
        field: 'author',
        table: 'users',
        referenceField: 'user_id',
        select: 'name email'
      })
      .populate({
        field: 'comments',
        table: 'comments',
        referenceField: 'post_id',
        select: 'content created_at',
        sort: 'created_at ASC'
      })
      .exec();
  }

  async publishPost(postId) {
    return await this.Post.findByIdAndUpdate(
      postId,
      { 
        published: true, 
        published_at: new Date() 
      },
      { new: true }
    );
  }

  async getPostsByCategory(category, limit = 10) {
    return await this.Post.find({ 
      category: category,
      published: true 
    })
      .sort({ published_at: -1 })
      .limit(limit)
      .exec();
  }
}
```

### Analytics Dashboard

```javascript
class AnalyticsService {
  constructor(db) {
    this.User = db.model('users');
    this.Post = db.model('posts');
    this.Comment = db.model('comments');
  }

  async getUserStats() {
    const totalUsers = await this.User.countDocuments();
    const activeUsers = await this.User.countDocuments({ active: true });
    const newUsersThisMonth = await this.User.countDocuments({
      created_at: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }
    });

    return {
      total: totalUsers,
      active: activeUsers,
      newThisMonth: newUsersThisMonth,
      inactive: totalUsers - activeUsers
    };
  }

  async getPostStats() {
    const totalPosts = await this.Post.countDocuments();
    const publishedPosts = await this.Post.countDocuments({ published: true });
    const draftPosts = totalPosts - publishedPosts;

    return {
      total: totalPosts,
      published: publishedPosts,
      drafts: draftPosts
    };
  }

  async getTopAuthors(limit = 10) {
    return await this.User.find({ active: true })
      .populate({
        field: 'posts',
        table: 'posts',
        referenceField: 'user_id',
        select: 'id',
        where: 'published = true'
      })
      .sort({ 'posts_count': -1 })
      .limit(limit)
      .exec();
  }
}
```

## Performance Tips

```javascript
// Use select to limit fields
const userNames = await User.find({ active: true })
  .select('name email')
  .exec();

// Use limit for pagination
const users = await User.find({ active: true })
  .limit(20)
  .skip(40)
  .exec();

// Use indexes in your queries
const recentUsers = await User.find({ 
  created_at: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
})
  .sort({ created_at: -1 })
  .exec();

// Batch operations when possible
await User.insertMany(usersArray);
await User.updateMany({ active: false }, { active: true });
```

## Testing Examples

```javascript
// Mock for testing
class MockDBConnection {
  constructor() {
    this.data = new Map();
  }

  model(collectionName) {
    return new MockDBModel(collectionName, this);
  }
}

class MockDBModel {
  constructor(collectionName, mockDb) {
    this.collectionName = collectionName;
    this.mockDb = mockDb;
  }

  async create(data) {
    const id = Math.random().toString(36);
    const record = { id, ...data };
    this.mockDb.data.set(`${this.collectionName}:${id}`, record);
    return record;
  }

  async findOne(filters) {
    for (const [key, value] of this.mockDb.data) {
      if (key.startsWith(`${this.collectionName}:`)) {
        const record = value;
        if (this.matchesFilters(record, filters)) {
          return record;
        }
      }
    }
    return null;
  }

  matchesFilters(record, filters) {
    return Object.keys(filters).every(key => 
      record[key] === filters[key]
    );
  }
}

// Test example
const mockDb = new MockDBConnection();
const User = mockDb.model('users');

const user = await User.create({ name: 'Test User', email: 'test@example.com' });
const foundUser = await User.findOne({ email: 'test@example.com' });
console.log(foundUser); // { id: '...', name: 'Test User', email: 'test@example.com' }
```
