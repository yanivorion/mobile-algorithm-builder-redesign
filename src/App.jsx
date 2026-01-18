import { useState, useCallback, useMemo, useEffect } from 'react';
import './App.css';
import * as wixCMS from './services/wixCMS';

// ============================================================================
// INLINE SVG ICONS
// ============================================================================

const Icon = ({ name, size = 20, color = '#888888', strokeWidth = 1.5 }) => {
  const icons = {
    logo: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke={color} strokeWidth={strokeWidth}/>
        <circle cx="12" cy="12" r="4" fill={color}/>
      </svg>
    ),
    plus: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
        <line x1="12" y1="5" x2="12" y2="19"/>
        <line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
    ),
    menu: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
        <line x1="4" y1="6" x2="20" y2="6"/>
        <line x1="4" y1="12" x2="20" y2="12"/>
        <line x1="4" y1="18" x2="20" y2="18"/>
      </svg>
    ),
    settings: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
    x: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    ),
    check: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
    refresh: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
        <path d="M1 4v6h6"/>
        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
      </svg>
    ),
    history: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    chevron: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    ),
    grid: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
        <rect x="3" y="3" width="7" height="7"/>
        <rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
    list: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
        <line x1="8" y1="6" x2="21" y2="6"/>
        <line x1="8" y1="12" x2="21" y2="12"/>
        <line x1="8" y1="18" x2="21" y2="18"/>
        <line x1="3" y1="6" x2="3.01" y2="6"/>
        <line x1="3" y1="12" x2="3.01" y2="12"/>
        <line x1="3" y1="18" x2="3.01" y2="18"/>
      </svg>
    ),
    download: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
    ),
    // Category icons
    typography: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <text x="5" y="18" fontSize="16" fontWeight="500" fill={color} stroke="none">Aa</text>
      </svg>
    ),
    spacing: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
        <line x1="4" y1="12" x2="20" y2="12"/>
        <polyline points="7 9 4 12 7 15"/>
        <polyline points="17 9 20 12 17 15"/>
      </svg>
    ),
    layout: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <line x1="3" y1="9" x2="21" y2="9"/>
        <line x1="9" y1="21" x2="9" y2="9"/>
      </svg>
    ),
    images: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
    ),
    buttons: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
        <rect x="3" y="6" width="18" height="12" rx="2"/>
      </svg>
    ),
    navigation: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
        <line x1="4" y1="6" x2="20" y2="6"/>
        <line x1="4" y1="12" x2="20" y2="12"/>
        <line x1="4" y1="18" x2="20" y2="18"/>
      </svg>
    ),
    forms: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <line x1="7" y1="8" x2="17" y2="8"/>
        <line x1="7" y1="12" x2="17" y2="12"/>
        <line x1="7" y1="16" x2="12" y2="16"/>
      </svg>
    ),
    cards: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <line x1="2" y1="10" x2="22" y2="10"/>
      </svg>
    ),
    lists: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
        <line x1="8" y1="6" x2="21" y2="6"/>
        <line x1="8" y1="12" x2="21" y2="12"/>
        <line x1="8" y1="18" x2="21" y2="18"/>
        <line x1="3" y1="6" x2="3.01" y2="6"/>
        <line x1="3" y1="12" x2="3.01" y2="12"/>
        <line x1="3" y1="18" x2="3.01" y2="18"/>
      </svg>
    ),
    media: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
        <polygon points="5 3 19 12 5 21 5 3"/>
      </svg>
    ),
    containers: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <rect x="7" y="7" width="10" height="10" rx="1"/>
      </svg>
    ),
    behavioral: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
  };
  return icons[name] || null;
};

// ============================================================================
// CONSTANTS - 6-Step Structure
// ============================================================================

const CATEGORIES = [
  { id: 'layout', name: 'Layout', icon: 'layout', color: '#3B7DED' },
  { id: 'style', name: 'Style', icon: 'images', color: '#3B7DED' },
  { id: 'behavioral', name: 'Behavioral', icon: 'behavioral', color: '#3B7DED' },
  { id: 'fonts', name: 'Fonts', icon: 'typography', color: '#3B7DED' },
];

const SUBCATEGORIES = {
  layout: ['sizing', 'spacing', 'alignment', 'pinned', 'ooc'],
  style: ['colors', 'backgrounds', 'borders', 'shadows', 'effects'],
  behavioral: ['visibility', 'rotation', 'animation', 'interaction'],
  fonts: ['font_algo', 'font_size', 'line_height', 'letter_spacing'],
};

const PARENT_OPTIONS = [
  { value: 'any', label: 'Any Parent' },
  { value: 'header', label: 'Header' },
  { value: 'section', label: 'Section' },
  { value: 'footer', label: 'Footer' },
  { value: 'container_box', label: 'Container Box' },
  { value: 'system_container', label: 'System Container' },
];

const ELEMENT_OPTIONS = [
  { value: 'any', label: 'Any Element' },
  { value: 'text_component', label: 'Text Component' },
  { value: 'button', label: 'Button' },
  { value: 'image', label: 'Image' },
  { value: 'container_box', label: 'Container Box' },
  { value: 'repeaters', label: 'Repeaters' },
  { value: 'lightbox', label: 'Lightbox' },
  { value: 'tabs', label: 'Tabs' },
  { value: 'accordion', label: 'Accordion' },
  { value: 'video_box', label: 'Video Box' },
  { value: 'horizontal_line', label: 'Horizontal Line' },
  { value: 'vertical_line', label: 'Vertical Line' },
  { value: 'shape_svg', label: 'Shape/SVG' },
  { value: 'social_bar', label: 'Social Bar' },
  { value: 'hamburger_menu', label: 'Hamburger Menu' },
  { value: 'logo_component', label: 'Logo Component' },
  { value: 'google_maps', label: 'Google Maps' },
  { value: 'lottie_animation', label: 'Lottie Animation' },
];

const CONDITION_TYPES = [
  { value: 'none', label: 'None (Always Apply)' },
  { value: 'desktop_width', label: 'Desktop Width' },
  { value: 'desktop_height', label: 'Desktop Height' },
  { value: 'desktop_font_size', label: 'Desktop Font Size' },
  { value: 'is_blank', label: 'Is Blank' },
  { value: 'contains_elements', label: 'Contains Elements' },
  { value: 'layout_type', label: 'Layout Type' },
  { value: 'element_is', label: 'Element Position' },
  { value: 'is_first_component_above', label: 'Component Above' },
  { value: 'rotation_value', label: 'Rotation Value' },
  { value: 'aspect_ratio', label: 'Aspect Ratio' },
  { value: 'width_equals_parent', label: 'Width Equals Parent' },
];

const ACTION_OPTIONS = [
  { value: 'item_size', label: 'Item Size' },
  { value: 'resize_aspect', label: 'Resize (Aspect)' },
  { value: 'container_item_resize', label: 'Container Item Resize' },
  { value: 'margin', label: 'Margin' },
  { value: 'padding', label: 'Padding' },
  { value: 'font_size', label: 'Font Size' },
  { value: 'alignment', label: 'Alignment' },
  { value: 'vertical_arrange', label: 'Vertical Arrange' },
  { value: 'show', label: 'Show' },
  { value: 'hide', label: 'Hide' },
  { value: 'keep', label: 'Keep' },
  { value: 'keep_value', label: 'Keep Value' },
  { value: 'offset_value', label: 'Offset Value' },
  { value: 'set_rotation', label: 'Set Rotation' },
  { value: 'menu_spacing', label: 'Menu Spacing' },
];

const STEPS = [
  { number: 1, label: 'Element', key: 'step1_who_element' },
  { number: 2, label: 'Parent', key: 'step2_where_parent' },
  { number: 3, label: 'Type', key: 'step3' },
  { number: 4, label: 'Condition', key: 'step4' },
  { number: 5, label: 'Action', key: 'step5_action' },
  { number: 6, label: 'Output', key: 'step6_output' },
];

const VIEW_MODES = [
  { id: 'glass', name: 'Glass' },
  { id: 'apple-spotlight', name: 'Apple Spotlight' },
];


const STATUS_OPTIONS = [
  { value: 'Active', color: '#3B7DED' },      // Blue
  { value: 'Pending', color: '#F59E0B' },     // Orange
  { value: 'Canceled', color: '#6B7280' },    // Dark Grey
];

const INITIAL_HEURISTIC = {
  id: null,
  step1_who_element: '',
  step2_where_parent: 'any',
  step3a_category: '',
  step3b_subcategory: '',
  step4_condition_type: 'none',
  step4_condition_value: '',
  step5_action: '',
  step6_output: '',
  status: 'Active',
  history: {}, // { fieldName: [{ timestamp, value, userId }] }
};

// ============================================================================
// DESIGN TOKENS
// ============================================================================

const colors = {
  background: '#F8F8F8',
  cardBackground: '#FFFFFF',
  primaryText: '#1a1a1a',
  secondaryText: '#888888',
  accent: '#1a1a1a',
  border: '#E5E5E5',
  success: '#22C55E',
  error: '#EF4444',
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const generateId = () => `h_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

const exportToCSV = (heuristics) => {
  const headers = ['id', 'step1_who_element', 'step2_where_parent', 'step3a_category', 'step3b_subcategory', 'step4_condition_type', 'step4_condition_value', 'step5_action', 'step6_output'];
  const rows = heuristics.map(h => [
    h.id,
    h.step1_who_element,
    h.step2_where_parent,
    h.step3a_category,
    h.step3b_subcategory,
    h.step4_condition_type,
    h.step4_condition_value,
    h.step5_action,
    h.step6_output,
  ]);
  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
};

const exportToJSON = (heuristics) => JSON.stringify(heuristics, null, 2);

const downloadFile = (content, filename, mimeType) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// ============================================================================
// CUSTOM HOOKS
// ============================================================================

const useWizard = (totalSteps = 6) => {
  const [step, setStep] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToStep = useCallback((targetStep) => {
    if (targetStep < 1 || targetStep > totalSteps || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(targetStep);
      setIsTransitioning(false);
    }, 150);
  }, [totalSteps, isTransitioning]);

  const nextStep = useCallback(() => goToStep(step + 1), [step, goToStep]);
  const prevStep = useCallback(() => goToStep(step - 1), [step, goToStep]);
  const reset = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(1);
      setIsTransitioning(false);
    }, 150);
  }, []);

  return { step, goToStep, nextStep, prevStep, reset, isTransitioning };
};

const useHeuristics = () => {
  const [heuristics, setHeuristics] = useState([]);
  const [draft, setDraft] = useState(INITIAL_HEURISTIC);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isWixConnected, setIsWixConnected] = useState(false);

  useEffect(() => {
    const loadHeuristics = async () => {
      setIsLoading(true);
      setError(null);

      if (wixCMS.isWixConfigured()) {
        setIsWixConnected(true);
        const result = await wixCMS.fetchHeuristics();
        
        if (result.success) {
          setHeuristics(result.data.map(h => ({ ...h, status: h.status || 'Active' })));
        } else if (result.error !== 'NOT_CONFIGURED') {
          setError(`Failed to load from Wix CMS: ${result.error}`);
          const stored = localStorage.getItem('mobile-heuristics-v2');
          if (stored) {
            try {
              setHeuristics(JSON.parse(stored).map(h => ({ ...h, status: h.status || 'Active' })));
            } catch (e) {
              console.error('Error parsing localStorage:', e);
            }
          }
        }
      } else {
        setIsWixConnected(false);
        const stored = localStorage.getItem('mobile-heuristics-v2');
        if (stored) {
          try {
            setHeuristics(JSON.parse(stored).map(h => ({ ...h, status: h.status || 'Active' })));
          } catch (e) {
            console.error('Error parsing localStorage:', e);
          }
        }
      }
      
      setIsLoading(false);
    };

    loadHeuristics();
  }, []);

  useEffect(() => {
    if (!isLoading && heuristics.length > 0) {
      localStorage.setItem('mobile-heuristics-v2', JSON.stringify(heuristics));
    }
  }, [heuristics, isLoading]);

  const updateDraft = useCallback((field, value) => {
    setDraft(prev => ({ ...prev, [field]: value }));
  }, []);

  const resetDraft = useCallback(() => {
    setDraft(INITIAL_HEURISTIC);
  }, []);

  const addHeuristic = useCallback(async () => {
    if (!draft.step1_who_element || !draft.step5_action) return false;
    
    setIsSyncing(true);
    setError(null);

    if (wixCMS.isWixConfigured()) {
      const result = await wixCMS.createHeuristic(draft);
      
      if (result.success) {
        setHeuristics(prev => [...prev, result.data]);
        setDraft(INITIAL_HEURISTIC);
        setIsSyncing(false);
        return true;
      } else {
        setError(`Failed to save to Wix CMS: ${result.error}`);
        const newHeuristic = { ...draft, id: generateId() };
        setHeuristics(prev => [...prev, newHeuristic]);
        setDraft(INITIAL_HEURISTIC);
        setIsSyncing(false);
        return true;
      }
    } else {
      const newHeuristic = { ...draft, id: generateId() };
      setHeuristics(prev => [...prev, newHeuristic]);
      setDraft(INITIAL_HEURISTIC);
      setIsSyncing(false);
      return true;
    }
  }, [draft]);

  const deleteHeuristic = useCallback(async (id) => {
    setIsSyncing(true);
    setError(null);

    if (wixCMS.isWixConfigured()) {
      const result = await wixCMS.deleteHeuristic(id);
      
      if (!result.success && result.error !== 'NOT_CONFIGURED') {
        setError(`Failed to delete from Wix CMS: ${result.error}`);
      }
    }

    setHeuristics(prev => prev.filter(h => h.id !== id));
    setIsSyncing(false);
  }, []);

  const refreshFromCMS = useCallback(async () => {
    if (!wixCMS.isWixConfigured()) return;
    
    setIsLoading(true);
    setError(null);
    
    const result = await wixCMS.fetchHeuristics();
    
    if (result.success) {
      setHeuristics(result.data);
    } else {
      setError(`Failed to refresh: ${result.error}`);
    }
    
    setIsLoading(false);
  }, []);

  const updateStatus = useCallback(async (id, newStatus) => {
    setIsSyncing(true);
    
    setHeuristics(prev => prev.map(h => {
      if (h.id !== id) return h;
      
      // Track history
      const history = h.history || {};
      const statusHistory = history.status || [];
      
      return {
        ...h,
        status: newStatus,
        history: {
          ...history,
          status: [
            ...statusHistory,
            {
              timestamp: new Date().toISOString(),
              value: h.status || 'Active',
              newValue: newStatus,
            }
          ]
        }
      };
    }));

    // Sync to CMS if configured
    if (wixCMS.isWixConfigured()) {
      const heuristic = heuristics.find(h => h.id === id);
      if (heuristic) {
        const updated = { ...heuristic, status: newStatus };
        const result = await wixCMS.updateHeuristic(id, updated);
        
        if (!result.success) {
          setError(`Failed to sync status to Wix CMS: ${result.error}`);
        }
      }
    }
    
    setIsSyncing(false);
  }, [heuristics]);

  const updateHeuristicField = useCallback(async (id, fieldName, newValue) => {
    setIsSyncing(true);
    setError(null);

    setHeuristics(prev => prev.map(h => {
      if (h.id !== id) return h;
      
      const oldValue = h[fieldName];
      
      // Track history
      const history = h.history || {};
      const fieldHistory = history[fieldName] || [];
      
      return {
        ...h,
        [fieldName]: newValue,
        history: {
          ...history,
          [fieldName]: [
            ...fieldHistory,
            {
              timestamp: new Date().toISOString(),
              value: oldValue,
              newValue: newValue,
            }
          ]
        }
      };
    }));

    // Sync to CMS if configured
    if (wixCMS.isWixConfigured()) {
      const heuristic = heuristics.find(h => h.id === id);
      if (heuristic) {
        const updated = { ...heuristic, [fieldName]: newValue };
        const result = await wixCMS.updateHeuristic(id, updated);
        
        if (!result.success) {
          setError(`Failed to sync to Wix CMS: ${result.error}`);
        }
      }
    }

    setIsSyncing(false);
  }, [heuristics]);

  const revertHeuristicField = useCallback((id, fieldName, historyIndex) => {
    setHeuristics(prev => prev.map(h => {
      if (h.id !== id) return h;
      
      const history = h.history || {};
      const fieldHistory = history[fieldName] || [];
      
      if (historyIndex < 0 || historyIndex >= fieldHistory.length) return h;
      
      const historyEntry = fieldHistory[historyIndex];
      const revertValue = historyEntry.value;
      
      return {
        ...h,
        [fieldName]: revertValue,
        history: {
          ...history,
          [fieldName]: [
            ...fieldHistory,
            {
              timestamp: new Date().toISOString(),
              value: h[fieldName],
              newValue: revertValue,
              isRevert: true,
              revertedFrom: historyIndex,
            }
          ]
        }
      };
    }));
  }, []);

  return { 
    heuristics, 
    draft, 
    updateDraft, 
    resetDraft, 
    addHeuristic, 
    deleteHeuristic,
    refreshFromCMS,
    updateStatus,
    updateHeuristicField,
    revertHeuristicField,
    isLoading,
    isSyncing,
    error,
    isWixConnected
  };
};

// ============================================================================
// MAIN APPLICATION
// ============================================================================

function App() {
  const { step, goToStep, nextStep, prevStep, reset, isTransitioning } = useWizard(6);
  const { 
    heuristics, 
    draft, 
    updateDraft, 
    resetDraft, 
    addHeuristic, 
    deleteHeuristic,
    refreshFromCMS,
    updateStatus,
    updateHeuristicField,
    revertHeuristicField,
    isLoading,
    isSyncing,
    error,
    isWixConnected
  } = useHeuristics();
  const [exportFormat, setExportFormat] = useState('csv');
  const [currentView, setCurrentView] = useState('library');
  const [libraryViewMode, setLibraryViewMode] = useState('glass'); // 2 glass presets: glass, apple-spotlight
  const [libraryLayout, setLibraryLayout] = useState('list'); // 'list' or 'grid'
  const [historyView, setHistoryView] = useState(null); // { heuristicId, fieldName }
  const [expandedHeuristic, setExpandedHeuristic] = useState(null); // ID of expanded heuristic
  const [hoveredHeuristic, setHoveredHeuristic] = useState(null); // ID of hovered heuristic
  const [editingField, setEditingField] = useState(null); // { heuristicId, fieldName, value }
  const [editModeHeuristic, setEditModeHeuristic] = useState(null); // ID of heuristic in edit mode

  const uniqueId = useMemo(() => `mab-${Math.random().toString(36).substr(2, 9)}`, []);

  const handleAddHeuristic = useCallback(async () => {
    const success = await addHeuristic();
    if (success) {
      resetDraft();
      reset();
    }
  }, [addHeuristic, resetDraft, reset]);

  const handleExport = useCallback(() => {
    if (heuristics.length === 0) return;
    
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `mobile-heuristics-${timestamp}`;
    
    if (exportFormat === 'csv') {
      downloadFile(exportToCSV(heuristics), `${filename}.csv`, 'text/csv');
    } else {
      downloadFile(exportToJSON(heuristics), `${filename}.json`, 'application/json');
    }
  }, [heuristics, exportFormat]);

  const canProceed = useMemo(() => {
    switch (step) {
      case 1: return !!draft.step1_who_element;
      case 2: return !!draft.step2_where_parent;
      case 3: return !!draft.step3a_category && !!draft.step3b_subcategory;
      case 4: return !!draft.step4_condition_type;
      case 5: return !!draft.step5_action;
      case 6: return !!draft.step6_output;
      default: return false;
    }
  }, [step, draft]);

  // Inline styles
  const styles = {
    app: {
      display: 'flex',
      width: '100%',
      height: '100vh',
      background: colors.background,
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
      color: colors.primaryText,
      overflow: 'hidden',
    },
    sidebar: {
      width: '200px',
      background: colors.cardBackground,
      borderRight: `1px solid ${colors.border}`,
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
    },
    sidebarHeader: {
      padding: '20px 24px',
      borderBottom: `1px solid ${colors.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    logoText: {
      fontSize: '11px',
      fontWeight: '600',
      letterSpacing: '0.05em',
      lineHeight: 1.2,
    },
    version: {
      fontSize: '11px',
      color: colors.secondaryText,
      fontFamily: 'monospace',
    },
    createButton: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      padding: '12px 16px',
      background: colors.cardBackground,
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      color: colors.primaryText,
      transition: 'all 200ms ease-out',
    },
    navItem: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '10px 16px',
      background: 'transparent',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      color: colors.secondaryText,
      transition: 'background 200ms ease-out',
    },
    main: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    },
    wizardHeader: {
      padding: '24px 40px',
      background: colors.cardBackground,
      borderBottom: `1px solid ${colors.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0',
    },
    stepIndicator: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    stepNumber: (isActive, isCompleted) => ({
      width: '28px',
      height: '28px',
      borderRadius: '50%',
      background: isActive || isCompleted ? colors.primaryText : 'transparent',
      border: `2px solid ${isActive || isCompleted ? colors.primaryText : colors.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      fontWeight: '600',
      color: isActive || isCompleted ? colors.cardBackground : colors.secondaryText,
      transition: 'all 200ms ease-out',
    }),
    stepLabel: (isActive, isCompleted) => ({
      fontSize: '14px',
      fontWeight: isActive ? '500' : '400',
      color: isActive || isCompleted ? colors.primaryText : colors.secondaryText,
    }),
    stepConnector: (isCompleted) => ({
      width: '40px',
      height: '2px',
      background: isCompleted ? colors.primaryText : colors.border,
      margin: '0 12px',
      borderRadius: '1px',
      transition: 'background 200ms ease-out',
    }),
    wizardContent: {
      flex: 1,
      overflow: 'auto',
      padding: '48px 80px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    stepContainer: {
      maxWidth: '720px',
      width: '100%',
      animation: 'fadeIn 300ms ease-out',
    },
    stepTitle: {
      fontSize: '28px',
      fontWeight: '500',
      margin: '0 0 12px 0',
      textAlign: 'center',
    },
    stepDescription: {
      fontSize: '15px',
      color: colors.secondaryText,
      margin: '0 0 40px 0',
      textAlign: 'center',
    },
    divider: {
      height: '1px',
      background: colors.border,
      margin: '48px 0 32px',
    },
    buttonRow: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    buttonPrimary: (disabled) => ({
      padding: '12px 32px',
      background: disabled ? colors.border : colors.primaryText,
      border: 'none',
      borderRadius: '8px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      color: colors.cardBackground,
      transition: 'all 200ms ease-out',
    }),
    buttonSecondary: {
      padding: '12px 24px',
      background: 'transparent',
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      color: colors.secondaryText,
    },
    buttonSuccess: {
      padding: '12px 32px',
      background: colors.success,
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      color: colors.cardBackground,
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '16px',
    },
    optionCard: (isSelected) => ({
      padding: '24px 16px',
      background: isSelected ? colors.cardBackground : 'transparent',
      border: `1px solid ${isSelected ? colors.primaryText : colors.border}`,
      borderRadius: '12px',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px',
      transition: 'all 200ms ease-out',
    }),
    optionLabel: (isSelected) => ({
      fontSize: '13px',
      fontWeight: '400',
      color: isSelected ? colors.primaryText : colors.secondaryText,
    }),
    select: {
      width: '100%',
      padding: '14px 16px',
      background: colors.cardBackground,
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
      fontSize: '14px',
      color: colors.primaryText,
      cursor: 'pointer',
      marginBottom: '16px',
      textAlign: 'center',
      paddingLeft: '4px',
      paddingRight: '4px',
    },
    input: {
      width: '100%',
      padding: '14px 16px',
      background: colors.cardBackground,
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
      fontSize: '14px',
      color: colors.primaryText,
      boxSizing: 'border-box',
      marginBottom: '16px',
    },
    label: {
      display: 'block',
      fontSize: '12px',
      fontWeight: '500',
      color: colors.secondaryText,
      marginBottom: '8px',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    resultsPanel: {
      width: '400px',
      background: colors.cardBackground,
      borderLeft: `1px solid ${colors.border}`,
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
    },
    resultsPanelHeader: {
      padding: '20px 24px',
      borderBottom: `1px solid ${colors.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    badge: {
      background: `${colors.primaryText}10`,
      padding: '4px 10px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '500',
    },
    connectionStatus: {
      padding: '12px 24px',
      borderBottom: `1px solid ${colors.border}`,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    statusDot: (isConnected) => ({
      width: '8px',
      height: '8px',
      background: isConnected ? colors.success : colors.secondaryText,
      borderRadius: '50%',
    }),
    cardsList: {
      flex: 1,
      overflow: 'auto',
      padding: '20px',
    },
    heuristicCard: {
      background: colors.cardBackground,
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
      marginBottom: '12px',
      overflow: 'hidden',
    },
    cardHeader: {
      padding: '12px 16px',
      borderBottom: `1px solid ${colors.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    cardBody: {
      padding: '16px',
    },
    cardField: {
      marginBottom: '12px',
    },
    cardFieldLabel: {
      fontSize: '10px',
      fontWeight: '500',
      color: colors.secondaryText,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: '4px',
    },
    cardFieldValue: {
      fontSize: '13px',
      color: colors.primaryText,
      lineHeight: '1.5',
    },
    exportFooter: {
      padding: '16px 24px',
      borderTop: `1px solid ${colors.border}`,
      display: 'flex',
      gap: '12px',
    },
    exportSelect: {
      padding: '10px 16px',
      background: colors.cardBackground,
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
      fontSize: '14px',
      color: colors.primaryText,
      cursor: 'pointer',
    },
    exportButton: {
      flex: 1,
      padding: '10px 16px',
      background: colors.cardBackground,
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      color: colors.primaryText,
    },
  };

  // Render wizard step content
  const renderStepContent = () => {
    switch (step) {
      case 1: // WHO AM I? - Element Selection
        return (
          <div style={styles.stepContainer}>
            <h1 style={styles.stepTitle}>Who Am I?</h1>
            <p style={styles.stepDescription}>Select the element type this heuristic applies to</p>
            
            <label style={styles.label}>Element Type</label>
    <select
              value={draft.step1_who_element}
              onChange={(e) => updateDraft('step1_who_element', e.target.value)}
              style={styles.select}
            >
              <option value="">Select element type...</option>
              {ELEMENT_OPTIONS.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>

            <div style={styles.divider} />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={nextStep}
                disabled={!canProceed}
                style={styles.buttonPrimary(!canProceed)}
              >
                Continue
              </button>
            </div>
  </div>
);

      case 2: // WHERE DO I LIVE? - Parent Selection
  return (
          <div style={styles.stepContainer}>
            <h1 style={styles.stepTitle}>Where Do I Live?</h1>
            <p style={styles.stepDescription}>Select the parent container</p>
            
            <div style={styles.grid}>
              {PARENT_OPTIONS.map(opt => (
              <button
                  key={opt.value}
                  onClick={() => updateDraft('step2_where_parent', opt.value)}
                  style={styles.optionCard(draft.step2_where_parent === opt.value)}
                >
                  <Icon 
                    name="containers" 
                    size={24} 
                    color={draft.step2_where_parent === opt.value ? colors.primaryText : colors.secondaryText} 
                  />
                  <span style={styles.optionLabel(draft.step2_where_parent === opt.value)}>
                    {opt.label}
                  </span>
              </button>
              ))}
            </div>

            <div style={styles.divider} />
            <div style={styles.buttonRow}>
              <button onClick={prevStep} style={styles.buttonSecondary}>Back</button>
              <button onClick={nextStep} disabled={!canProceed} style={styles.buttonPrimary(!canProceed)}>
                Continue
              </button>
            </div>
          </div>
        );

      case 3: // WHAT TYPE? - Category & Subcategory
  return (
          <div style={styles.stepContainer}>
            <h1 style={styles.stepTitle}>What Type?</h1>
            <p style={styles.stepDescription}>Select the category and subcategory</p>
            
            <label style={styles.label}>Category</label>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: '16px',
              marginBottom: '24px' 
            }}>
              {CATEGORIES.map(cat => (
        <button
          key={cat.id}
                  onClick={() => {
                    updateDraft('step3a_category', cat.id);
                    updateDraft('step3b_subcategory', '');
                  }}
                  style={{
                    padding: '40px 24px',
                    background: draft.step3a_category === cat.id ? '#2563EB' : '#3B7DED',
                    border: draft.step3a_category === cat.id ? '3px solid #1D4ED8' : '3px solid transparent',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 200ms ease-out',
                  }}
                >
                  <span style={{
                    fontSize: '22px',
                    fontWeight: '600',
                    fontStyle: 'italic',
                    color: '#FFFFFF',
                  }}>
                    {cat.name}
                  </span>
        </button>
      ))}
    </div>

            {draft.step3a_category && (
              <>
                <label style={styles.label}>Subcategory</label>
                <select
                  value={draft.step3b_subcategory}
                  onChange={(e) => updateDraft('step3b_subcategory', e.target.value)}
                  style={styles.select}
                >
                  <option value="">Select subcategory...</option>
                  {SUBCATEGORIES[draft.step3a_category]?.map(sub => (
                    <option key={sub} value={sub}>{sub.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>
                  ))}
                </select>
              </>
            )}

            <div style={styles.divider} />
            <div style={styles.buttonRow}>
              <button onClick={prevStep} style={styles.buttonSecondary}>Back</button>
              <button onClick={nextStep} disabled={!canProceed} style={styles.buttonPrimary(!canProceed)}>
                Continue
              </button>
            </div>
          </div>
        );

      case 4: // WHAT CONDITION?
  return (
          <div style={styles.stepContainer}>
            <h1 style={styles.stepTitle}>What Condition?</h1>
            <p style={styles.stepDescription}>When should this heuristic apply?</p>
            
            <label style={styles.label}>Condition Type</label>
            <select
              value={draft.step4_condition_type}
              onChange={(e) => updateDraft('step4_condition_type', e.target.value)}
              style={styles.select}
            >
              {CONDITION_TYPES.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            {draft.step4_condition_type && draft.step4_condition_type !== 'none' && (
              <>
                <label style={styles.label}>Condition Value</label>
                <input
                  type="text"
                  value={draft.step4_condition_value}
                  onChange={(e) => updateDraft('step4_condition_value', e.target.value)}
                  placeholder="e.g., lte_200px, gt_100px, true, 15_19px"
                  style={styles.input}
                />
        </>
      )}
      
            <div style={styles.divider} />
            <div style={styles.buttonRow}>
              <button onClick={prevStep} style={styles.buttonSecondary}>Back</button>
              <button onClick={nextStep} disabled={!canProceed} style={styles.buttonPrimary(!canProceed)}>
                Continue
              </button>
          </div>
    </div>
  );

      case 5: // WHAT ACTION?
        return (
          <div style={styles.stepContainer}>
            <h1 style={styles.stepTitle}>What Action?</h1>
            <p style={styles.stepDescription}>What transformation should be applied?</p>
            
            <label style={styles.label}>Action</label>
            <div style={{ ...styles.grid, gridTemplateColumns: 'repeat(3, 1fr)' }}>
              {ACTION_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => updateDraft('step5_action', opt.value)}
                  style={{
                    ...styles.optionCard(draft.step5_action === opt.value),
                    padding: '16px 12px',
                  }}
                >
                  <span style={styles.optionLabel(draft.step5_action === opt.value)}>
                    {opt.label}
                  </span>
                </button>
              ))}
          </div>

            <div style={styles.divider} />
            <div style={styles.buttonRow}>
              <button onClick={prevStep} style={styles.buttonSecondary}>Back</button>
              <button onClick={nextStep} disabled={!canProceed} style={styles.buttonPrimary(!canProceed)}>
                Continue
              </button>
            </div>
          </div>
        );

      case 6: // WHAT OUTPUT?
        return (
          <div style={styles.stepContainer}>
            <h1 style={styles.stepTitle}>What Output?</h1>
            <p style={styles.stepDescription}>Define the mobile transformation result</p>
            
            <label style={styles.label}>Output Value</label>
            <input
              type="text"
              value={draft.step6_output}
              onChange={(e) => updateDraft('step6_output', e.target.value)}
              placeholder="e.g., width-100pct_height-auto, font_size-16px"
              style={styles.input}
            />

            {/* Summary Preview */}
            <div style={{
              background: colors.background,
              border: `1px solid ${colors.border}`,
              borderRadius: '12px',
              padding: '24px',
              marginTop: '24px',
            }}>
              <h3 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '16px' }}>Summary</h3>
              {[
                { label: 'Element', value: draft.step1_who_element },
                { label: 'Parent', value: draft.step2_where_parent },
                { label: 'Category', value: `${draft.step3a_category} / ${draft.step3b_subcategory}` },
                { label: 'Condition', value: draft.step4_condition_type === 'none' ? 'Always' : `${draft.step4_condition_type}: ${draft.step4_condition_value}` },
                { label: 'Action', value: draft.step5_action },
                { label: 'Output', value: draft.step6_output || '—' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', color: colors.secondaryText, textTransform: 'uppercase' }}>{item.label}</span>
                  <span style={{ fontSize: '13px', color: colors.primaryText }}>{item.value}</span>
            </div>
              ))}
          </div>

            <div style={styles.divider} />
            <div style={styles.buttonRow}>
              <button onClick={prevStep} style={styles.buttonSecondary}>Back</button>
              <button
                onClick={handleAddHeuristic}
                disabled={!canProceed}
                style={canProceed ? styles.buttonSuccess : styles.buttonPrimary(true)}
              >
                Save Heuristic
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // ============================================================================
  // ACCORDION COMPONENT SYSTEM (From ComponentA_RuleAccordionShowcase)
  // ============================================================================

  // Chevron Icon Component
  const ChevronIcon = ({ style }) => (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );

  // Get preset styles for accordion display modes
  const getPresetStyles = (preset, isHovered, isExpanded) => {
    const baseTransition = `all 300ms cubic-bezier(0.4, 0, 0.2, 1)`;
    const borderRadius = 12;
    const padding = 16;
    
    const textPrimary = colors.primaryText;
    const textSecondary = colors.secondaryText;
    const cardBackground = colors.cardBackground;
    
    // Two glass-style presets
    const presets = {
      // Glass: Glass morphism with blur and transparency
      'glass': {
        outer: {
          row: {
            background: 'rgba(255,255,255,0.25)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            borderRadius: 16,
            border: '1px solid rgba(255,255,255,0.3)',
            boxShadow: isHovered 
              ? '0 12px 40px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.5)'
              : '0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.4)',
            cursor: 'pointer',
            transition: baseTransition,
            marginBottom: '12px',
            overflow: 'hidden',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
          },
        },
      },
      // Apple Spotlight: Clean Apple-style with subtle background
      'apple-spotlight': {
        outer: {
          row: {
            background: 'rgba(255,255,255,0.72)',
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            borderRadius: 12,
            border: '0.5px solid rgba(0,0,0,0.1)',
            boxShadow: '0 25px 50px rgba(0,0,0,0.15), 0 0 0 0.5px rgba(0,0,0,0.05)',
            cursor: 'pointer',
            transition: baseTransition,
            marginBottom: '12px',
            overflow: 'hidden',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
          },
        },
      },
    };
    
    return presets[preset] || presets['glass'];
  };

  // Render Library View
  const renderLibraryView = () => {
    return (
      <main style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        background: colors.cardBackground,
        overflow: 'hidden',
      }}>
        {/* Minimal Header */}
        <div style={{
          padding: '32px 48px',
          borderBottom: `1px solid ${colors.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <h1 style={{ 
              fontSize: '20px', 
              fontWeight: '500', 
              margin: 0,
              color: colors.primaryText,
            }}>Heuristics</h1>
            <span style={{ 
              fontSize: '13px', 
              color: colors.secondaryText,
              fontFamily: 'monospace',
            }}>{heuristics.length}</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Layout Toggle: List/Grid */}
            <div style={{ display: 'flex', borderRadius: '6px', overflow: 'hidden', border: `1px solid ${colors.border}` }}>
              <button
                onClick={() => setLibraryLayout('list')}
                style={{
                  padding: '8px 12px',
                  background: libraryLayout === 'list' ? colors.primaryText : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'all 150ms ease-out',
                }}
                title="List View"
              >
                <Icon name="list" size={14} color={libraryLayout === 'list' ? colors.cardBackground : colors.secondaryText} />
              </button>
              <button
                onClick={() => setLibraryLayout('grid')}
                style={{
                  padding: '8px 12px',
                  background: libraryLayout === 'grid' ? colors.primaryText : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'all 150ms ease-out',
                }}
                title="Grid View"
              >
                <Icon name="grid" size={14} color={libraryLayout === 'grid' ? colors.cardBackground : colors.secondaryText} />
              </button>
            </div>
            
            {/* View Mode Selector */}
            <select
              value={libraryViewMode}
              onChange={(e) => setLibraryViewMode(e.target.value)}
              style={{
                padding: '8px 12px',
                background: 'transparent',
                border: `1px solid ${colors.border}`,
                borderRadius: '6px',
                fontSize: '13px',
                color: colors.primaryText,
                cursor: 'pointer',
              }}
            >
              {VIEW_MODES.map(mode => (
                <option key={mode.id} value={mode.id}>{mode.name}</option>
              ))}
            </select>
            
            {isWixConnected && (
              <button 
                onClick={refreshFromCMS}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer', 
                  padding: '8px',
                  color: colors.secondaryText,
                  display: 'flex',
                  alignItems: 'center',
                }}
                title="Refresh from CMS"
              >
                <Icon name="refresh" size={16} color={colors.secondaryText} />
              </button>
            )}
            
            {heuristics.length > 0 && (
              <>
                <select
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    background: 'transparent',
                    border: `1px solid ${colors.border}`,
                    borderRadius: '6px',
                    fontSize: '13px',
                    color: colors.primaryText,
                    cursor: 'pointer',
                  }}
                >
                  <option value="csv">CSV</option>
                  <option value="json">JSON</option>
                </select>
                <button 
                  onClick={handleExport} 
                  style={{
                    padding: '8px 16px',
                    background: 'transparent',
                    border: `1px solid ${colors.border}`,
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    color: colors.primaryText,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  Export
                </button>
              </>
            )}
          </div>
        </div>

        {error && (
          <div style={{ 
            padding: '12px 48px', 
            background: '#FEF2F2', 
            color: colors.error, 
            fontSize: '13px',
            borderBottom: `1px solid ${colors.border}`,
          }}>
            {error}
          </div>
        )}

        {/* Content - Accordion List or Grid */}
        <div style={{ 
          flex: 1, 
          overflow: 'auto',
          padding: libraryLayout === 'grid' ? '24px' : '0',
        }}>
          {isLoading ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '120px 20px', 
              color: colors.secondaryText,
            }}>
              <div style={{ fontSize: '14px' }}>Loading...</div>
            </div>
          ) : heuristics.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '120px 20px', 
              color: colors.secondaryText,
            }}>
              <div style={{ fontSize: '14px', marginBottom: '24px' }}>No heuristics yet</div>
              <button
                onClick={() => {
                  setCurrentView('wizard');
                  reset();
                  resetDraft();
                }}
                style={{
                  padding: '10px 20px',
                  background: colors.primaryText,
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  color: colors.cardBackground,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Icon name="plus" size={14} color={colors.cardBackground} />
                Create First Heuristic
              </button>
            </div>
          ) : (
            <div style={libraryLayout === 'grid' ? {
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
              gap: '24px',
            } : undefined}>
              {heuristics.map((h) => {
                const isExpanded = expandedHeuristic === h.id;
                const isHovered = hoveredHeuristic === h.id;
                
                // Extract subject from subcategory
                const subject = h.step3b_subcategory 
                  ? h.step3b_subcategory.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
                  : '—';
                
                // Get preset styles
                const presetStyles = getPresetStyles(libraryViewMode, isHovered, isExpanded);
                
                return (
                  <div key={h.id} style={{
                    marginBottom: libraryLayout === 'grid' ? '0' : '12px',
                  }}>
                    {/* Collapsed Row - Glass Style */}
                    <div 
                      style={{
                        ...presetStyles.outer.row,
                      }}
                      onMouseEnter={() => setHoveredHeuristic(h.id)}
                      onMouseLeave={() => setHoveredHeuristic(null)}
                      onClick={(e) => {
                        // Don't toggle if clicking on interactive elements
                        if (e.target.tagName === 'SELECT' || e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') {
                          return;
                        }
                        setExpandedHeuristic(isExpanded ? null : h.id);
                      }}
                    >
                      {/* Inner wrapper for glass preset */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: libraryViewMode === 'glass' ? '20px 24px' : '14px 16px',
                        background: isHovered && libraryViewMode === 'glass' ? 'rgba(255,255,255,0.15)' : 
                                   isHovered && libraryViewMode === 'apple-spotlight' ? 'rgba(0,122,255,0.1)' : 'transparent',
                        transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                        borderRadius: libraryViewMode === 'apple-spotlight' ? '8px' : '0',
                        margin: libraryViewMode === 'apple-spotlight' ? '4px' : '0',
                      }}>
                        {/* Left side: Element name + category */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ 
                            fontSize: libraryViewMode === 'glass' ? '16px' : '15px',
                            fontWeight: libraryViewMode === 'glass' ? '600' : '500',
                            color: colors.primaryText,
                            letterSpacing: '-0.01em',
                            marginBottom: '4px',
                          }}>
                            {(h.step1_who_element || 'Element').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </div>
                          <div style={{ 
                            fontSize: '13px',
                            color: colors.secondaryText,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}>
                            {(h.step3a_category || 'Layout').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            {h.step2_where_parent && h.step2_where_parent !== 'any' && (
                              <> · {(h.step2_where_parent || '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</>
                            )}
                          </div>
                        </div>

                        {/* Right side: ID, Status, Chevron */}
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: libraryViewMode === 'glass' ? '16px' : '10px',
                        }}>
                          {/* ID Badge */}
                          <div style={{ 
                            fontSize: '12px', 
                            fontFamily: 'monospace',
                            color: colors.primaryText,
                            background: libraryViewMode === 'glass' 
                              ? 'rgba(255,255,255,0.4)'
                              : 'rgba(0,0,0,0.05)',
                            backdropFilter: libraryViewMode === 'glass' ? 'blur(10px)' : 'none',
                            padding: '6px 12px',
                            borderRadius: libraryViewMode === 'glass' ? '20px' : '6px',
                            border: libraryViewMode === 'glass' ? '1px solid rgba(255,255,255,0.3)' : 'none',
                          }}>
                            {h.id}
                          </div>

                          {/* Status */}
                          <div onClick={(e) => e.stopPropagation()}>
                            <select
                              value={h.status || 'Active'}
                              onChange={(e) => updateStatus(h.id, e.target.value)}
                              style={{
                                padding: '6px 12px',
                                fontSize: '13px',
                                fontWeight: libraryViewMode === 'glass' ? '600' : '500',
                                border: 'none',
                                borderRadius: '6px',
                                background: 'transparent',
                                color: (() => {
                                  const status = h.status || 'Active';
                                  if (status === 'Active') return '#22C55E';
                                  if (status === 'Pending') return '#F59E0B';
                                  if (status === 'Canceled') return '#6B7280';
                                  return '#22C55E';
                                })(),
                                cursor: 'pointer',
                                outline: 'none',
                                appearance: 'none',
                                WebkitAppearance: 'none',
                                MozAppearance: 'none',
                              }}
                            >
                              {STATUS_OPTIONS.map(status => (
                                <option key={status.value} value={status.value}>{status.value}</option>
                              ))}
                            </select>
                          </div>

                          {/* Chevron Icon */}
                          <div style={{ 
                            transition: 'transform 200ms ease-out',
                            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                            display: 'flex',
                            alignItems: 'center',
                          }}>
                            <ChevronIcon style={{ 
                              width: libraryViewMode === 'glass' ? 18 : 16, 
                              height: libraryViewMode === 'glass' ? 18 : 16, 
                              color: colors.secondaryText 
                            }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div style={{
                        padding: '32px 48px 40px',
                        background: colors.background,
                      }}>
                        {/* Edit Mode Controls */}
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'flex-end',
                          marginBottom: '24px',
                          gap: '12px',
                        }}>
                          {editModeHeuristic === h.id ? (
                            <>
                              <button
                                onClick={() => {
                                  setEditModeHeuristic(null);
                                  setEditingField(null);
                                }}
                                style={{
                                  padding: '10px 18px',
                                  background: colors.cardBackground,
                                  border: `1px solid ${colors.border}`,
                                  borderRadius: '8px',
                                  cursor: editModeHeuristic === h.id ? 'pointer' : 'default',
                                  fontSize: '13px',
                                  fontWeight: '500',
                                  color: colors.secondaryText,
                                  transition: 'all 200ms ease-out',
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = colors.background;
                                  e.currentTarget.style.transform = 'translateY(-1px)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = colors.cardBackground;
                                  e.currentTarget.style.transform = 'translateY(0)';
                                }}
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => {
                                  setEditModeHeuristic(null);
                                  setEditingField(null);
                                }}
                                style={{
                                  padding: '10px 20px',
                                  background: colors.primaryText,
                                  border: 'none',
                                  borderRadius: '8px',
                                  cursor: editModeHeuristic === h.id ? 'pointer' : 'default',
                                  fontSize: '13px',
                                  fontWeight: '500',
                                  color: colors.cardBackground,
                                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                  transition: 'all 200ms ease-out',
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.transform = 'translateY(-2px)';
                                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform = 'translateY(0)';
                                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                                }}
                              >
                                Save Changes
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => setEditModeHeuristic(h.id)}
                              style={{
                                padding: '10px 18px',
                                background: colors.cardBackground,
                                border: `1px solid ${colors.border}`,
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '13px',
                                fontWeight: '500',
                                color: colors.primaryText,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                transition: 'all 200ms ease-out',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = colors.primaryText;
                                e.currentTarget.style.color = colors.cardBackground;
                                e.currentTarget.style.transform = 'translateY(-1px)';
                                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = colors.cardBackground;
                                e.currentTarget.style.color = colors.primaryText;
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                              }}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                              </svg>
                              Edit
                            </button>
                          )}
                        </div>

                        {/* Editable Summary Row - Matches Collapsed Structure */}
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: '180px 140px 140px 1fr 100px 40px',
                          gap: '16px',
                          marginBottom: '32px',
                          padding: '20px',
                          background: colors.cardBackground,
                          borderRadius: '8px',
                          border: `1px solid ${colors.border}`,
                        }}>
                          {/* ID (Read-only) */}
                          <div>
                            <div style={{ 
                              fontSize: '11px', 
                              fontWeight: '500',
                              color: colors.secondaryText,
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                              marginBottom: '8px',
                            }}>ID</div>
                            <div style={{ 
                              fontSize: '13px', 
                              fontFamily: 'monospace',
                              color: colors.secondaryText,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}>
                              {h.id}
                            </div>
                          </div>

                          {/* Category (Editable) */}
                          <div>
                            <div style={{ 
                              fontSize: '11px', 
                              fontWeight: '500',
                              color: colors.secondaryText,
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                              marginBottom: '8px',
                            }}>Category</div>
                            {editModeHeuristic === h.id && editingField?.heuristicId === h.id && editingField?.fieldName === 'step3a_category' ? (
                              <select
                                value={editingField.value}
                                onChange={(e) => setEditingField({ ...editingField, value: e.target.value })}
                                onBlur={() => {
                                  updateHeuristicField(h.id, 'step3a_category', editingField.value);
                                  setEditingField(null);
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    updateHeuristicField(h.id, 'step3a_category', editingField.value);
                                    setEditingField(null);
                                  }
                                  if (e.key === 'Escape') {
                                    setEditingField(null);
                                  }
                                }}
                                autoFocus
                                style={{
                                  width: '100%',
                                  padding: '6px 8px',
                                  fontSize: '13px',
                                  border: `1px solid ${colors.border}`,
                                  borderRadius: '4px',
                                }}
                              >
                                {CATEGORIES.map(cat => (
                                  <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <div 
                                onClick={() => editModeHeuristic === h.id && setEditingField({ heuristicId: h.id, fieldName: 'step3a_category', value: h.step3a_category })}
                                style={{ 
                                  fontSize: '13px', 
                                  color: colors.primaryText,
                                  cursor: editModeHeuristic === h.id ? 'pointer' : 'default',
                                  padding: '6px 8px',
                                  borderRadius: '4px',
                                  border: `1px solid transparent`,
                                  transition: 'all 150ms',
                                }}
                                onMouseEnter={(e) => editModeHeuristic === h.id && (e.currentTarget.style.background = colors.background)}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                              >
                                {(h.step3a_category || 'Layout').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </div>
                            )}
                          </div>

                          {/* Subject (Editable) */}
                          <div>
                            <div style={{ 
                              fontSize: '11px', 
                              fontWeight: '500',
                              color: colors.secondaryText,
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                              marginBottom: '8px',
                            }}>Subject</div>
                            {editModeHeuristic === h.id && editingField?.heuristicId === h.id && editingField?.fieldName === 'step3b_subcategory' ? (
                              <select
                                value={editingField.value}
                                onChange={(e) => setEditingField({ ...editingField, value: e.target.value })}
                                onBlur={() => {
                                  updateHeuristicField(h.id, 'step3b_subcategory', editingField.value);
                                  setEditingField(null);
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    updateHeuristicField(h.id, 'step3b_subcategory', editingField.value);
                                    setEditingField(null);
                                  }
                                  if (e.key === 'Escape') {
                                    setEditingField(null);
                                  }
                                }}
                                autoFocus
                                style={{
                                  width: '100%',
                                  padding: '6px 8px',
                                  fontSize: '13px',
                                  border: `1px solid ${colors.border}`,
                                  borderRadius: '4px',
                                }}
                              >
                                {SUBCATEGORIES[h.step3a_category]?.map(sub => (
                                  <option key={sub} value={sub}>
                                    {sub.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <div 
                                onClick={() => editModeHeuristic === h.id && setEditingField({ heuristicId: h.id, fieldName: 'step3b_subcategory', value: h.step3b_subcategory })}
                                style={{ 
                                  fontSize: '13px', 
                                  color: colors.primaryText,
                                  cursor: editModeHeuristic === h.id ? 'pointer' : 'default',
                                  padding: '6px 8px',
                                  borderRadius: '4px',
                                  border: `1px solid transparent`,
                                  transition: 'all 150ms',
                                }}
                                onMouseEnter={(e) => editModeHeuristic === h.id && (e.currentTarget.style.background = colors.background)}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                              >
                                {subject}
                              </div>
                            )}
                          </div>

                          {/* Element (Editable) */}
                          <div>
                            <div style={{ 
                              fontSize: '11px', 
                              fontWeight: '500',
                              color: colors.secondaryText,
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                              marginBottom: '8px',
                            }}>Element</div>
                            {editModeHeuristic === h.id && editingField?.heuristicId === h.id && editingField?.fieldName === 'step1_who_element' ? (
                              <select
                                value={editingField.value}
                                onChange={(e) => setEditingField({ ...editingField, value: e.target.value })}
                                onBlur={() => {
                                  updateHeuristicField(h.id, 'step1_who_element', editingField.value);
                                  setEditingField(null);
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    updateHeuristicField(h.id, 'step1_who_element', editingField.value);
                                    setEditingField(null);
                                  }
                                  if (e.key === 'Escape') {
                                    setEditingField(null);
                                  }
                                }}
                                autoFocus
                                style={{
                                  width: '100%',
                                  padding: '6px 8px',
                                  fontSize: '13px',
                                  border: `1px solid ${colors.border}`,
                                  borderRadius: '4px',
                                }}
                              >
                                {ELEMENT_OPTIONS.map(opt => (
                                  <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <div 
                                onClick={() => editModeHeuristic === h.id && setEditingField({ heuristicId: h.id, fieldName: 'step1_who_element', value: h.step1_who_element })}
                                style={{ 
                                  fontSize: '13px', 
                                  color: colors.primaryText,
                                  cursor: editModeHeuristic === h.id ? 'pointer' : 'default',
                                  padding: '6px 8px',
                                  borderRadius: '4px',
                                  border: `1px solid transparent`,
                                  transition: 'all 150ms',
                                }}
                                onMouseEnter={(e) => editModeHeuristic === h.id && (e.currentTarget.style.background = colors.background)}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                              >
                                {(h.step1_who_element || '—').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </div>
                            )}
                          </div>

                          {/* Status (Editable) */}
                          <div>
                            <div style={{ 
                              fontSize: '11px', 
                              fontWeight: '500',
                              color: colors.secondaryText,
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                              marginBottom: '8px',
                            }}>Status</div>
                            <select
                              value={h.status || 'Active'}
                              onChange={(e) => updateStatus(h.id, e.target.value)}
                              disabled={editModeHeuristic !== h.id}
                              style={{
                                padding: '6px 8px',
                                fontSize: '13px',
                                fontWeight: '500',
                                border: `1px solid ${colors.border}`,
                                borderRadius: '4px',
                                background: (() => {
                                  const status = h.status || 'Active';
                                  if (status === 'Active') return '#F0FDF4';
                                  if (status === 'Pending') return '#FEF3C7';
                                  if (status === 'Canceled') return '#F3F4F6';
                                  return '#F0FDF4';
                                })(),
                                color: (() => {
                                  const status = h.status || 'Active';
                                  if (status === 'Active') return '#166534';
                                  if (status === 'Pending') return '#92400E';
                                  if (status === 'Canceled') return '#6B7280';
                                  return '#166534';
                                })(),
                                cursor: editModeHeuristic === h.id ? 'pointer' : 'not-allowed',
                                outline: 'none',
                                width: '100%',
                                opacity: editModeHeuristic === h.id ? 1 : 0.6,
                              }}
                            >
                              {STATUS_OPTIONS.map(status => (
                                <option key={status.value} value={status.value}>{status.value}</option>
                              ))}
                            </select>
                          </div>

                          {/* Empty space for alignment */}
                          <div></div>
                        </div>

                        {/* Full Heuristic Flow */}
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '16px',
                        }}>
                          {/* Step 2: Parent (Editable) */}
                          <div className={`${uniqueId}-step-card`} style={{
                            padding: '18px 20px',
                            background: colors.cardBackground,
                            borderRadius: '10px',
                            border: `1px solid ${colors.border}`,
                            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                            transition: 'all 250ms ease-out',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = colors.secondaryText;
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = colors.border;
                            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}>
                            <div style={{ 
                              fontSize: '10px', 
                              fontWeight: '600',
                              color: colors.secondaryText,
                              textTransform: 'uppercase',
                              letterSpacing: '0.08em',
                              marginBottom: '10px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                            }}>
                              <span style={{ 
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '18px',
                                height: '18px',
                                borderRadius: '50%',
                                background: 'rgba(0,0,0,0.06)',
                                fontSize: '9px',
                                fontWeight: '600',
                              }}>2</span>
                              Parent Container
                            </div>
                            {editModeHeuristic === h.id && editingField?.heuristicId === h.id && editingField?.fieldName === 'step2_where_parent' ? (
                              <select
                                value={editingField.value}
                                onChange={(e) => setEditingField({ ...editingField, value: e.target.value })}
                                onBlur={() => {
                                  updateHeuristicField(h.id, 'step2_where_parent', editingField.value);
                                  setEditingField(null);
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    updateHeuristicField(h.id, 'step2_where_parent', editingField.value);
                                    setEditingField(null);
                                  }
                                  if (e.key === 'Escape') {
                                    setEditingField(null);
                                  }
                                }}
                                autoFocus
                                style={{
                                  width: '100%',
                                  padding: '8px 12px',
                                  fontSize: '15px',
                                  border: `1px solid ${colors.border}`,
                                  borderRadius: '4px',
                                }}
                              >
                                {PARENT_OPTIONS.map(opt => (
                                  <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <div 
                                onClick={() => editModeHeuristic === h.id && setEditingField({ heuristicId: h.id, fieldName: 'step2_where_parent', value: h.step2_where_parent })}
                                className={editModeHeuristic === h.id ? `${uniqueId}-editable-field` : ''}
                                style={{ 
                                  fontSize: '15px', 
                                  color: colors.primaryText,
                                  cursor: editModeHeuristic === h.id ? 'pointer' : 'default',
                                  padding: '8px 12px',
                                  borderRadius: '6px',
                                }}
                              >
                                {(h.step2_where_parent || 'Any').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </div>
                            )}
                          </div>

                          {/* Step 4: Condition (Editable) */}
                          <div className={`${uniqueId}-step-card`} style={{
                            padding: '18px 20px',
                            background: colors.cardBackground,
                            borderRadius: '10px',
                            border: `1px solid ${colors.border}`,
                            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                            transition: 'all 250ms ease-out',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = colors.secondaryText;
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = colors.border;
                            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}>
                            <div style={{ 
                              fontSize: '10px', 
                              fontWeight: '600',
                              color: colors.secondaryText,
                              textTransform: 'uppercase',
                              letterSpacing: '0.08em',
                              marginBottom: '10px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                            }}>
                              <span style={{ 
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '18px',
                                height: '18px',
                                borderRadius: '50%',
                                background: 'rgba(0,0,0,0.06)',
                                fontSize: '9px',
                                fontWeight: '600',
                              }}>4</span>
                              Condition
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                              {/* Condition Type */}
                              {editModeHeuristic === h.id && editingField?.heuristicId === h.id && editingField?.fieldName === 'step4_condition_type' ? (
                                <select
                                  value={editingField.value}
                                  onChange={(e) => setEditingField({ ...editingField, value: e.target.value })}
                                  onBlur={() => {
                                    updateHeuristicField(h.id, 'step4_condition_type', editingField.value);
                                    setEditingField(null);
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      updateHeuristicField(h.id, 'step4_condition_type', editingField.value);
                                      setEditingField(null);
                                    }
                                    if (e.key === 'Escape') {
                                      setEditingField(null);
                                    }
                                  }}
                                  autoFocus
                                  style={{
                                    width: '100%',
                                    padding: '8px 12px',
                                    fontSize: '15px',
                                    border: `1px solid ${colors.border}`,
                                    borderRadius: '4px',
                                  }}
                                >
                                  {CONDITION_TYPES.map(opt => (
                                    <option key={opt.value} value={opt.value}>
                                      {opt.label}
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                <div 
                                  onClick={() => editModeHeuristic === h.id && setEditingField({ heuristicId: h.id, fieldName: 'step4_condition_type', value: h.step4_condition_type })}
                                  className={editModeHeuristic === h.id ? `${uniqueId}-editable-field` : ''}
                                  style={{ 
                                    fontSize: '15px', 
                                    color: colors.primaryText,
                                    cursor: editModeHeuristic === h.id ? 'pointer' : 'default',
                                    padding: '8px 12px',
                                    borderRadius: '6px',
                                  }}
                                >
                                  {h.step4_condition_type === 'none' || !h.step4_condition_type ? (
                                    <span>Always Apply (No Condition)</span>
                                  ) : (
                                    <>
                                      <span>
                                        {(() => {
                                          const type = h.step4_condition_type || '';
                                          if (type === 'is_blank') return 'is Blank';
                                          if (type === 'is_blank_desktop_height') return 'is Blank & Desktop Height';
                                          if (type === 'desktop_width') return 'Desktop Width';
                                          if (type === 'desktop_height') return 'Desktop Height';
                                          if (type === 'desktop_font_size') return 'Desktop Font Size';
                                          return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                                        })()}
                                      </span>
                                    </>
                                  )}
                                </div>
                              )}
                              
                              {/* Condition Value */}
                              {h.step4_condition_type && h.step4_condition_type !== 'none' && (
                                editModeHeuristic === h.id && editingField?.heuristicId === h.id && editingField?.fieldName === 'step4_condition_value' ? (
                                  <input
                                    type="text"
                                    value={editingField.value}
                                    onChange={(e) => setEditingField({ ...editingField, value: e.target.value })}
                                    onBlur={() => {
                                      updateHeuristicField(h.id, 'step4_condition_value', editingField.value);
                                      setEditingField(null);
                                    }}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') {
                                        updateHeuristicField(h.id, 'step4_condition_value', editingField.value);
                                        setEditingField(null);
                                      }
                                      if (e.key === 'Escape') {
                                        setEditingField(null);
                                      }
                                    }}
                                    autoFocus
                                    placeholder="e.g., lte_200px, gt_100px"
                                    style={{
                                      width: '100%',
                                      padding: '8px 12px',
                                      fontSize: '15px',
                                      border: `1px solid ${colors.border}`,
                                      borderRadius: '4px',
                                    }}
                                  />
                                ) : (
                                  <div 
                                    onClick={() => editModeHeuristic === h.id && setEditingField({ heuristicId: h.id, fieldName: 'step4_condition_value', value: h.step4_condition_value })}
                                    className={editModeHeuristic === h.id ? `${uniqueId}-editable-field` : ''}
                                    style={{ 
                                      fontSize: '15px', 
                                      color: '#E85D3B',
                                      fontWeight: '400',
                                      cursor: editModeHeuristic === h.id ? 'pointer' : 'default',
                                      padding: '8px 12px',
                                      borderRadius: '6px',
                                    }}
                                  >
                                    {(h.step4_condition_value || '')
                                      .replace(/true_/gi, '')
                                      .replace(/(\d+)to(\d+)/g, '$1:$2')
                                      .replace(/lte_(\d+)px/gi, 'is equal / less than $1px')
                                      .replace(/gte_(\d+)px/gi, 'is equal / greater than $1px')
                                      .replace(/lt_(\d+)px/gi, 'is less than $1px')
                                      .replace(/gt_(\d+)px/gi, 'is greater than $1px')
                                      .replace(/portrait_/gi, 'Portrait: ')
                                      .replace(/landscape_/gi, '')
                                      .replace(/square_/gi, '')
                                      .replace(/_/g, ' / ')
                                      .replace(/px/g, 'px')
                                    }
                                  </div>
                                )
                              )}
                            </div>
                          </div>

                          {/* Step 5: Action (Editable) */}
                          <div className={`${uniqueId}-step-card`} style={{
                            padding: '18px 20px',
                            background: colors.cardBackground,
                            borderRadius: '10px',
                            border: `1px solid ${colors.border}`,
                            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                            transition: 'all 250ms ease-out',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = colors.secondaryText;
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = colors.border;
                            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}>
                            <div style={{ 
                              fontSize: '10px', 
                              fontWeight: '600',
                              color: colors.secondaryText,
                              textTransform: 'uppercase',
                              letterSpacing: '0.08em',
                              marginBottom: '10px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                            }}>
                              <span style={{ 
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '18px',
                                height: '18px',
                                borderRadius: '50%',
                                background: 'rgba(0,0,0,0.06)',
                                fontSize: '9px',
                                fontWeight: '600',
                              }}>5</span>
                              Action
                            </div>
                            {editModeHeuristic === h.id && editingField?.heuristicId === h.id && editingField?.fieldName === 'step5_action' ? (
                              <select
                                value={editingField.value}
                                onChange={(e) => setEditingField({ ...editingField, value: e.target.value })}
                                onBlur={() => {
                                  updateHeuristicField(h.id, 'step5_action', editingField.value);
                                  setEditingField(null);
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    updateHeuristicField(h.id, 'step5_action', editingField.value);
                                    setEditingField(null);
                                  }
                                  if (e.key === 'Escape') {
                                    setEditingField(null);
                                  }
                                }}
                                autoFocus
                                style={{
                                  width: '100%',
                                  padding: '8px 12px',
                                  fontSize: '15px',
                                  border: `1px solid ${colors.border}`,
                                  borderRadius: '4px',
                                }}
                              >
                                {ACTION_OPTIONS.map(opt => (
                                  <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <div 
                                onClick={() => editModeHeuristic === h.id && setEditingField({ heuristicId: h.id, fieldName: 'step5_action', value: h.step5_action })}
                                className={editModeHeuristic === h.id ? `${uniqueId}-editable-field` : ''}
                                style={{ 
                                  fontSize: '15px', 
                                  color: colors.primaryText,
                                  cursor: editModeHeuristic === h.id ? 'pointer' : 'default',
                                  padding: '8px 12px',
                                  borderRadius: '6px',
                                }}
                              >
                                {(() => {
                                  const action = h.step5_action || '—';
                                  const output = h.step6_output || '';
                                  if (output.includes('scaling-reset') || output.includes('scaling_reset')) return 'Reset Scaling';
                                  if (action.includes('item_size') && output.includes('scaling')) return 'Reset Scaling';
                                  if (action.includes('resize_aspect')) return 'Resize in Aspect Ratio';
                                  if (action.includes('container_item_resize')) return 'Resize';
                                  if (action.includes('resize')) return 'Resize';
                                  if (action.includes('item_size')) return 'Resize';
                                  if (action.includes('margin')) return 'Set Margin';
                                  if (action.includes('padding')) return 'Set Padding';
                                  if (action.includes('font_size')) return 'Resize Font';
                                  if (action.includes('alignment')) return 'Align';
                                  if (action.includes('hide')) return 'Hide';
                                  if (action.includes('show')) return 'Show';
                                  if (action.includes('keep')) return 'Keep';
                                  if (action.includes('offset')) return 'Set Offset';
                                  if (action.includes('rotation') || action.includes('set_rotation')) return 'Set Rotation';
                                  if (action.includes('arrange')) return 'Arrange';
                                  if (action.includes('menu_spacing')) return 'Menu Spacing';
                                  return action.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                                })()}
                              </div>
                            )}
                          </div>

                          {/* Step 6: Output (Editable) */}
                          <div className={`${uniqueId}-step-card`} style={{
                            padding: '18px 20px',
                            background: '#3B7DED',
                            borderRadius: '10px',
                            border: 'none',
                            boxShadow: '0 4px 12px rgba(59, 125, 237, 0.15)',
                            transition: 'all 250ms ease-out',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(59, 125, 237, 0.25)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 125, 237, 0.15)';
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}>
                            <div style={{ 
                              fontSize: '10px', 
                              fontWeight: '600',
                              color: 'rgba(255,255,255,0.85)',
                              textTransform: 'uppercase',
                              letterSpacing: '0.08em',
                              marginBottom: '10px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                            }}>
                              <span style={{ 
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '18px',
                                height: '18px',
                                borderRadius: '50%',
                                background: 'rgba(255,255,255,0.2)',
                                fontSize: '9px',
                                fontWeight: '600',
                                color: '#FFFFFF',
                              }}>6</span>
                              Output
                            </div>
                            {editModeHeuristic === h.id && editingField?.heuristicId === h.id && editingField?.fieldName === 'step6_output' ? (
                              <input
                                type="text"
                                value={editingField.value}
                                onChange={(e) => setEditingField({ ...editingField, value: e.target.value })}
                                onBlur={() => {
                                  updateHeuristicField(h.id, 'step6_output', editingField.value);
                                  setEditingField(null);
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    updateHeuristicField(h.id, 'step6_output', editingField.value);
                                    setEditingField(null);
                                  }
                                  if (e.key === 'Escape') {
                                    setEditingField(null);
                                  }
                                }}
                                autoFocus
                                placeholder="e.g., width-100pct_height-auto"
                                style={{
                                  width: '100%',
                                  padding: '8px 12px',
                                  fontSize: '15px',
                                  border: `1px solid rgba(255,255,255,0.3)`,
                                  borderRadius: '4px',
                                  background: 'rgba(255,255,255,0.1)',
                                  color: '#FFFFFF',
                                }}
                              />
                            ) : (
                              <div 
                                onClick={() => editModeHeuristic === h.id && setEditingField({ heuristicId: h.id, fieldName: 'step6_output', value: h.step6_output })}
                                className={editModeHeuristic === h.id ? `${uniqueId}-editable-field` : ''}
                                style={{ 
                                  fontSize: '15px', 
                                  color: '#FFFFFF',
                                  cursor: editModeHeuristic === h.id ? 'pointer' : 'default',
                                  padding: '8px 12px',
                                  borderRadius: '6px',
                                  border: '1px solid transparent',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                              >
                                {(() => {
                                  const output = h.step6_output || '—';
                                  
                                  if (output.includes('scaling-reset') || output.includes('scaling_reset')) {
                                    const has100pct = output.includes('100pct') || output.includes('100%');
                                    return (
                                      <span style={{ fontFamily: 'monospace', fontSize: '14px' }}>
                                        scaledValue × (desktopVW / mobileVW){has100pct ? ' [100% max]' : ''}
                                      </span>
                                    );
                                  }
                                  
                                  const parseOutput = (str) => {
                                    const results = [];
                                    
                                    const fontMatch = str.match(/font[_-]size[_-](\d+)px/);
                                    if (fontMatch) {
                                      results.push({ label: 'Font Size', value: `${fontMatch[1]}px` });
                                    } else if (str.includes('font') && str.includes('keep')) {
                                      results.push({ label: 'Font Size', value: 'Keep' });
                                    }
                                    
                                    if (str.includes('width')) {
                                      if (str.includes('100pct') || str.includes('100%')) {
                                        results.push({ label: 'Width', value: '100%' });
                                      } else if (str.match(/width[_-](\d+)px/)) {
                                        const match = str.match(/width[_-](\d+)px/);
                                        results.push({ label: 'Width', value: `${match[1]}px` });
                                      } else if (str.includes('width-keep') || str.includes('width_keep')) {
                                        results.push({ label: 'Width', value: 'Keep' });
                                      } else if (str.includes('width-full')) {
                                        results.push({ label: 'Width', value: '100%' });
                                      }
                                    }
                                    
                                    if (str.includes('height')) {
                                      if (str.includes('height-auto') || str.includes('height_auto')) {
                                        results.push({ label: 'Height', value: 'Auto' });
                                      } else if (str.includes('height-keep') || str.includes('height_keep')) {
                                        results.push({ label: 'Height', value: 'Keep' });
                                      } else if (str.match(/height[_-](\d+)px/)) {
                                        const match = str.match(/height[_-](\d+)px/);
                                        results.push({ label: 'Height', value: `${match[1]}px` });
                                      } else if (str.includes('aspect_ratio') || str.includes('aspect-ratio')) {
                                        results.push({ label: 'Height', value: 'Aspect Ratio' });
                                      }
                                    }
                                    
                                    const marginMatch = str.match(/margin[_-](\w+)[_-](\d+)px/);
                                    if (marginMatch) {
                                      results.push({ label: `Margin ${marginMatch[1]}`, value: `${marginMatch[2]}px` });
                                    }
                                    
                                    return results;
                                  };
                                  
                                  const parsed = parseOutput(output);
                                  
                                  if (parsed.length > 0) {
                                    return parsed.map((item, idx) => (
                                      <div key={idx} style={{ marginBottom: idx < parsed.length - 1 ? '4px' : 0 }}>
                                        <span style={{ opacity: 0.8 }}>{item.label}:</span>{' '}
                                        <span style={{ fontWeight: '500' }}>{item.value}</span>
                                      </div>
                                    ));
                                  }
                                  
                                  return <span>{output.replace(/_/g, ' ')}</span>;
                                })()}
                              </div>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div style={{ 
                            display: 'flex', 
                            gap: '12px',
                            paddingTop: '8px',
                          }}>
                            <button
                              onClick={() => setHistoryView({ heuristicId: h.id, heuristic: h })}
                              style={{
                                padding: '10px 18px',
                                background: colors.cardBackground,
                                border: `1px solid ${colors.border}`,
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '13px',
                                fontWeight: '500',
                                color: colors.primaryText,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                transition: 'all 200ms ease-out',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = colors.background;
                                e.currentTarget.style.borderColor = colors.primaryText;
                                e.currentTarget.style.transform = 'translateY(-1px)';
                                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = colors.cardBackground;
                                e.currentTarget.style.borderColor = colors.border;
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                              }}
                            >
                              <Icon name="history" size={14} color={colors.secondaryText} />
                              View History
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm('Are you sure you want to delete this heuristic?')) {
                                  deleteHeuristic(h.id);
                                  setExpandedHeuristic(null);
                                }
                              }}
                              style={{
                                padding: '10px 18px',
                                background: colors.cardBackground,
                                border: `1px solid ${colors.border}`,
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '13px',
                                fontWeight: '500',
                                color: colors.error,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                transition: 'all 200ms ease-out',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#FEE2E2';
                                e.currentTarget.style.borderColor = colors.error;
                                e.currentTarget.style.transform = 'translateY(-1px)';
                                e.currentTarget.style.boxShadow = '0 2px 8px rgba(239, 68, 68, 0.15)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = colors.cardBackground;
                                e.currentTarget.style.borderColor = colors.border;
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                              }}
                            >
                              <Icon name="x" size={14} color={colors.error} />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    );
  };

  return (
    <div style={styles.app}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes staggerFadeIn {
          from { opacity: 0; transform: translateX(-15px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes expandHeight {
          from { max-height: 0; opacity: 0; }
          to { max-height: 2000px; opacity: 1; }
        }
        .${uniqueId}-hover:hover {
          background: rgba(0,0,0,0.04) !important;
        }
        .${uniqueId}-card-hover:hover {
          border-color: ${colors.primaryText} !important;
        }
        .${uniqueId}-step-card {
          animation: staggerFadeIn 400ms ease-out both;
        }
        .${uniqueId}-step-card:nth-child(1) { animation-delay: 0ms; }
        .${uniqueId}-step-card:nth-child(2) { animation-delay: 50ms; }
        .${uniqueId}-step-card:nth-child(3) { animation-delay: 100ms; }
        .${uniqueId}-step-card:nth-child(4) { animation-delay: 150ms; }
        .${uniqueId}-step-card:nth-child(5) { animation-delay: 200ms; }
        .${uniqueId}-step-card:nth-child(6) { animation-delay: 250ms; }
        .${uniqueId}-editable-field {
          transition: all 200ms ease-out;
          border: 1px solid transparent;
        }
        .${uniqueId}-editable-field:hover {
          background: rgba(0,0,0,0.02) !important;
          border-color: ${colors.border} !important;
          transform: translateX(2px);
        }
      `}</style>

      {/* Left Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <div style={styles.logoContainer}>
            <Icon name="logo" size={20} color={colors.primaryText} />
            <div>
              <div style={styles.logoText}>ALGORITHM</div>
              <div style={styles.logoText}>BUILDER</div>
      </div>
    </div>
          <span style={styles.version}>v2.0</span>
    </div>
    
        <div style={{ padding: '16px' }}>
          <button
            onClick={() => {
              setCurrentView('wizard');
              reset();
              resetDraft();
            }}
            style={styles.createButton}
            className={`${uniqueId}-hover`}
          >
            <Icon name="plus" size={16} color={colors.primaryText} />
            Create Heuristic
          </button>
      </div>

        <nav style={{ padding: '0 8px' }}>
        <button
            onClick={() => setCurrentView('library')}
            style={{
              ...styles.navItem,
              background: currentView === 'library' ? 'rgba(0,0,0,0.04)' : 'transparent',
            }}
            className={`${uniqueId}-hover`}
          >
            <Icon name="menu" size={16} color={colors.secondaryText} />
            Library
        </button>
          <button style={styles.navItem} className={`${uniqueId}-hover`}>
            <Icon name="settings" size={16} color={colors.secondaryText} />
            Settings
          </button>
        </nav>

        <div style={{ marginTop: 'auto', padding: '24px', borderTop: `1px solid ${colors.border}` }}>
          <div style={{ fontSize: '11px', color: colors.secondaryText }}>Wix Editor 3.0</div>
          <div style={{ fontSize: '11px', color: colors.secondaryText }}>Design Infrastructure</div>
        </div>
      </aside>

      {/* Main Content - Conditional Rendering */}
      {currentView === 'wizard' ? (
        <main style={styles.main}>
          {/* Wizard Steps Header */}
          <div style={styles.wizardHeader}>
            {STEPS.map((s, index) => (
              <div key={s.number} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={styles.stepIndicator}>
                  <div style={styles.stepNumber(step === s.number, step > s.number)}>
                    {step > s.number ? (
                      <Icon name="check" size={14} color={colors.cardBackground} strokeWidth={2.5} />
                    ) : s.number}
                  </div>
                  <span style={styles.stepLabel(step === s.number, step > s.number)}>
                    {s.label}
              </span>
            </div>
                {index < STEPS.length - 1 && (
                  <div style={styles.stepConnector(step > s.number)} />
                )}
              </div>
            ))}
          </div>
          
          {/* Wizard Content */}
          <div style={styles.wizardContent}>
            {renderStepContent()}
            </div>
        </main>
      ) : currentView === 'library' ? (
        renderLibraryView()
      ) : null}

      {/* Right Sidebar - Only show in wizard view */}
      {currentView === 'wizard' && (
      <aside style={styles.resultsPanel}>
        <div style={styles.resultsPanelHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>HEURISTICS</span>
            <span style={styles.badge}>{heuristics.length}</span>
          </div>
          {isWixConnected && (
        <button 
              onClick={refreshFromCMS}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
          title="Refresh from CMS"
        >
              <Icon name="refresh" size={16} color={colors.secondaryText} />
        </button>
      )}
    </div>

        <div style={styles.connectionStatus}>
          <div style={styles.statusDot(isWixConnected)} />
          <span style={{ fontSize: '12px', color: colors.secondaryText, fontFamily: 'monospace' }}>
            {isLoading ? 'Loading...' : isSyncing ? 'Syncing...' : isWixConnected ? 'Wix CMS' : 'Local Storage'}
          </span>
        </div>

    {error && (
          <div style={{ padding: '12px 24px', background: '#FEE2E2', color: colors.error, fontSize: '12px' }}>
        {error}
      </div>
    )}

        <div style={styles.cardsList}>
      {isLoading ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: colors.secondaryText }}>
              <div style={{ fontSize: '24px', marginBottom: '12px' }}>◌</div>
              <div>Loading heuristics...</div>
        </div>
      ) : heuristics.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: colors.secondaryText }}>
              <div style={{ fontSize: '24px', marginBottom: '12px', opacity: 0.5 }}>◇</div>
              <div>No heuristics yet.<br />Create your first one!</div>
        </div>
      ) : (
            heuristics.map(h => (
              <div key={h.id} style={{
                borderRadius: '10px',
                border: '1.2px solid #9DB9FF',
                background: 'rgba(255, 255, 255, 0.50)',
                boxShadow: '14.6px 160px 44.7px 0 rgba(128, 128, 128, 0.00), 9.75px 102.4px 41.4px 0 rgba(128, 128, 128, 0.01), 5.7px 57.7px 35px 0 rgba(128, 128, 128, 0.05), 2.4px 26px 26px 0 rgba(128, 128, 128, 0.09), 0.8px 6.5px 13.8px 0 rgba(128, 128, 128, 0.10)',
                marginBottom: '16px',
                overflow: 'hidden',
              }}>
              <div>
                {/* Card Header */}
                <div style={{
                  padding: '20px 24px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  <span style={{ 
                    fontSize: '15px', 
                    fontWeight: '600', 
                    textTransform: 'uppercase',
                    letterSpacing: '0.02em',
                    color: colors.primaryText,
                  }}>
                    {(h.step3a_category || 'Layout').replace(/_/g, ' ').toUpperCase()}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
                    {/* Status Label Dropdown */}
                    <select
                      value={h.status || 'Active'}
                      onChange={(e) => updateStatus(h.id, e.target.value)}
                      style={{
                        padding: '4px',
                        paddingLeft: '4px',
                        paddingRight: '4px',
                        fontSize: '12px',
                        fontWeight: '600',
                        border: 'none',
                        borderRadius: '6px',
                        background: STATUS_OPTIONS.find(s => s.value === (h.status || 'Active'))?.color || '#3B7DED',
                        color: '#FFFFFF',
                        cursor: 'pointer',
                        outline: 'none',
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        MozAppearance: 'none',
                        textAlign: 'center',
                      }}
                    >
                      {STATUS_OPTIONS.map(status => (
                        <option key={status.value} value={status.value}>{status.value}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => setHistoryView({ heuristicId: h.id, heuristic: h })}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', height: '24px' }}
                      title="View History"
                    >
                      <Icon name="history" size={16} color={colors.secondaryText} />
                    </button>
                    <button
                      onClick={() => deleteHeuristic(h.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', height: '24px' }}
                    >
                      <Icon name="x" size={16} color={colors.secondaryText} />
                    </button>
                  </div>
    </div>
    
                {/* Gradient Divider */}
                <div style={{
                  height: '2px',
                  background: 'linear-gradient(90deg, #E5E5E5 0%, #F5F5F5 100%)',
                  marginBottom: '20px',
                }} />

                {/* Card Body */}
                <div style={{ padding: '0 24px 24px', borderRadius: '0px' }}>
                  {/* Element */}
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{
                      fontSize: '11px',
                      fontWeight: '500',
                      color: colors.secondaryText,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: '6px',
                    }}>Element</div>
                    <div style={{
                      fontSize: '18px',
                      fontWeight: '400',
                      color: colors.primaryText,
                    }}>{(h.step1_who_element || '—').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
                  </div>

                  {/* Parent */}
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{
                      fontSize: '11px',
                      fontWeight: '500',
                      color: colors.secondaryText,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: '6px',
                    }}>Parent</div>
                    <div style={{
                      fontSize: '18px',
                      fontWeight: '400',
                      color: colors.primaryText,
                    }}>{(h.step2_where_parent || 'Any').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
                  </div>

                  {/* Condition */}
                  {h.step4_condition_type && h.step4_condition_type !== 'none' && (
                    <div style={{ marginBottom: '20px' }}>
                      <div style={{
                        fontSize: '11px',
                        fontWeight: '500',
                        color: colors.secondaryText,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        marginBottom: '6px',
                      }}>Condition</div>
                      <div style={{
                        fontSize: '18px',
                        fontWeight: '400',
                        color: colors.primaryText,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        flexWrap: 'wrap',
                      }}>
                        <span>{(() => {
                          const type = h.step4_condition_type || '';
                          // Format condition type labels
                          if (type === 'is_blank') return 'is Blank';
                          if (type === 'is_blank_desktop_height') return 'is Blank & Desktop Height';
                          if (type === 'desktop_width') return 'Desktop Width';
                          if (type === 'desktop_height') return 'Desktop Height';
                          if (type === 'desktop_font_size') return 'Desktop Font Size';
                          return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                        })()}:</span>
                        <span style={{ color: '#E85D3B', fontWeight: '400' }}>
                          {(h.step4_condition_value || '')
                            .replace(/true_/gi, '')  // Remove true_ prefix
                            .replace(/(\d+)to(\d+)/g, '$1:$2')  // Convert 2to3 to 2:3
                            .replace(/lte_(\d+)px/gi, 'is equal / less than $1px')  // lte_100px -> is equal / less than 100px
                            .replace(/gte_(\d+)px/gi, 'is equal / greater than $1px')  // gte_101px -> is equal / greater than 101px
                            .replace(/lt_(\d+)px/gi, 'is less than $1px')
                            .replace(/gt_(\d+)px/gi, 'is greater than $1px')
                            .replace(/portrait_/gi, 'Portrait: ')  // Portrait: 2:3
                            .replace(/landscape_/gi, '')  // Remove landscape prefix
                            .replace(/square_/gi, '')  // Remove square prefix
                            .replace(/_/g, ' / ')  // Use / as separator
                            .replace(/px/g, 'px')
                          }
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Action */}
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{
                      fontSize: '11px',
                      fontWeight: '500',
                      color: colors.secondaryText,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: '6px',
                    }}>Action</div>
                    <div style={{
                      fontSize: '18px',
                      fontWeight: '400',
                      color: colors.primaryText,
                    }}>{(() => {
                      const action = h.step5_action || '—';
                      const output = h.step6_output || '';
                      // Check if it's a scaling reset action
                      if (output.includes('scaling-reset') || output.includes('scaling_reset')) return 'Reset Scaling';
                      if (action.includes('item_size') && output.includes('scaling')) return 'Reset Scaling';
                      // Other action mappings
                      if (action.includes('resize_aspect')) return 'Resize in Aspect Ratio';
                      if (action.includes('container_item_resize')) return 'Resize';
                      if (action.includes('resize')) return 'Resize';
                      if (action.includes('item_size')) return 'Resize';
                      if (action.includes('margin')) return 'Set Margin';
                      if (action.includes('padding')) return 'Set Padding';
                      if (action.includes('font_size')) return 'Resize Font';
                      if (action.includes('alignment')) return 'Align';
                      if (action.includes('hide')) return 'Hide';
                      if (action.includes('show')) return 'Show';
                      if (action.includes('keep')) return 'Keep';
                      if (action.includes('offset')) return 'Set Offset';
                      if (action.includes('rotation') || action.includes('set_rotation')) return 'Set Rotation';
                      if (action.includes('arrange')) return 'Arrange';
                      if (action.includes('menu_spacing')) return 'Menu Spacing';
                      return action.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                    })()}</div>
                  </div>

                  {/* Output - Blue Container */}
                  <div style={{
                    background: '#3B7DED',
                    borderRadius: '0 0 14px 14px',
                    padding: '16px 20px',
                    marginTop: '24px',
                    marginLeft: '-24px',
                    marginRight: '-24px',
                    marginBottom: '-24px',
                  }}>
                    <div style={{
                      fontSize: '11px',
                      fontWeight: '500',
                      color: 'rgba(255,255,255,0.7)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: '8px',
                    }}>Output</div>
                    <div style={{
                      fontSize: '17px',
                      fontWeight: '400',
                      color: '#FFFFFF',
                    }}>
                      {(() => {
                        const output = h.step6_output || '—';
                        
                        // If it's a scaling reset, show the formula
                        if (output.includes('scaling-reset') || output.includes('scaling_reset')) {
                          const has100pct = output.includes('100pct') || output.includes('100%');
                          return (
                            <span style={{ fontFamily: 'monospace', fontSize: '14px' }}>
                              scaledValue × (desktopVW / mobileVW){has100pct ? ' [100% max]' : ''}
                            </span>
                          );
                        }
                        
                        // Parse output for width/height/font patterns
                        const parseOutput = (str) => {
                          const results = [];
                          
                          // Look for font size first
                          const fontMatch = str.match(/font[_-]size[_-](\d+)px/);
                          if (fontMatch) {
                            results.push({ label: 'Font Size', value: `${fontMatch[1]}px` });
                          } else if (str.includes('font') && str.includes('keep')) {
                            results.push({ label: 'Font Size', value: 'Keep' });
                          }
                          
                          // Look for width patterns
                          if (str.includes('width')) {
                            if (str.includes('100pct') || str.includes('100%')) {
                              results.push({ label: 'Width', value: '100%' });
                            } else if (str.match(/width[_-](\d+)px/)) {
                              const match = str.match(/width[_-](\d+)px/);
                              results.push({ label: 'Width', value: `${match[1]}px` });
                            } else if (str.includes('width-keep') || str.includes('width_keep')) {
                              results.push({ label: 'Width', value: 'Keep' });
                            } else if (str.includes('width-full')) {
                              results.push({ label: 'Width', value: '100%' });
                            }
                          }
                          
                          // Look for height patterns
                          if (str.includes('height')) {
                            if (str.includes('height-auto') || str.includes('height_auto')) {
                              results.push({ label: 'Height', value: 'Auto' });
                            } else if (str.includes('height-keep') || str.includes('height_keep')) {
                              results.push({ label: 'Height', value: 'Keep' });
                            } else if (str.match(/height[_-](\d+)px/)) {
                              const match = str.match(/height[_-](\d+)px/);
                              results.push({ label: 'Height', value: `${match[1]}px` });
                            } else if (str.includes('aspect_ratio') || str.includes('aspect-ratio')) {
                              results.push({ label: 'Height', value: 'Aspect Ratio' });
                            }
                          }
                          
                          // Look for margin
                          const marginMatch = str.match(/margin[_-](\w+)[_-](\d+)px/);
                          if (marginMatch) {
                            results.push({ label: `Margin ${marginMatch[1]}`, value: `${marginMatch[2]}px` });
                          }
                          
                          return results;
                        };
                        
                        const parsed = parseOutput(output);
                        
                        if (parsed.length > 0) {
                          return parsed.map((item, idx) => (
                            <div key={idx} style={{ marginBottom: idx < parsed.length - 1 ? '4px' : 0 }}>
                              <span>{item.label}:</span>{' '}
                              <span style={{ fontWeight: '500' }}>{item.value}</span>
        </div>
                          ));
                        }
                        
                        return <span>{output.replace(/_/g, ' ')}</span>;
                      })()}
                    </div>
                  </div>
                </div>
              </div>
              </div>
            ))
      )}
    </div>
    
    {heuristics.length > 0 && (
          <div style={styles.exportFooter}>
            <select
          value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value)}
              style={styles.exportSelect}
            >
              <option value="csv">CSV</option>
              <option value="json">JSON</option>
            </select>
            <button onClick={handleExport} style={styles.exportButton}>
          Export
            </button>
          </div>
    )}
  </aside>
      )}

      {/* History Modal */}
      {historyView && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }} onClick={() => setHistoryView(null)}>
          <div style={{
            background: colors.cardBackground,
            borderRadius: '12px',
            padding: '32px',
            maxWidth: '800px',
            maxHeight: '80vh',
            overflow: 'auto',
            width: '90%',
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>Field History</h2>
              <button
                onClick={() => setHistoryView(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
              >
                <Icon name="x" size={20} color={colors.secondaryText} />
              </button>
            </div>

            {Object.entries(historyView.heuristic.history || {}).map(([fieldName, fieldHistory]) => (
              <div key={fieldName} style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {fieldName.replace(/_/g, ' ').replace(/step\d+\w?/g, '').trim() || fieldName}
                </h3>
                
                {fieldHistory.length === 0 ? (
                  <div style={{ color: colors.secondaryText, fontSize: '13px' }}>No history</div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {fieldHistory.map((entry, idx) => (
                      <div key={idx} style={{
                        padding: '16px',
                        background: colors.background,
                        borderRadius: '8px',
                        border: `1px solid ${colors.border}`,
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                          <div>
                            <div style={{ fontSize: '11px', color: colors.secondaryText, marginBottom: '4px' }}>
                              {new Date(entry.timestamp).toLocaleString()}
                              {entry.isRevert && <span style={{ marginLeft: '8px', color: '#F59E0B' }}>(Reverted)</span>}
                            </div>
                            <div style={{ fontSize: '13px' }}>
                              <span style={{ color: colors.secondaryText }}>From:</span>{' '}
                              <span style={{ color: colors.error, textDecoration: 'line-through' }}>{entry.value || '—'}</span>
                            </div>
                            <div style={{ fontSize: '13px' }}>
                              <span style={{ color: colors.secondaryText }}>To:</span>{' '}
                              <span style={{ color: colors.success, fontWeight: '500' }}>{entry.newValue || '—'}</span>
                            </div>
                          </div>
                          {!entry.isRevert && (
                            <button
                              onClick={() => {
                                revertHeuristicField(historyView.heuristicId, fieldName, idx);
                                setHistoryView(null);
                              }}
                              style={{
                                padding: '6px 12px',
                                fontSize: '12px',
                                background: colors.cardBackground,
                                border: `1px solid ${colors.border}`,
                                borderRadius: '6px',
                                cursor: 'pointer',
                                color: colors.primaryText,
                              }}
                            >
                              Revert
                            </button>
                          )}
                        </div>
                      </div>
                    )).reverse()}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
