#!/bin/bash

# Script to publish webcake-data to npm

echo "🚀 Publishing webcake-data..."

# Check if we're in the right directory
if [ ! -f "webcake-data.js" ]; then
    echo "❌ Error: webcake-data.js not found!"
    echo "Please run this script from the plugin directory."
    exit 1
fi

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found!"
    exit 1
fi

# Check if README.md exists
if [ ! -f "README.md" ]; then
    echo "❌ Error: README.md not found!"
    exit 1
fi

# Check if user is logged in to npm
if ! npm whoami > /dev/null 2>&1; then
    echo "❌ Error: Not logged in to npm!"
    echo "Please run: npm login"
    exit 1
fi

# Build the library
echo "🔨 Building library..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

# Get current version
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo "📦 Current version: $CURRENT_VERSION"

# Ask for new version
echo "Enter new version (or press Enter to keep current):"
read NEW_VERSION

if [ -z "$NEW_VERSION" ]; then
    NEW_VERSION=$CURRENT_VERSION
fi

# Update version in package.json
npm version $NEW_VERSION --no-git-tag-version

echo "📝 Publishing version $NEW_VERSION..."

# Publish to npm
npm publish

if [ $? -eq 0 ]; then
    echo "✅ Successfully published webcake-data@$NEW_VERSION"
    echo "🔗 https://www.npmjs.com/package/webcake-data"
else
    echo "❌ Failed to publish package"
    exit 1
fi

echo "🎉 Done!" 