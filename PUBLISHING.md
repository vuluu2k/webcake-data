# WebCake Data - Publishing Guide

This guide explains how to publish the WebCake Data library to npm using the provided scripts.

## Prerequisites

1. **Node.js and npm** installed on your system
2. **npm account** - Sign up at [npmjs.com](https://www.npmjs.com)
3. **Git repository** (optional but recommended)

## Setup

### 1. Login to npm

```bash
npm login
```

Enter your npm username, password, and email when prompted.

### 2. Verify Login

```bash
npm whoami
```

This should display your npm username.

## Publishing Scripts

The package includes several scripts to make publishing easier:

### NPM Scripts (package.json)

```bash
# Publish with patch version bump (1.0.0 -> 1.0.1)
npm run publish:patch

# Publish with minor version bump (1.0.0 -> 1.1.0)
npm run publish:minor

# Publish with major version bump (1.0.0 -> 2.0.0)
npm run publish:major

# Publish beta prerelease (1.0.0 -> 1.0.1-beta.0)
npm run publish:beta

# Publish alpha prerelease (1.0.0 -> 1.0.1-alpha.0)
npm run publish:alpha

# Test publish without actually publishing
npm run publish:dry

# Unpublish current version
npm run unpublish

# Check for outdated packages and security issues
npm run check

# Clean install
npm run install:clean
```

### Shell Scripts (Unix/Linux/macOS)

```bash
# Make script executable (first time only)
chmod +x publish.sh

# Publish with patch version bump
./publish.sh patch

# Publish with minor version bump
./publish.sh minor

# Publish with major version bump
./publish.sh major

# Publish beta prerelease
./publish.sh beta

# Publish alpha prerelease
./publish.sh alpha

# Test publish (dry run)
./publish.sh dry-run

# Unpublish current version
./publish.sh unpublish

# Show package information
./publish.sh info

# Check npm login and package status
./publish.sh check

# Show help
./publish.sh help
```

### Batch Scripts (Windows)

```cmd
REM Publish with patch version bump
publish.bat patch

REM Publish with minor version bump
publish.bat minor

REM Publish with major version bump
publish.bat major

REM Publish beta prerelease
publish.bat beta

REM Publish alpha prerelease
publish.bat alpha

REM Test publish (dry run)
publish.bat dry-run

REM Unpublish current version
publish.bat unpublish

REM Show package information
publish.bat info

REM Check npm login and package status
publish.bat check

REM Show help
publish.bat help
```

## Publishing Process

### 1. First Time Publishing

```bash
# Check everything is ready
npm run publish:dry

# Publish initial version
npm run publish:patch
```

### 2. Regular Updates

#### Patch Version (Bug fixes)
```bash
npm run publish:patch
```

#### Minor Version (New features, backward compatible)
```bash
npm run publish:minor
```

#### Major Version (Breaking changes)
```bash
npm run publish:major
```

### 3. Pre-release Versions

#### Beta Release
```bash
npm run publish:beta
```

#### Alpha Release
```bash
npm run publish:alpha
```

## Version Management

### Semantic Versioning

The package follows [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0 -> 2.0.0): Breaking changes
- **MINOR** (1.0.0 -> 1.1.0): New features, backward compatible
- **PATCH** (1.0.0 -> 1.0.1): Bug fixes, backward compatible

### Pre-release Versions

- **Alpha** (1.0.0 -> 1.0.1-alpha.0): Early development
- **Beta** (1.0.0 -> 1.0.1-beta.0): Feature complete, testing

## Pre-publish Checks

The scripts automatically run these checks before publishing:

1. **File Validation**: Ensures all required files exist
2. **Linting**: Runs ESLint if available
3. **Package.json Validation**: Validates JSON syntax
4. **NPM Login**: Verifies you're logged in
5. **Version Check**: Ensures version is different from published version

## Manual Publishing (Alternative)

If you prefer to publish manually:

```bash
# 1. Bump version
npm version patch  # or minor, major

# 2. Publish
npm publish

# 3. Push to git (if using git)
git push origin main --tags
```

## Troubleshooting

### Common Issues

#### 1. Not logged in to npm
```bash
npm login
```

#### 2. Package name already exists
```bash
# Check if package exists
npm view webcake-data

# If it exists, you need to use a different name or unpublish
```

#### 3. Version already exists
```bash
# Check current version
npm view webcake-data version

# Bump version first
npm version patch
```

#### 4. Permission denied
```bash
# Check if you own the package
npm owner ls webcake-data

# Add yourself as owner if needed
npm owner add <your-username> webcake-data
```

### Error Messages

#### "You are not logged in to npm"
```bash
npm login
```

#### "Package name already exists"
- Use a different package name in `package.json`
- Or unpublish the existing package (if you own it)

#### "Version already exists"
- Bump the version number first
- Use `npm version patch/minor/major`

#### "Permission denied"
- You don't have permission to publish this package
- Contact the package owner or use a different name

## Post-Publishing

### 1. Verify Publication

```bash
# Check package on npm
npm view webcake-data

# Install and test
npm install webcake-data
```

### 2. Update Documentation

- Update README.md if needed
- Update CHANGELOG.md
- Tag release in git (if using git)

### 3. Announce Release

- Update project documentation
- Notify users of new features/fixes
- Update any dependent projects

## Best Practices

### 1. Always Test Before Publishing

```bash
# Run dry-run first
npm run publish:dry
```

### 2. Use Appropriate Version Bumps

- **Patch**: Bug fixes only
- **Minor**: New features, no breaking changes
- **Major**: Breaking changes

### 3. Keep Changelog Updated

Update `CHANGELOG.md` with each release.

### 4. Use Pre-release for Testing

Use beta/alpha versions for testing before stable releases.

### 5. Tag Git Releases

```bash
git tag v1.0.0
git push origin v1.0.0
```

## Security

### 1. Never Commit Secrets

- Don't commit `.npmrc` with tokens
- Use environment variables for sensitive data

### 2. Use 2FA

Enable two-factor authentication on your npm account.

### 3. Regular Security Audits

```bash
npm audit
npm audit fix
```

## Support

If you encounter issues:

1. Check this guide first
2. Run `npm run check` to diagnose issues
3. Check npm status at [status.npmjs.com](https://status.npmjs.com)
4. Open an issue on GitHub if needed
