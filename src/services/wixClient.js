// ============================================================================
// WIX CMS CLIENT SERVICE
// ============================================================================

// Configuration - UPDATE THESE VALUES
const WIX_CLIENT_ID = import.meta.env.VITE_WIX_CLIENT_ID || 'aa50c411-1617-4031-ab8e-f4fbb484afc2';
// Try different collection ID formats - Wix uses various naming conventions
const COLLECTION_ID = import.meta.env.VITE_WIX_COLLECTION_ID || 'Mobile-Algo-Heuristics';

// Client state
let wixClient = null;
let sdkAvailable = null;

/**
 * Check if Wix CMS is configured
 */
export const isWixConfigured = () => {
  return !!WIX_CLIENT_ID;
};

/**
 * Initialize the Wix client (lazy loads SDK)
 */
const initializeClient = async () => {
  if (!WIX_CLIENT_ID) {
    return null;
  }

  if (wixClient) {
    return wixClient;
  }

  if (sdkAvailable === false) {
    return null;
  }

  try {
    const [sdkModule, dataModule] = await Promise.all([
      import('@wix/sdk'),
      import('@wix/data')
    ]);
    
    const { createClient, OAuthStrategy } = sdkModule;
    const { items } = dataModule;
    
    wixClient = createClient({
      modules: { items },
      auth: OAuthStrategy({ clientId: WIX_CLIENT_ID }),
    });
    
    sdkAvailable = true;
    console.log('Wix SDK initialized successfully');
    return wixClient;
  } catch (error) {
    console.warn('Wix SDK not available:', error.message);
    sdkAvailable = false;
    return null;
  }
};

/**
 * Fetch all heuristics from Wix CMS
 */
export const fetchHeuristics = async () => {
  const client = await initializeClient();
  if (!client) {
    return { success: false, data: [], error: 'NOT_CONFIGURED' };
  }

  try {
    console.log('Fetching from collection:', COLLECTION_ID);
    const response = await client.items.query(COLLECTION_ID);
    console.log('Response:', response);

    const heuristics = (response.items || []).map((item) => ({
      id: item._id,
      category: item.data?.category || item.category || '',
      elementType: item.data?.elementType || item.elementType || '',
      condition: item.data?.condition || item.condition || '',
      decision: item.data?.decision || item.decision || '',
      desktopValue: item.data?.desktopValue || item.desktopValue || '',
      mobileResult: item.data?.mobileResult || item.mobileResult || '',
      title: item.data?.title || item.title || '',
    }));

    return { success: true, data: heuristics, error: null };
  } catch (error) {
    console.error('Error fetching heuristics:', error);
    return { success: false, data: [], error: error.message };
  }
};

/**
 * Create a new heuristic in Wix CMS
 */
export const createHeuristic = async (heuristic) => {
  const client = await initializeClient();
  if (!client) {
    return { success: false, data: null, error: 'NOT_CONFIGURED' };
  }

  try {
    const response = await client.items.insert(COLLECTION_ID, {
      category: heuristic.category,
      elementType: heuristic.elementType,
      condition: heuristic.condition,
      decision: heuristic.decision,
      desktopValue: heuristic.desktopValue,
      mobileResult: heuristic.mobileResult,
    });

    const newHeuristic = {
      id: response._id,
      category: response.data?.category || response.category || '',
      elementType: response.data?.elementType || response.elementType || '',
      condition: response.data?.condition || response.condition || '',
      decision: response.data?.decision || response.decision || '',
      desktopValue: response.data?.desktopValue || response.desktopValue || '',
      mobileResult: response.data?.mobileResult || response.mobileResult || '',
    };

    return { success: true, data: newHeuristic, error: null };
  } catch (error) {
    console.error('Error creating heuristic:', error);
    return { success: false, data: null, error: error.message };
  }
};

/**
 * Delete a heuristic from Wix CMS
 */
export const deleteHeuristic = async (id) => {
  const client = await initializeClient();
  if (!client) {
    return { success: false, error: 'NOT_CONFIGURED' };
  }

  try {
    await client.items.remove(COLLECTION_ID, id);
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting heuristic:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Update a heuristic in Wix CMS
 */
export const updateHeuristic = async (id, heuristic) => {
  const client = await initializeClient();
  if (!client) {
    return { success: false, data: null, error: 'NOT_CONFIGURED' };
  }

  try {
    const response = await client.items.update(COLLECTION_ID, {
      _id: id,
      category: heuristic.category,
      elementType: heuristic.elementType,
      condition: heuristic.condition,
      decision: heuristic.decision,
      desktopValue: heuristic.desktopValue,
      mobileResult: heuristic.mobileResult,
    });

    const updatedHeuristic = {
      id: response._id,
      category: response.data?.category || response.category || '',
      elementType: response.data?.elementType || response.elementType || '',
      condition: response.data?.condition || response.condition || '',
      decision: response.data?.decision || response.decision || '',
      desktopValue: response.data?.desktopValue || response.desktopValue || '',
      mobileResult: response.data?.mobileResult || response.mobileResult || '',
    };

    return { success: true, data: updatedHeuristic, error: null };
  } catch (error) {
    console.error('Error updating heuristic:', error);
    return { success: false, data: null, error: error.message };
  }
};

export default {
  fetchHeuristics,
  createHeuristic,
  deleteHeuristic,
  updateHeuristic,
  isWixConfigured,
};

