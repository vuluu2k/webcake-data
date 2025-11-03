# Git Release Guide - Hướng dẫn tạo Tag và Release

Hướng dẫn chi tiết về cách tạo **Git Tags** và **GitHub Releases** cho dự án WebCake Data.

## 📋 Mục lục

1. [Giới thiệu](#giới-thiệu)
2. [Tag là gì?](#tag-là-gì)
3. [Semantic Versioning](#semantic-versioning)
4. [Tạo Git Tags](#tạo-git-tags)
5. [Push Tags lên GitHub](#push-tags-lên-github)
6. [Tạo GitHub Releases](#tạo-github-releases)
7. [Quy trình Release hoàn chỉnh](#quy-trình-release-hoàn-chỉnh)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)

---

## 🎯 Giới thiệu

Git Tags và GitHub Releases là cách để:
- **Đánh dấu** các phiên bản quan trọng (releases) của dự án
- **Theo dõi** lịch sử phát hành
- **Dễ dàng** quay lại phiên bản cụ thể
- **Thông báo** người dùng về updates mới

---

## 🏷️ Tag là gì?

**Git Tag** là một đánh dấu đặc biệt tại một commit cụ thể để đánh dấu phiên bản quan trọng.

### So sánh với Branch

| Feature | Tag | Branch |
|---------|-----|--------|
| Di chuyển khi có commit mới | ❌ Không | ✅ Có |
| Đánh dấu point trong time | ✅ Có | ❌ Không |
| Sử dụng cho release | ✅ Rất tốt | ❌ Không nên |
| Thay đổi theo thời gian | ❌ Không | ✅ Có |

### Ví dụ
```
main branch:  A---B---C---D---E (đang phát triển)
              
tag v1.0.2:   A---B
                      ↑
                      Tag v1.0.2 được đánh dấu tại commit B
```

---

## 📦 Semantic Versioning

**Semantic Versioning (SemVer)** là cách đặt tên phiên bản theo format: `MAJOR.MINOR.PATCH`

### Format: `X.Y.Z`

- **X (MAJOR)**: Breaking changes
  - VD: 1.0.0 → 2.0.0
  - API thay đổi, không backward compatible

- **Y (MINOR)**: New features, backward compatible
  - VD: 1.0.0 → 1.1.0
  - Thêm tính năng mới, không phá vỡ code cũ

- **Z (PATCH)**: Bug fixes, backward compatible
  - VD: 1.0.0 → 1.0.1
  - Sửa lỗi, không thay đổi API

### Pre-release Versions

```
v1.0.0-alpha.1    # Early development
v1.0.0-beta.1     # Testing, near completion
v1.0.0-rc.1       # Release candidate
v1.0.0             # Stable release
```

---

## 🏷️ Tạo Git Tags

### 1. Lightweight Tags (Không khuyến nghị cho releases)

```bash
# Tạo lightweight tag
git tag v1.0.3

# Xem tag
git show v1.0.3
```

❌ **Nhược điểm**: Không có metadata, không có message, không thể GPG sign

---

### 2. Annotated Tags (Khuyến nghị)

```bash
# Tạo annotated tag với message
git tag -a v1.0.3 -m "Release v1.0.3 - Enhanced QueryBuilder and populate with object-based filters"

# Xem tag chi tiết
git show v1.0.3
```

✅ **Ưu điểm**: Có metadata đầy đủ, có thể GPG sign, phù hợp cho releases

---

### 3. Tag tại commit cũ

```bash
# Xem commits
git log --oneline

# Tạo tag tại commit cụ thể
git tag -a v1.0.3 <commit-hash> -m "Release message"

# Ví dụ
git tag -a v1.0.3 81a9017 -m "Release v1.0.3"
```

---

### 4. Xem và quản lý Tags

```bash
# Xem tất cả tags
git tag
git tag -l
git tag --list

# Xem tags theo pattern
git tag -l "v1.0*"
git tag -l "v*.*.*"

# Xem tags theo thứ tự version
git tag -l --sort=-version:refname

# Xem thông tin tag
git show v1.0.3

# Xóa tag (local)
git tag -d v1.0.3
```

---

### 5. GPG Sign Tag (Optional - Security)

```bash
# List GPG keys
gpg --list-secret-keys --keyid-format LONG

# Tạo signed tag
git tag -s v1.0.3 -m "Signed release v1.0.3"

# Verify signed tag
git tag -v v1.0.3
```

---

## 🚀 Push Tags lên GitHub

### Push tag cụ thể

```bash
# Push một tag
git push origin v1.0.3

# Push tag với force (cẩn thận!)
git push origin v1.0.3 --force
```

### Push tất cả tags

```bash
# Push tất cả tags chưa push
git push origin --tags
git push origin --follow-tags  # Push commit + tags liên quan

# Push ALL tags (bao gồm cả remote)
git push --all --tags
```

### Xóa tag trên remote

```bash
# Xóa tag trên GitHub
git push origin --delete v1.0.3
# hoặc
git push origin :refs/tags/v1.0.3
```

---

## 📦 Tạo GitHub Releases

### Cách 1: GitHub Web UI (Đơn giản nhất)

#### Bước 1: Truy cập GitHub Releases
```
Vào: https://github.com/vuluu2k/webcake-data/releases
Click: "Draft a new release"
```

#### Bước 2: Điền thông tin
```
Choose a tag: v1.0.3 (hoặc tạo tag mới)
Release title: Release v1.0.3
Description: Copy từ CHANGELOG.md
```

#### Bước 3: Attach files (Optional)
```
Upload:
- dist/webcake-data.umd.min.js
- dist/webcake-data.esm.min.js
- Source code (zip)
```

#### Bước 4: Publish
```
✅ Pre-release (nếu là beta/alpha)
✅ Latest release (nếu stable)
Click: "Publish release"
```

---

### Cách 2: GitHub CLI (Nhanh, tự động)

#### Cài đặt GitHub CLI

```bash
# macOS
brew install gh

# Windows
winget install GitHub.cli

# Linux
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo gpg --dearmor -o /usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update
sudo apt install gh
```

#### Login GitHub CLI

```bash
gh auth login

# Chọn:
# - GitHub.com
# - HTTPS
# - Login with web browser
```

#### Tạo Release

```bash
# Tạo release từ tag hiện tại
gh release create v1.0.3 \
  --title "Release v1.0.3" \
  --notes "Enhanced QueryBuilder and populate with object-based filters" \
  --target main

# Tạo release từ file CHANGELOG
gh release create v1.0.3 \
  --title "Release v1.0.3" \
  --notes-file CHANGELOG.md \
  --target main \
  dist/webcake-data.umd.min.js

# Tạo pre-release
gh release create v1.0.3-beta.1 \
  --title "Beta v1.0.3-beta.1" \
  --prerelease \
  --notes "Testing new features"

# Tạo release với nhiều files
gh release create v1.0.3 \
  --title "Release v1.0.3" \
  --notes "..." \
  dist/*.min.js \
  dist/*.js
```

---

### Cách 3: GitHub API (Advanced)

```bash
# Get GitHub token: Settings > Developer settings > Personal access tokens
export GITHUB_TOKEN="your_github_token"

# Create release
curl -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/vuluu2k/webcake-data/releases \
  -d '{
    "tag_name": "v1.0.3",
    "target_commitish": "main",
    "name": "Release v1.0.3",
    "body": "Enhanced QueryBuilder and populate with object-based filters",
    "draft": false,
    "prerelease": false
  }'
```

---

## 🔄 Quy trình Release hoàn chỉnh

### Workflow cho một release mới

```bash
# ============================================
# BƯỚC 1: Chuẩn bị code
# ============================================

# 1.1. Test code
npm test

# 1.2. Build production
npm run build

# 1.3. Review changes
git status
git diff

# ============================================
# BƯỚC 2: Cập nhật version và docs
# ============================================

# 2.1. Update package.json version
# Tự động hoặc thủ công:
npm version patch  # 1.0.0 → 1.0.1
npm version minor  # 1.0.0 → 1.1.0
npm version major  # 1.0.0 → 2.0.0

# 2.2. Update CHANGELOG.md
# Thêm phần mới cho version:
# ## [1.0.3] - 2024-11-03
# ### Enhanced
# - ...

# 2.3. Update README.md nếu cần

# ============================================
# BƯỚC 3: Commit changes
# ============================================

# 3.1. Stage changes
git add .

# 3.2. Commit với conventional commit message
git commit -m "feat: Release v1.0.3 - Enhanced QueryBuilder

- Enhanced QueryBuilder.where() to support object-based filters
- Enhanced populate() to support object-based where and sort parameters
- Updated TypeScript definitions
- Comprehensive documentation updates"

# 3.3. Tạo annotated tag
git tag -a v1.0.3 -m "Release v1.0.3 - Enhanced QueryBuilder and populate with object-based filters"

# ============================================
# BƯỚC 4: Push lên GitHub
# ============================================

# 4.1. Push commits
git push origin main

# 4.2. Push tag
git push origin v1.0.3

# Hoặc push cả 2 cùng lúc
git push origin main --follow-tags

# ============================================
# BƯỚC 5: Tạo GitHub Release
# ============================================

# 5.1. Sử dụng GitHub CLI (Khuyến nghị)
gh release create v1.0.3 \
  --title "Release v1.0.3" \
  --notes-file CHANGELOG.md \
  --target main

# 5.2. Hoặc tạo thủ công trên GitHub UI

# ============================================
# BƯỚC 6: Publish lên NPM (Optional)
# ============================================

npm publish

# ============================================
# BƯỚC 7: Verify
# ============================================

# 7.1. Check GitHub release
# https://github.com/vuluu2k/webcake-data/releases

# 7.2. Check npm package
npm view webcake-data version

# 7.3. Test installation
npm install webcake-data@latest
```

---

## 📋 Release Checklist

Trước khi tạo release:

- [ ] Code đã được test kỹ
- [ ] Build production successful
- [ ] Không có linter errors
- [ ] README.md đã cập nhật
- [ ] CHANGELOG.md đã cập nhật
- [ ] Version trong package.json đã đúng
- [ ] All changes đã commit
- [ ] Tag message rõ ràng
- [ ] Release notes đã chuẩn bị

---

## 🎯 Best Practices

### 1. Sử dụng Annotated Tags cho Releases

```bash
# ✅ Good
git tag -a v1.0.3 -m "Release message"

# ❌ Bad
git tag v1.0.3
```

### 2. Tag naming convention

```bash
# ✅ Good
v1.0.3
v2.0.0-beta.1
v1.0.3-rc.1

# ❌ Bad
release-1.0.3
1.0.3
v1_0_3
```

### 3. Commit message convention

```bash
# ✅ Good (Conventional Commits)
feat: Add new QueryBuilder methods
fix: Resolve updateOne response issue
docs: Update README with new examples
chore: Bump version to 1.0.3

# ❌ Bad
update code
fixed bug
changes
```

### 4. CHANGELOG format

```markdown
## [1.0.3] - 2024-11-03

### Added
- New feature description

### Changed
- Breaking changes

### Deprecated
- Soon-to-be removed features

### Removed
- Removed features

### Fixed
- Bug fixes

### Security
- Security vulnerabilities fixed
```

### 5. Release notes từ CHANGELOG

```bash
# Lấy notes từ CHANGELOG
gh release create v1.0.3 \
  --notes-file CHANGELOG.md \
  --target main
```

---

## 🔧 Troubleshooting

### 1. Tag đã tồn tại

```bash
# Xóa tag local
git tag -d v1.0.3

# Xóa tag remote
git push origin --delete v1.0.3

# Tạo lại tag
git tag -a v1.0.3 -m "New message"
git push origin v1.0.3
```

### 2. Push tag bị lỗi

```bash
# Kiểm tra remote
git remote -v

# Force push (cẩn thận!)
git push origin v1.0.3 --force
```

### 3. Tag sai commit

```bash
# Xóa tag local
git tag -d v1.0.3

# Tạo lại tag tại commit đúng
git tag -a v1.0.3 <commit-hash> -m "Message"

# Force push
git push origin v1.0.3 --force
```

### 4. Không thấy release trên GitHub

```bash
# Kiểm tra tag có tồn tại
git ls-remote --tags origin

# Kiểm tra GitHub
gh release list

# Tạo release thủ công
gh release create v1.0.3 --title "..." --notes "..."
```

### 5. GitHub CLI chưa login

```bash
gh auth login
gh auth status
```

---

## 📚 Ví dụ thực tế

### Ví dụ 1: Release patch version (1.0.2 → 1.0.3)

```bash
# 1. Update version
npm version patch

# 2. Update CHANGELOG.md
# Thêm section cho v1.0.3

# 3. Commit
git add .
git commit -m "chore: Bump version to 1.0.3"

# 4. Create tag
git tag -a v1.0.3 -m "Release v1.0.3 - Bug fixes and enhancements"

# 5. Push
git push origin main
git push origin v1.0.3

# 6. Create release
gh release create v1.0.3 \
  --title "Release v1.0.3" \
  --notes-file CHANGELOG.md
```

---

### Ví dụ 2: Release với npm publish

```bash
# 1. Build
npm run build

# 2. Test
npm test

# 3. Version bump
npm version patch

# 4. Publish to npm
npm publish

# 5. Create tag
git tag -a $(node -p "require('./package.json').version") \
  -m "Release $(node -p "require('./package.json').version")"

# 6. Push
git push origin main --follow-tags

# 7. Create release
gh release create v$(node -p "require('./package.json').version") \
  --title "Release v$(node -p "require('./package.json').version")" \
  --notes-file CHANGELOG.md
```

---

## 🎁 Bonus: Automation Scripts

### Script tự động release (release.sh)

```bash
#!/bin/bash

# release.sh - Automated release script

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
error() {
    echo -e "${RED}Error: $1${NC}" >&2
    exit 1
}

success() {
    echo -e "${GREEN}✓ $1${NC}"
}

info() {
    echo -e "${YELLOW}→ $1${NC}"
}

# Check if we're on main branch
current_branch=$(git rev-parse --abbrev-ref HEAD)
if [ "$current_branch" != "main" ]; then
    error "Must be on main branch. Current branch: $current_branch"
fi

# Check if working directory is clean
if ! git diff-index --quiet HEAD --; then
    error "Working directory has uncommitted changes"
fi

# Get release type
read -p "Release type (patch/minor/major): " release_type

case $release_type in
    patch|minor|major)
        success "Release type: $release_type"
        ;;
    *)
        error "Invalid release type. Must be patch, minor, or major"
        ;;
esac

# Bump version
info "Bumping version..."
npm version $release_type --no-git-tag-version
VERSION=$(node -p "require('./package.json').version")

success "Version bumped to: $VERSION"

# Build
info "Building..."
npm run build
success "Build completed"

# Commit
info "Committing changes..."
git add .
git commit -m "chore: Bump version to $VERSION"

# Create tag
info "Creating tag v$VERSION..."
git tag -a "v$VERSION" -m "Release v$VERSION"

# Push
info "Pushing to GitHub..."
git push origin main
git push origin "v$VERSION"
success "Pushed to GitHub"

# Create release
info "Creating GitHub release..."
gh release create "v$VERSION" \
    --title "Release v$VERSION" \
    --notes-file CHANGELOG.md \
    --target main
success "GitHub release created"

# Publish to npm
read -p "Publish to npm? (y/n): " publish_npm
if [ "$publish_npm" = "y" ]; then
    info "Publishing to npm..."
    npm publish
    success "Published to npm"
fi

success "Release v$VERSION completed successfully! 🎉"
```

### Cách sử dụng script

```bash
# Make executable
chmod +x release.sh

# Run
./release.sh

# Follow prompts
```

---

## 🔗 Tài liệu tham khảo

- [Git Documentation - Tags](https://git-scm.com/book/en/v2/Git-Basics-Tagging)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Releases Documentation](https://docs.github.com/en/repositories/releasing-projects-on-github)
- [GitHub CLI Documentation](https://cli.github.com/manual/)
- [Keep a Changelog](https://keepachangelog.com/)

---

## 📝 Summary

| Task | Command |
|------|---------|
| **Tạo annotated tag** | `git tag -a v1.0.3 -m "Message"` |
| **Push tag** | `git push origin v1.0.3` |
| **Xem tags** | `git tag -l` |
| **Xóa tag** | `git tag -d v1.0.3` |
| **GitHub release (CLI)** | `gh release create v1.0.3 --notes "..."` |
| **Version bump** | `npm version patch/minor/major` |
| **Publish npm** | `npm publish` |

---

**Happy Releasing! 🚀**

