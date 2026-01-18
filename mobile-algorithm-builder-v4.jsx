const MANIFEST = {
  "type": "Application.MobileAlgorithmBuilder",
  "description": "Heuristics management application for Wix Editor 3.0 mobile transformations with 5-step wizard",
  "editorElement": {
    "selector": ".algorithm-builder",
    "displayName": "Mobile Algorithm Builder",
    "archetype": "application",
    "data": {
      "backgroundColor": {
        "dataType": "color",
        "displayName": "Background Color",
        "defaultValue": "#F8F8F8",
        "group": "Colors"
      },
      "cardBackground": {
        "dataType": "color",
        "displayName": "Card Background",
        "defaultValue": "#FFFFFF",
        "group": "Colors"
      },
      "primaryTextColor": {
        "dataType": "color",
        "displayName": "Primary Text",
        "defaultValue": "#1a1a1a",
        "group": "Colors"
      },
      "secondaryTextColor": {
        "dataType": "color",
        "displayName": "Secondary Text",
        "defaultValue": "#888888",
        "group": "Colors"
      },
      "accentColor": {
        "dataType": "color",
        "displayName": "Accent Color",
        "defaultValue": "#1a1a1a",
        "group": "Colors"
      },
      "borderColor": {
        "dataType": "color",
        "displayName": "Border Color",
        "defaultValue": "#E5E5E5",
        "group": "Colors"
      }
    },
    "layout": {
      "resizeDirection": "horizontalAndVertical",
      "contentResizeDirection": "both"
    }
  }
};

function Component({ config = {} }) {
  // Safe config access
  const backgroundColor = config?.backgroundColor || '#F8F8F8';
  const cardBackground = config?.cardBackground || '#FFFFFF';
  const primaryTextColor = config?.primaryTextColor || '#1a1a1a';
  const secondaryTextColor = config?.secondaryTextColor || '#888888';
  const accentColor = config?.accentColor || '#1a1a1a';
  const borderColor = config?.borderColor || '#E5E5E5';

  // Inline SVG Icons
  const Icon = ({ name, size = 20, color = secondaryTextColor, strokeWidth = 1.5 }) => {
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
      typography: (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
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
      check: (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      )
    };
    return icons[name] || null;
  };

  // State
  const [currentView, setCurrentView] = React.useState('wizard'); // 'wizard' or 'library'
  const [wizardStep, setWizardStep] = React.useState(1);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [selectedElement, setSelectedElement] = React.useState(null);
  const [conditionData, setConditionData] = React.useState({ type: '', value: '' });
  const [decisionData, setDecisionData] = React.useState({ action: '', output: '' });
  const [expandedCards, setExpandedCards] = React.useState({});

  // Categories
  const categories = [
    { id: 'typography', name: 'Typography', icon: 'typography' },
    { id: 'spacing', name: 'Spacing', icon: 'spacing' },
    { id: 'layout', name: 'Layout', icon: 'layout' },
    { id: 'images', name: 'Images', icon: 'images' },
    { id: 'buttons', name: 'Buttons', icon: 'buttons' },
    { id: 'navigation', name: 'Navigation', icon: 'navigation' },
    { id: 'forms', name: 'Forms', icon: 'forms' },
    { id: 'cards', name: 'Cards', icon: 'cards' },
    { id: 'lists', name: 'Lists', icon: 'lists' },
    { id: 'media', name: 'Media', icon: 'media' },
    { id: 'containers', name: 'Containers', icon: 'containers' }
  ];

  // Wizard steps
  const wizardSteps = [
    { num: 1, label: 'Category' },
    { num: 2, label: 'Element' },
    { num: 3, label: 'Condition' },
    { num: 4, label: 'Decision' },
    { num: 5, label: 'Result' }
  ];

  // Sample heuristics data
  const heuristicsData = React.useMemo(() => [
    { 
      id: 1, 
      category: 'buttons',
      element: 'rgeeh', 
      condition: 'sdfg', 
      mobileResult: 'sfgd',
      desktop: 's fdg'
    },
    { 
      id: 2, 
      category: 'containers',
      element: 'Repeaters', 
      condition: 'Container padding is stronger then element size', 
      mobileResult: 'Container-Item Resize: Margin Type: Reset width: Desktop | Children Item Resize: Pinned: Maintain L R',
      desktop: ''
    },
    { 
      id: 3, 
      category: 'containers',
      element: 'Lightbox', 
      condition: 'Container padding is stronger then element size', 
      mobileResult: 'Container-Item Resize: Margin Type: Reset width: Desktop | Children Item Resize: Pinned: Maintain L R',
      desktop: ''
    },
    { 
      id: 4, 
      category: 'containers',
      element: 'Tabs', 
      condition: 'Container padding is stronger then element size', 
      mobileResult: 'Container-Item Resize: Margin Type: Reset width: Desktop | Children Item Resize: Pinned: Maintain L R',
      desktop: ''
    }
  ], []);

  const toggleCard = (id) => {
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const uniqueId = React.useMemo(() => `mab-${Math.random().toString(36).substr(2, 9)}`, []);

  return (
    <div 
      className="algorithm-builder"
      style={{
        display: 'flex',
        width: '100%',
        height: '100vh',
        background: backgroundColor,
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
        color: primaryTextColor,
        overflow: 'hidden'
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .${uniqueId}-category-card:hover {
          border-color: ${primaryTextColor} !important;
          background: ${cardBackground} !important;
        }
        .${uniqueId}-nav-item:hover {
          background: rgba(0,0,0,0.04) !important;
        }
      `}</style>

      {/* Left Sidebar */}
      <aside style={{
        width: '200px',
        background: cardBackground,
        borderRight: `1px solid ${borderColor}`,
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0
      }}>
        {/* Logo */}
        <div style={{
          padding: '20px 24px',
          borderBottom: `1px solid ${borderColor}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Icon name="logo" size={20} color={primaryTextColor} />
            <div>
              <div style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.05em', lineHeight: 1.2 }}>ALGORITHM</div>
              <div style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.05em', lineHeight: 1.2 }}>BUILDER</div>
            </div>
          </div>
          <span style={{ fontSize: '11px', color: secondaryTextColor, fontFamily: 'monospace' }}>v1.0</span>
        </div>

        {/* Create Button */}
        <div style={{ padding: '16px' }}>
          <button
            onClick={() => {
              setCurrentView('wizard');
              setWizardStep(1);
              setSelectedCategory(null);
            }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px 16px',
              background: cardBackground,
              border: `1px solid ${borderColor}`,
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              color: primaryTextColor,
              transition: 'all 200ms ease-out'
            }}
          >
            <Icon name="plus" size={16} color={primaryTextColor} />
            Create Heuristic
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ padding: '0 8px' }}>
          <button
            className={`${uniqueId}-nav-item`}
            onClick={() => setCurrentView('library')}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 16px',
              background: currentView === 'library' ? 'rgba(0,0,0,0.04)' : 'transparent',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              color: secondaryTextColor,
              transition: 'background 200ms ease-out'
            }}
          >
            <Icon name="menu" size={16} color={secondaryTextColor} />
            Browse Library
          </button>
          <button
            className={`${uniqueId}-nav-item`}
            style={{
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
              color: secondaryTextColor,
              transition: 'background 200ms ease-out'
            }}
          >
            <Icon name="settings" size={16} color={secondaryTextColor} />
            Settings
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Wizard Steps Header */}
        <div style={{
          padding: '24px 40px',
          background: cardBackground,
          borderBottom: `1px solid ${borderColor}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0'
        }}>
          {wizardSteps.map((step, index) => (
            <React.Fragment key={step.num}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: wizardStep >= step.num ? primaryTextColor : 'transparent',
                  border: `2px solid ${wizardStep >= step.num ? primaryTextColor : borderColor}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: wizardStep >= step.num ? cardBackground : secondaryTextColor,
                  transition: 'all 200ms ease-out'
                }}>
                  {wizardStep > step.num ? (
                    <Icon name="check" size={14} color={cardBackground} strokeWidth={2.5} />
                  ) : step.num}
                </div>
                <span style={{
                  fontSize: '14px',
                  fontWeight: wizardStep === step.num ? '500' : '400',
                  color: wizardStep >= step.num ? primaryTextColor : secondaryTextColor
                }}>
                  {step.label}
                </span>
              </div>
              {index < wizardSteps.length - 1 && (
                <div style={{
                  width: '60px',
                  height: '2px',
                  background: wizardStep > step.num ? primaryTextColor : borderColor,
                  margin: '0 16px',
                  borderRadius: '1px',
                  transition: 'background 200ms ease-out'
                }} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Wizard Content */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          padding: '48px 80px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          {/* Step 1: Category Selection */}
          {wizardStep === 1 && (
            <div style={{ maxWidth: '720px', width: '100%', animation: 'fadeIn 300ms ease-out' }}>
              <h1 style={{ 
                fontSize: '28px', 
                fontWeight: '500', 
                margin: '0 0 12px 0',
                textAlign: 'center'
              }}>
                Select Category
              </h1>
              <p style={{ 
                fontSize: '15px', 
                color: secondaryTextColor, 
                margin: '0 0 40px 0',
                textAlign: 'center'
              }}>
                Choose the category that best describes this heuristic
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '16px'
              }}>
                {categories.map((cat, index) => (
                  <button
                    key={cat.id}
                    className={`${uniqueId}-category-card`}
                    onClick={() => setSelectedCategory(cat.id)}
                    style={{
                      padding: '24px 16px',
                      background: selectedCategory === cat.id ? cardBackground : 'transparent',
                      border: `1px solid ${selectedCategory === cat.id ? primaryTextColor : borderColor}`,
                      borderRadius: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '12px',
                      transition: 'all 200ms ease-out',
                      animation: `fadeIn 200ms ease-out ${index * 30}ms both`
                    }}
                  >
                    <Icon 
                      name={cat.icon} 
                      size={24} 
                      color={selectedCategory === cat.id ? primaryTextColor : secondaryTextColor} 
                    />
                    <span style={{
                      fontSize: '13px',
                      fontWeight: '400',
                      color: selectedCategory === cat.id ? primaryTextColor : secondaryTextColor
                    }}>
                      {cat.name}
                    </span>
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div style={{
                height: '1px',
                background: borderColor,
                margin: '48px 0 32px'
              }} />

              {/* Continue Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => selectedCategory && setWizardStep(2)}
                  disabled={!selectedCategory}
                  style={{
                    padding: '12px 32px',
                    background: selectedCategory ? primaryTextColor : borderColor,
                    border: 'none',
                    borderRadius: '8px',
                    cursor: selectedCategory ? 'pointer' : 'not-allowed',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: cardBackground,
                    transition: 'all 200ms ease-out'
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Element Selection */}
          {wizardStep === 2 && (
            <div style={{ maxWidth: '720px', width: '100%', animation: 'fadeIn 300ms ease-out' }}>
              <h1 style={{ fontSize: '28px', fontWeight: '500', margin: '0 0 12px 0', textAlign: 'center' }}>
                Select Element
              </h1>
              <p style={{ fontSize: '15px', color: secondaryTextColor, margin: '0 0 40px 0', textAlign: 'center' }}>
                Which element type does this heuristic apply to?
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Text Component', 'Button', 'Image', 'Container Box', 'Repeaters', 'Video Box'].map((el, i) => (
                  <button
                    key={el}
                    onClick={() => setSelectedElement(el)}
                    style={{
                      padding: '16px 20px',
                      background: selectedElement === el ? `${primaryTextColor}08` : cardBackground,
                      border: `1px solid ${selectedElement === el ? primaryTextColor : borderColor}`,
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      textAlign: 'left',
                      color: primaryTextColor,
                      transition: 'all 200ms ease-out',
                      animation: `fadeIn 200ms ease-out ${i * 50}ms both`
                    }}
                  >
                    {el}
                  </button>
                ))}
              </div>

              <div style={{ height: '1px', background: borderColor, margin: '48px 0 32px' }} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                  onClick={() => setWizardStep(1)}
                  style={{
                    padding: '12px 24px',
                    background: 'transparent',
                    border: `1px solid ${borderColor}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: secondaryTextColor
                  }}
                >
                  Back
                </button>
                <button
                  onClick={() => selectedElement && setWizardStep(3)}
                  disabled={!selectedElement}
                  style={{
                    padding: '12px 32px',
                    background: selectedElement ? primaryTextColor : borderColor,
                    border: 'none',
                    borderRadius: '8px',
                    cursor: selectedElement ? 'pointer' : 'not-allowed',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: cardBackground
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Condition */}
          {wizardStep === 3 && (
            <div style={{ maxWidth: '720px', width: '100%', animation: 'fadeIn 300ms ease-out' }}>
              <h1 style={{ fontSize: '28px', fontWeight: '500', margin: '0 0 12px 0', textAlign: 'center' }}>
                Define Condition
              </h1>
              <p style={{ fontSize: '15px', color: secondaryTextColor, margin: '0 0 40px 0', textAlign: 'center' }}>
                When should this heuristic be applied?
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: secondaryTextColor, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Condition Type
                  </label>
                  <select
                    value={conditionData.type}
                    onChange={(e) => setConditionData(prev => ({ ...prev, type: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: cardBackground,
                      border: `1px solid ${borderColor}`,
                      borderRadius: '8px',
                      fontSize: '14px',
                      color: primaryTextColor,
                      cursor: 'pointer'
                    }}
                  >
                    <option value="">Select condition type...</option>
                    <option value="desktop_width">Desktop Width</option>
                    <option value="desktop_font_size">Desktop Font Size</option>
                    <option value="is_blank">Is Blank</option>
                    <option value="layout_type">Layout Type</option>
                    <option value="none">None (Always Apply)</option>
                  </select>
                </div>

                {conditionData.type && conditionData.type !== 'none' && (
                  <div style={{ animation: 'fadeIn 200ms ease-out' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: secondaryTextColor, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Condition Value
                    </label>
                    <input
                      type="text"
                      value={conditionData.value}
                      onChange={(e) => setConditionData(prev => ({ ...prev, value: e.target.value }))}
                      placeholder="e.g., lte_200px, gt_100px, true"
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        background: cardBackground,
                        border: `1px solid ${borderColor}`,
                        borderRadius: '8px',
                        fontSize: '14px',
                        color: primaryTextColor,
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                )}
              </div>

              <div style={{ height: '1px', background: borderColor, margin: '48px 0 32px' }} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setWizardStep(2)} style={{ padding: '12px 24px', background: 'transparent', border: `1px solid ${borderColor}`, borderRadius: '8px', cursor: 'pointer', fontSize: '14px', color: secondaryTextColor }}>
                  Back
                </button>
                <button
                  onClick={() => conditionData.type && setWizardStep(4)}
                  disabled={!conditionData.type}
                  style={{ padding: '12px 32px', background: conditionData.type ? primaryTextColor : borderColor, border: 'none', borderRadius: '8px', cursor: conditionData.type ? 'pointer' : 'not-allowed', fontSize: '14px', fontWeight: '500', color: cardBackground }}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Decision */}
          {wizardStep === 4 && (
            <div style={{ maxWidth: '720px', width: '100%', animation: 'fadeIn 300ms ease-out' }}>
              <h1 style={{ fontSize: '28px', fontWeight: '500', margin: '0 0 12px 0', textAlign: 'center' }}>
                Define Decision
              </h1>
              <p style={{ fontSize: '15px', color: secondaryTextColor, margin: '0 0 40px 0', textAlign: 'center' }}>
                What action should be taken?
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: secondaryTextColor, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Action
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                    {['item_size', 'resize_aspect', 'margin', 'font_size', 'alignment', 'hide'].map(action => (
                      <button
                        key={action}
                        onClick={() => setDecisionData(prev => ({ ...prev, action }))}
                        style={{
                          padding: '14px 16px',
                          background: decisionData.action === action ? `${primaryTextColor}08` : cardBackground,
                          border: `1px solid ${decisionData.action === action ? primaryTextColor : borderColor}`,
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '13px',
                          color: primaryTextColor,
                          textAlign: 'left'
                        }}
                      >
                        {action.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {decisionData.action && (
                  <div style={{ animation: 'fadeIn 200ms ease-out' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: secondaryTextColor, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Output Value
                    </label>
                    <input
                      type="text"
                      value={decisionData.output}
                      onChange={(e) => setDecisionData(prev => ({ ...prev, output: e.target.value }))}
                      placeholder="e.g., width-100pct_height-auto"
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        background: cardBackground,
                        border: `1px solid ${borderColor}`,
                        borderRadius: '8px',
                        fontSize: '14px',
                        color: primaryTextColor,
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                )}
              </div>

              <div style={{ height: '1px', background: borderColor, margin: '48px 0 32px' }} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setWizardStep(3)} style={{ padding: '12px 24px', background: 'transparent', border: `1px solid ${borderColor}`, borderRadius: '8px', cursor: 'pointer', fontSize: '14px', color: secondaryTextColor }}>
                  Back
                </button>
                <button
                  onClick={() => decisionData.action && setWizardStep(5)}
                  disabled={!decisionData.action}
                  style={{ padding: '12px 32px', background: decisionData.action ? primaryTextColor : borderColor, border: 'none', borderRadius: '8px', cursor: decisionData.action ? 'pointer' : 'not-allowed', fontSize: '14px', fontWeight: '500', color: cardBackground }}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Result/Summary */}
          {wizardStep === 5 && (
            <div style={{ maxWidth: '720px', width: '100%', animation: 'fadeIn 300ms ease-out' }}>
              <h1 style={{ fontSize: '28px', fontWeight: '500', margin: '0 0 12px 0', textAlign: 'center' }}>
                Review & Confirm
              </h1>
              <p style={{ fontSize: '15px', color: secondaryTextColor, margin: '0 0 40px 0', textAlign: 'center' }}>
                Review your heuristic before saving
              </p>

              <div style={{
                background: cardBackground,
                border: `1px solid ${borderColor}`,
                borderRadius: '12px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}>
                {[
                  { label: 'Category', value: selectedCategory },
                  { label: 'Element', value: selectedElement },
                  { label: 'Condition', value: conditionData.type === 'none' ? 'Always Apply' : `${conditionData.type}: ${conditionData.value}` },
                  { label: 'Action', value: decisionData.action },
                  { label: 'Output', value: decisionData.output || 'Not specified' }
                ].map((item, i) => (
                  <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: i < 4 ? '16px' : 0, borderBottom: i < 4 ? `1px solid ${borderColor}` : 'none' }}>
                    <span style={{ fontSize: '12px', fontWeight: '500', color: secondaryTextColor, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</span>
                    <span style={{ fontSize: '14px', color: primaryTextColor, textAlign: 'right', maxWidth: '60%' }}>{item.value}</span>
                  </div>
                ))}
              </div>

              <div style={{ height: '1px', background: borderColor, margin: '48px 0 32px' }} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setWizardStep(4)} style={{ padding: '12px 24px', background: 'transparent', border: `1px solid ${borderColor}`, borderRadius: '8px', cursor: 'pointer', fontSize: '14px', color: secondaryTextColor }}>
                  Back
                </button>
                <button
                  onClick={() => {
                    // Save heuristic logic here
                    setWizardStep(1);
                    setSelectedCategory(null);
                    setSelectedElement(null);
                    setConditionData({ type: '', value: '' });
                    setDecisionData({ action: '', output: '' });
                  }}
                  style={{ padding: '12px 32px', background: '#22C55E', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '500', color: cardBackground }}
                >
                  Save Heuristic
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Right Sidebar - Heuristics List */}
      <aside style={{
        width: '320px',
        background: cardBackground,
        borderLeft: `1px solid ${borderColor}`,
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: `1px solid ${borderColor}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>HEURISTICS</span>
            <span style={{
              background: `${primaryTextColor}10`,
              padding: '4px 10px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              {heuristicsData.length}
            </span>
          </div>
        </div>

        {/* Source indicator */}
        <div style={{
          padding: '12px 24px',
          borderBottom: `1px solid ${borderColor}`,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{ width: '8px', height: '8px', background: '#22C55E', borderRadius: '50%' }} />
          <span style={{ fontSize: '12px', color: secondaryTextColor }}>WLx</span>
          <span style={{ fontSize: '12px', color: secondaryTextColor }}>CMS</span>
        </div>

        {/* Heuristics Cards */}
        <div style={{ flex: 1, overflow: 'auto', padding: '16px' }}>
          {heuristicsData.map((h, index) => (
            <div
              key={h.id}
              style={{
                background: cardBackground,
                border: `1px solid ${borderColor}`,
                borderRadius: '8px',
                marginBottom: '12px',
                overflow: 'hidden',
                animation: `fadeIn 200ms ease-out ${index * 50}ms both`
              }}
            >
              {/* Card Header */}
              <div style={{
                padding: '12px 16px',
                borderBottom: `1px solid ${borderColor}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: `1.5px solid ${borderColor}`,
                    borderRadius: '3px'
                  }} />
                  <span style={{ fontSize: '12px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                    {h.category === 'containers' ? 'CONTAINER COMPONENTS' : h.category.toUpperCase()}
                  </span>
                </div>
                <button
                  onClick={() => toggleCard(h.id)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                >
                  <Icon name="x" size={14} color={secondaryTextColor} />
                </button>
              </div>

              {/* Card Content */}
              <div style={{ padding: '16px' }}>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '10px', fontWeight: '500', color: secondaryTextColor, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                    ELEMENT
                  </div>
                  <div style={{ fontSize: '13px', color: primaryTextColor }}>{h.element}</div>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '10px', fontWeight: '500', color: secondaryTextColor, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                    CONDITION
                  </div>
                  <div style={{ fontSize: '13px', color: primaryTextColor }}>{h.condition}</div>
                </div>
                <div style={{ marginBottom: h.desktop ? '12px' : 0 }}>
                  <div style={{ fontSize: '10px', fontWeight: '500', color: secondaryTextColor, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                    MOBILE RESULT
                  </div>
                  <div style={{ fontSize: '13px', color: primaryTextColor, lineHeight: '1.5' }}>{h.mobileResult}</div>
                </div>
                {h.desktop && (
                  <div>
                    <div style={{ fontSize: '10px', fontWeight: '500', color: secondaryTextColor, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                      DESKTOP
                    </div>
                    <div style={{ fontSize: '13px', color: primaryTextColor }}>{h.desktop}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
