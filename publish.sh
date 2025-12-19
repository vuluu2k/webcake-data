#!/bin/bash

# NPM Publishing Script for WebCake Data

echo "📦 Starting NPM Publishing Process..."

# 1. Check if logged in to npm
if ! npm whoami &>/dev/null; then
    echo "❌ Error: Not logged in to npm. Please run 'npm login' first."
    exit 1
fi

# 2. Get current version
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found!"
    exit 1
fi

CURRENT_VERSION=$(node -p "require('./package.json').version")
echo "📦 Current version: $CURRENT_VERSION"

# 3. Build the package
echo "🔨 Building package..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Error: Build failed!"
    exit 1
fi

echo "✅ Build successful!"

# 4. Confirm publish
echo ""
echo "⚠️  You are about to publish webcake-data@$CURRENT_VERSION to npm."
echo "This action cannot be undone easily."
echo ""
read -p "Do you want to continue? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo "❌ Publishing cancelled."
    exit 0
fi

# 5. Publish to npm
echo "📤 Publishing to npm..."
npm publish

if [ $? -ne 0 ]; then
    echo "❌ Error: Publishing failed!"
    exit 1
fi

echo ""
echo "✅ Successfully published webcake-data@$CURRENT_VERSION to npm!"
echo ""
echo "🔗 Package URL: https://www.npmjs.com/package/webcake-data"
echo "📦 Install command: npm install webcake-data@$CURRENT_VERSION"