# Navigation Accessibility Testing Guide

## Manual Testing Checklist

### Keyboard Navigation Tests
- [ ] **Tab Navigation**: Tab through all interactive elements in logical order
- [ ] **Enter/Space Activation**: All buttons and links activate with Enter or Space
- [ ] **Escape Key**: Mobile menu closes with Escape key
- [ ] **Focus Visible**: Clear focus indicators on all interactive elements
- [ ] **Focus Trap**: Focus stays within mobile menu when open
- [ ] **Focus Return**: Focus returns to menu button when mobile menu closes

### Screen Reader Tests
- [ ] **Navigation Role**: Main nav has proper role and aria-label
- [ ] **Menu Structure**: Navigation items have proper menuitem roles
- [ ] **Active States**: Current page indicated with aria-current="page"
- [ ] **Button Labels**: All buttons have descriptive aria-labels
- [ ] **Modal Dialog**: Mobile menu announced as modal dialog
- [ ] **Skip Link**: Skip to content link available and functional

### Visual Accessibility
- [ ] **Color Contrast**: All text meets WCAG AA contrast ratios (4.5:1)
- [ ] **Focus Indicators**: High contrast focus rings visible
- [ ] **Touch Targets**: All interactive elements minimum 44px × 44px
- [ ] **Reduced Motion**: Animations respect prefers-reduced-motion setting
- [ ] **High Contrast Mode**: Navigation visible in high contrast mode
- [ ] **Zoom Support**: Usable at 200% zoom level

### Responsive Tests
- [ ] **Mobile Touch**: All touch targets properly sized for mobile
- [ ] **Tablet Layout**: Navigation adapts correctly on tablets
- [ ] **Desktop**: Full navigation visible and functional
- [ ] **Orientation**: Works in both portrait and landscape modes

## Testing Tools

### Browser Extensions
- **axe DevTools**: Automated accessibility scanning
- **WAVE**: Web accessibility evaluation
- **Colour Contrast Analyser**: Check color contrast ratios
- **Accessibility Insights**: Microsoft's accessibility testing tool

### Screen Readers
- **NVDA** (Windows): Free, widely used
- **JAWS** (Windows): Professional screen reader
- **VoiceOver** (macOS): Built-in screen reader
- **Orca** (Linux): Open source screen reader

### Browser Testing
- **Chrome DevTools**: Lighthouse accessibility audit
- **Firefox DevTools**: Accessibility inspector
- **Safari DevTools**: Accessibility features

## Common Issues to Check

### WCAG 2.1 AA Compliance
1. **Perceivable**
   - Text alternatives for non-text content
   - Sufficient color contrast
   - Responsive design
   - Content not dependent on color alone

2. **Operable**
   - Keyboard accessible
   - No seizure-inducing content
   - Users can control timing
   - Help users navigate and find content

3. **Understandable**
   - Text is readable and understandable
   - Content appears and operates predictably
   - Help users avoid and correct mistakes

4. **Robust**
   - Content can be interpreted reliably by assistive technologies
   - Content remains accessible as technologies advance

## Testing Commands

### Keyboard Navigation Commands
- **Tab**: Move to next interactive element
- **Shift + Tab**: Move to previous interactive element
- **Enter**: Activate links and buttons
- **Space**: Activate buttons
- **Escape**: Close modal dialogs
- **Arrow Keys**: Navigate within menus (when implemented)

### Screen Reader Commands (NVDA)
- **Insert + F7**: List all links
- **Insert + F5**: Refresh elements list
- **H**: Navigate by headings
- **B**: Navigate by buttons
- **L**: Navigate by links
- **R**: Navigate by regions/landmarks

## Expected Behavior

### Desktop Navigation
1. Skip link appears on first Tab press
2. Logo receives focus and is announced
3. Navigation items receive focus in order
4. Active page item announced as "current page"
5. Theme toggle activates and announces state change

### Mobile Navigation
1. Menu button receives focus and announces state
2. Menu opens and focus moves inside
3. Close button and menu items are focusable
4. Escape closes menu and returns focus
5. Clicking outside closes menu

## Automated Testing Integration

```javascript
// Example jest test for accessibility
import { axe, toHaveNoViolations } from 'jest-axe'
import { render } from '@testing-library/react'
import Navigation from './Navigation'

expect.extend(toHaveNoViolations)

test('Navigation should not have accessibility violations', async () => {
  const { container } = render(<Navigation />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

This comprehensive testing approach ensures the navigation meets modern accessibility standards and provides an excellent user experience for all users, including those using assistive technologies.