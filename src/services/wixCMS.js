// ============================================================================
// WIX CMS CLIENT SERVICE - 6-Step Heuristics Structure
// ============================================================================

// Configuration - UPDATE THESE VALUES
const WIX_CLIENT_ID = import.meta.env.VITE_WIX_CLIENT_ID || 'aa50c411-1617-4031-ab8e-f4fbb484afc2';
// Collection ID - found in Wix CMS Settings
const COLLECTION_ID = import.meta.env.VITE_WIX_COLLECTION_ID || 'Import5';

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
 * Map CMS item to 6-step heuristic structure
 */
const mapCmsItemToHeuristic = (item) => {
  // Wix CMS returns data directly on item, not nested in item.data
  const d = item;
  
  return {
    id: item._id,
    step1_who_element: d.step1_who_element || '',
    step2_where_parent: d.step2_where_parent || 'any',
    step3a_category: d.step3a_category || '',
    step3b_subcategory: d.step3b_subcategory || '',
    step4_condition_type: d.step4_condition_type || 'none',
    step4_condition_value: d.step4_condition_value || '',
    step5_action: d.step5_action || '',
    step6_output: d.step6_output || '',
    status: d.status || 'Active',
    history: d.history ? JSON.parse(d.history) : {},
  };
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
    // query() returns a builder, need to call .find() to execute
    // Use .limit(1000) to get all items (default is 50)
    const queryBuilder = client.items.query(COLLECTION_ID).limit(1000);
    const response = await queryBuilder.find();
    console.log('Items count:', response?.items?.length || 0);

    const heuristics = (response.items || []).map(mapCmsItemToHeuristic);

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
      step1_who_element: heuristic.step1_who_element,
      step2_where_parent: heuristic.step2_where_parent,
      step3a_category: heuristic.step3a_category,
      step3b_subcategory: heuristic.step3b_subcategory,
      step4_condition_type: heuristic.step4_condition_type,
      step4_condition_value: heuristic.step4_condition_value,
      step5_action: heuristic.step5_action,
      step6_output: heuristic.step6_output,
      status: heuristic.status || 'Active',
      history: JSON.stringify(heuristic.history || {}),
    });

    return { success: true, data: mapCmsItemToHeuristic(response), error: null };
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
      step1_who_element: heuristic.step1_who_element,
      step2_where_parent: heuristic.step2_where_parent,
      step3a_category: heuristic.step3a_category,
      step3b_subcategory: heuristic.step3b_subcategory,
      step4_condition_type: heuristic.step4_condition_type,
      step4_condition_value: heuristic.step4_condition_value,
      step5_action: heuristic.step5_action,
      step6_output: heuristic.step6_output,
      status: heuristic.status || 'Active',
      history: JSON.stringify(heuristic.history || {}),
    });

    return { success: true, data: mapCmsItemToHeuristic(response), error: null };
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
