#!/bin/bash

# Release Tagging Script for WebCake Data

echo "🏷️  Starting Release Tagging Process..."

# 1. Check for clean working directory
if [ -n "$(git status --porcelain)" ]; then
  echo "❌ Error: Working directory is not clean. Please commit or stash changes first."
  exit 1
fi

# 2. Get current version
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found!"
    exit 1
fi

CURRENT_VERSION=$(node -p "require('./package.json').version")
echo "📦 Current version: $CURRENT_VERSION"

# 3. Ask for new version
echo "Enter new version (e.g., 1.0.8) or 'patch'/'minor'/'major':"
read NEW_VERSION

if [ -z "$NEW_VERSION" ]; then
  echo "❌ Error: Version is required."
  exit 1
fi

# 4. Update package.json
# npm version updates package.json
echo "Updating package.json..."
npm version $NEW_VERSION --no-git-tag-version

# Get the normalized version string (in case user entered 'patch')
NEW_VERSION_NUM=$(node -p "require('./package.json').version")

# 5. Update CHANGELOG.md
if [ -f "CHANGELOG.md" ]; then
    DATE_STR=$(date +%Y-%m-%d)
    TEMP_FILE=$(mktemp)
    
    # Create new entry header
    echo "
## [$NEW_VERSION_NUM] - $DATE_STR

### Added
- 

### Changed
- 

### Fixed
- 
" > "$TEMP_FILE"
    
    # Look for the first header (line starting with ## [) to insert before it
    # Or just prepend if consistent. The previous changelog has a header at line 1-7.
    # Let's just prepend to the file after the main title if possible, or just top of file after title.
    # Simple approach: Read file, find line with first release header, insert before it.
    
    # For now, simplest robust way: Prepend to top (after main header if exists) or let user edit.
    # Given the file format:
    # Line 1: # WebCake Data - Changelog
    # Line 2-7: intro text
    # Line 8: ## [Start of entries]
    
    # We will just append the new template to the TOP of the entries.
    # We can use awk or sed.
    # Inserting after line 7 (after "Semantic Versioning" link line).
    
    awk -v new_entry="$(cat $TEMP_FILE)" 'NR==7{print; print new_entry; next}1' CHANGELOG.md > CHANGELOG.tmp && mv CHANGELOG.tmp CHANGELOG.md
    rm "$TEMP_FILE"
    
    echo "📝 CHANGELOG.md updated with template."
    echo "⚠️  PAUSED: Please fill in CHANGELOG.md details now."
    echo "Press ENTER to continue when done..."
    read
else
    echo "⚠️  CHANGELOG.md not found. Skipping."
fi

# 6. Commit
echo "Committing version bump..."
git add package.json
if [ -f "CHANGELOG.md" ]; then
    git add CHANGELOG.md
fi

git commit -m "release: v$NEW_VERSION_NUM"

# 7. Tag
echo "Creating tag v$NEW_VERSION_NUM..."
git tag -a "v$NEW_VERSION_NUM" -m "Release v$NEW_VERSION_NUM"

# 8. Push
echo "Pushing to remote..."
git push origin "v$NEW_VERSION_NUM"
git push origin main

echo "✅ Release v$NEW_VERSION_NUM tagged and pushed!"
echo "Now you can run ./publish.sh to publish to npm."
