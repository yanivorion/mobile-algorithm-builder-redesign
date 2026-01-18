# Mobile Algorithm Builder v2.0

A sophisticated wizard interface for creating mobile algorithm heuristics — redesigned with refined aesthetics and improved architecture.

## What's New in v2.0

### Design System Overhaul
- **Warm Gray monochromatic palette** — Professional, human-centered aesthetic
- **Refined typography** — Inter font with 300-400-500 weight system
- **Minimal shadows** — Subtle elevation, no heavy drop shadows
- **No loop animations** — Purposeful, single-execution micro-interactions

### Architecture Improvements
- **Custom hooks** — `useWizard` and `useHeuristics` for clean state management
- **Component decomposition** — Logical separation of concerns
- **Accessibility first** — ARIA labels, keyboard navigation, focus management
- **Reduced motion support** — Respects user preferences

### UI Enhancements
- **Keyboard navigation** — Arrow keys for category selection
- **Focus indicators** — Clear visual feedback for interactive elements
- **Responsive design** — Works across desktop, tablet, and mobile
- **Step transitions** — Smooth, intentional animations

---

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Project Structure

```
mobile-algorithm-builder/
├── src/
│   ├── App.jsx          # Main application (components + logic)
│   ├── App.css          # Design system + component styles
│   ├── index.jsx        # React entry point
│   └── index.css        # Base styles + font loading
├── public/
│   └── icon.svg         # App favicon
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Build configuration
└── README.md            # This file
```

---

## Design Tokens

The application uses CSS custom properties for consistent theming:

### Colors (Warm Gray Palette)
| Token | Value | Usage |
|-------|-------|-------|
| `--color-base-1` | #FFFFFF | Primary background |
| `--color-base-2` | #FAFAF9 | Secondary background |
| `--color-shade-1` | #F5F5F4 | Elevated surfaces |
| `--color-shade-2` | #E7E5E4 | Subtle borders |
| `--color-text-1` | #1C1917 | Primary text |
| `--color-text-2` | #44403C | Secondary text |
| `--color-text-3` | #78716C | Tertiary text |

### Typography
| Token | Value |
|-------|-------|
| `--font-weight-light` | 300 |
| `--font-weight-regular` | 400 |
| `--font-weight-medium` | 500 |

### Spacing Scale
4px → 8px → 12px → 16px → 20px → 24px → 32px → 40px → 48px → 64px

---

## Keyboard Shortcuts

| Key | Context | Action |
|-----|---------|--------|
| `Tab` | Global | Navigate between elements |
| `Enter` / `Space` | Category grid | Select category |
| `Arrow keys` | Category grid | Navigate categories |
| `Escape` | Inputs | Clear focus |

---

## Accessibility

- **WCAG AA compliant** — All text meets 4.5:1 contrast ratio
- **Keyboard navigable** — Full functionality without mouse
- **Screen reader friendly** — ARIA labels and live regions
- **Reduced motion** — Respects `prefers-reduced-motion`

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## License

MIT — Wix Design Infrastructure Team
