# Mobile Algorithm Builder - Cursor Handover Document

## Project Overview

**Project Name:** Mobile Algorithm Builder for Wix Editor 3.0
**Purpose:** A heuristics management application that defines how desktop website designs transform to mobile layouts
**Owner:** Yaniv (Product Designer at Wix, Design Infrastructure team)
**Target Platform:** Wix Component Studio Playground (React-based)

---

## What This App Does

The Mobile Algorithm Builder manages **heuristics** - rules that determine how elements transform from desktop to mobile view. Each heuristic follows a **6-step logical flow**:

```
1. WHO AM I?      → Element type (button, image, text, container, etc.)
2. WHERE DO I LIVE? → Parent container (header, section, any, etc.)
3. WHAT TYPE?     → Category + Subcategory (layout/sizing, typography/font_algo, etc.)
4. WHAT CONDITION? → When to apply (desktop_width > 200px, is_blank = true, etc.)
5. WHAT ACTION?   → What to do (resize, set_margin, change_font_size, etc.)
6. WHAT OUTPUT?   → Result values (width-100pct_height-auto, font_size-16px, etc.)
```

**Example Heuristic:**
> "If I'm an **Image** in **any parent**, and my **desktop width ≤ 200px**, then **keep my width** and set **height to max 600px**."

---

## Current State

### What's Been Built (v4)
- ✅ Left sidebar with "Algorithm Builder" branding, Create button, Browse Library, Settings
- ✅ 5-step wizard flow (Category → Element → Condition → Decision → Result)
- ✅ Step progress indicator with connected dots/lines
- ✅ Category selection grid (11 categories with icons)
- ✅ Right sidebar showing heuristics list with cards
- ✅ All inline SVG icons (no external dependencies)
- ✅ Clean, minimal design matching Yaniv's references

### What Needs Work
- 🔧 Polish the visual design to exactly match the screenshot
- 🔧 Add more sophisticated animations/transitions
- 🔧 Implement actual CRUD operations for heuristics
- 🔧 Connect to the full CSV database (191 heuristics)
- 🔧 Add search/filter functionality in the heuristics list
- 🔧 Implement "Browse Library" view

---

## Technical Constraints

### CRITICAL: Component Studio Playground Rules

```javascript
// 1. Component MUST be named "Component" (case-sensitive)
function Component({ config = {} }) { ... }

// 2. ALL config access MUST use optional chaining
const value = config?.property || defaultValue;

// 3. NO external libraries except React (no lucide-react, no framer-motion)
// Use inline SVG icons instead

// 4. ALL styles must be inline (no external CSS)
style={{ backgroundColor: '#fff', padding: '20px' }}

// 5. React hooks need React. prefix
React.useState()
React.useEffect()
React.useMemo()

// 6. MANIFEST is required at the top of file
const MANIFEST = { ... };
```

### File Structure
```
const MANIFEST = {
  "type": "Application.MobileAlgorithmBuilder",
  "editorElement": {
    "selector": ".algorithm-builder",
    "data": {
      // Color configs, layout configs, etc.
    }
  }
};

function Component({ config = {} }) {
  // All component logic here
  return ( <div>...</div> );
}
```

---

## Data Structure

### Heuristics CSV Format
The full database is in `Wix_Heuristics_6Step_FINAL.csv` with 191 rows:

```csv
id,step1_who_element,step2_where_parent,step3a_category,step3b_subcategory,step4_condition_type,step4_condition_value,step5_action,step6_output
A001,repeaters,any,layout,sizing,none,none,container_item_resize,width-100pct_mobile_width_height-auto
A048,text_component,any,typography,font_algo,desktop_font_size,15_19px,font_size,font_size-16px
A118,image,any,layout,sizing,desktop_width,lte_200px,item_size,width-keep_height-max_600px_min_48px
```

### Categories (11 total)
- Typography, Spacing, Layout, Images
- Buttons, Navigation, Forms, Cards
- Lists, Media, Containers

### Elements (by group)
- **Text:** text_component, collapsible_text, text_box, text_marquee
- **Interactive:** button, social_bar, hamburger_menu, accordion, tabs
- **Forms:** address_input, text_input, dropdown, radio_buttons, checkboxes, date_picker
- **Media:** image, shape_svg, horizontal_line, vertical_line, video_box, lottie_animation
- **Containers:** container_box, system_container, section, header, footer
- **Layout:** repeaters, lightbox

### Condition Types
- `none` (always apply)
- `desktop_width` (gt_200px, lte_100px, etc.)
- `desktop_height`
- `desktop_font_size` (0_14px, 15_19px, 20_22px, etc.)
- `is_blank` (true/false)
- `contains_elements` (true/false)
- `layout_type` (text, icon, text_icon, horizontal, vertical)
- `element_is` (first, last)
- `component_above` (text_component, button, image, etc.)
- `rotation_value` (0, 90, not_0, not_0_or_180)

### Actions
- `item_size`, `resize`, `resize_aspect`
- `container_item_resize`, `children_item_resize`
- `margin`, `padding`
- `font_size`, `alignment`
- `vertical_arrange`
- `show`, `hide`
- `keep`, `set_rotation`

---

## Design Requirements

### Visual Style
- **Profile:** Sophisticated, Elegant, Minimalist, Clean
- **Colors:** Monochromatic (grays), minimal accent colors
- **Typography:** System fonts, weights 300-500 only
- **Corners:** 8-12px radius
- **Shadows:** Subtle (0 2px 8px rgba(0,0,0,0.06))
- **Animations:** Smooth, single-execution (no loops), 200-300ms

### Reference Screenshot Layout
```
┌─────────────────────────────────────────────────────────────────────┐
│ LEFT SIDEBAR    │  MAIN CONTENT AREA                │ RIGHT SIDEBAR │
│ (200px)         │  (flex)                           │ (320px)       │
│                 │                                    │               │
│ ○ ALGORITHM     │  ① ─── ② ─── ③ ─── ④ ─── ⑤      │ HEURISTICS 155│
│   BUILDER v1.0  │  Cat   Elem  Cond  Dec   Result   │ ● WLx CMS     │
│                 │                                    │               │
│ [+ Create]      │  Select Category                   │ ┌───────────┐│
│                 │  Choose the category that best...  │ │ BUTTONS   ││
│ ≡ Browse Library│                                    │ │ Element   ││
│ ⚙ Settings      │  ┌────┐ ┌────┐ ┌────┐ ┌────┐     │ │ Condition ││
│                 │  │ Aa │ │ ↔  │ │ ▦  │ │ ▣  │     │ │ Mobile... ││
│                 │  │Typo│ │Spac│ │Lay │ │Img │     │ └───────────┘│
│                 │  └────┘ └────┘ └────┘ └────┘     │               │
│                 │                                    │ ┌───────────┐│
│                 │  ┌────┐ ┌────┐ ┌────┐ ┌────┐     │ │CONTAINER  ││
│                 │  │ ▢  │ │ ≡  │ │ ▤  │ │ ▥  │     │ │ Repeaters ││
│                 │  │Btns│ │Nav │ │Form│ │Card│     │ │ Condition ││
│                 │  └────┘ └────┘ └────┘ └────┘     │ │ Mobile... ││
│                 │                                    │ └───────────┘│
│                 │  ┌────┐ ┌────┐ ┌────┐            │               │
│                 │  │ ☰  │ │ ▷  │ │ ▢  │            │               │
│                 │  │List│ │Med │ │Cont│            │               │
│                 │  └────┘ └────┘ └────┘            │               │
│                 │  ─────────────────────            │               │
│                 │                    [Continue]     │               │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Files Included

1. **mobile-algorithm-builder-v4.jsx** - Current working version
2. **Wix_Heuristics_6Step_FINAL.csv** - Full heuristics database (191 rows)
3. **System prompt documentation** - Full spec of the 6-step heuristic flow

---

## Next Steps for Cursor

### Immediate Tasks
1. Review the current v4 component code
2. Compare against the screenshot to identify visual differences
3. Refine the UI to pixel-match the design:
   - Step indicator styling
   - Category card grid layout (4 columns)
   - Right sidebar card styling
   - Typography and spacing

### Enhancement Tasks
1. Load the full CSV data into the component
2. Add search/filter in the heuristics sidebar
3. Implement edit/delete functionality on heuristic cards
4. Add "Browse Library" view with table/grid options
5. Persist state (localStorage or callback to parent)

### Code Quality
- Ensure all config access uses optional chaining
- Keep all styles inline
- Use inline SVG icons (no external deps)
- Maintain smooth 200ms transitions
- Support reduced motion preferences

---

## Questions to Clarify with Yaniv

1. Should the wizard reset after saving, or show a success state?
2. Is there a specific validation for condition values?
3. Should heuristics be groupable/filterable by category in the sidebar?
4. What happens when clicking a heuristic card - edit mode?
5. Any specific keyboard shortcuts needed?

---

## Contact

**Owner:** Yaniv
**Team:** Wix Design Infrastructure
**Project:** Editor 3.0 / Add Elements Panel / Mobile Transformations

---

*Document created: January 15, 2026*
*Last component version: v4*
