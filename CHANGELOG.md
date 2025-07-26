# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - 2025-01-26

### Enhanced

- **IMPROVED**: Modified cursor trailing effect to fade over time instead of on mouse movement
  - Changed from movement-based fade to time-based fade with 1-second duration
  - Added timestamp tracking to trail points for accurate age calculation
  - Implemented continuous fade loop running at 60fps for smooth transitions
  - Improved visual consistency and smoother trail behavior

## [Previous] - 2025-01-26

### Security
- **CRITICAL**: Fixed XSS vulnerabilities by replacing all `innerHTML` usage with safe DOM methods
  - Replaced `featuredContainer.innerHTML` with secure DOM creation in `loadFeaturedPosts()`
  - Replaced `postsContainer.innerHTML` with secure DOM creation in `loadAllPosts()`
  - Replaced `notification.innerHTML` with secure DOM creation in `showNotification()`
  - Added URL validation for href attributes to prevent malicious links
  - Implemented proper input sanitization for email addresses

### Performance
- **MAJOR**: Optimized mouse trail animation for better performance
  - Implemented element pooling strategy to eliminate DOM recreation on every mousemove
  - Pre-creates fixed pool of 20 trail elements on initialization
  - Updates existing element properties instead of removing/recreating DOM elements
  - Eliminates expensive `querySelectorAll()` and `createElement()` calls per frame
  - Prevents flickering and improves animation smoothness

### Fixed
- Fixed inconsistent tag filtering by aligning `data-tag` attribute with button label
  - Changed `data-tag="Orwell"` to `data-tag="Analysis"` in blog.html
- Fixed unreliable date sorting by standardizing date format
  - Converted all blog post dates from mixed formats to ISO format (YYYY-MM-DD)
  - Ensures consistent chronological ordering in `getRecentPosts()`

### Changed
- **MAJOR**: Refactored blog.js for better security and maintainability
  - Extracted `renderPost()` helper function to eliminate code duplication
  - Consolidated multiple `DOMContentLoaded` listeners into single `initBlog()` function
  - Moved notification styles injection outside `showNotification()` function
  - Wrapped entire blog functionality in IIFE to prevent global namespace pollution
  - Added `createTextElement()` helper for safe DOM element creation
  - Implemented `updateActiveFilter()` for cleaner filter state management

### Added
- Added comprehensive URL validation in DOM creation helpers
- Added email validation with proper regex pattern matching
- Added safe DOM manipulation utilities to prevent XSS attacks
- Added element pooling system for mouse trail animations
- Added centralized style injection for notifications

### Improved
- Enhanced code organization with clear separation of concerns
- Improved error handling and input validation
- Better performance monitoring capabilities
- More maintainable and readable code structure
- Consistent code style and naming conventions

### Technical Debt
- Eliminated security anti-patterns (innerHTML usage with user data)
- Removed performance bottlenecks (DOM recreation in animation loops)
- Standardized data formats for reliable operations
- Consolidated scattered initialization code

---

## Previous Releases

### [v0.3] - Initial Release
- Basic blog functionality with featured posts and filtering
- Mouse trail animation effects
- Newsletter subscription form
- Responsive design with CSS animations
- Medium integration for blog posts

---

## Notes

### Breaking Changes
- Blog post date format changed from mixed formats to ISO format (YYYY-MM-DD)
- Some internal function signatures changed due to security refactoring
- Global namespace pollution reduced through IIFE encapsulation

### Migration Guide
- No user-facing changes required
- All functionality preserved with improved security and performance
- Existing blog data automatically uses new date format

### Security Advisory
This release addresses critical XSS vulnerabilities. Users are strongly advised to update immediately.

### Performance Impact
- Mouse trail animations now run significantly smoother
- Reduced memory allocation and garbage collection pressure
- Eliminated DOM query overhead in animation loops
