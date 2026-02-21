/**
 * Dynamic Food Image Fetcher
 * Searches Unsplash in real-time for the food item name — just like Google Image Search.
 * Type "Masala Dosa" → searches Unsplash for "Masala Dosa food" → returns the top result image.
 *
 * Uses the Unsplash API (free: 50 searches/hour, no paid plan needed).
 */

// Unsplash public access key (free demo key — works for up to 50 req/hour)
const UNSPLASH_KEY = 'K5-0TRBRuOw6dCiWvKuHvxHUi25YHcjzn1HKP3HtHCE';
const UNSPLASH_SEARCH = 'https://api.unsplash.com/search/photos';

// In-memory cache to avoid re-fetching the same term
const _cache = {};

/**
 * Fetches a food image URL from Unsplash by searching the food name.
 * Returns a Promise<string> with the image URL.
 *
 * @param {string} name - Food item name e.g. "Masala Dosa"
 * @param {string} category - Menu category e.g. "morning"
 * @returns {Promise<string>} - Image URL
 */
export async function fetchFoodImage(name = '', category = '') {
    if (!name.trim()) return getCategoryFallback(category);

    const query = `${name} food authentic`;
    if (_cache[query]) return _cache[query];

    try {
        const res = await fetch(
            `${UNSPLASH_SEARCH}?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape&client_id=${UNSPLASH_KEY}`
        );
        if (!res.ok) throw new Error('API error');
        const data = await res.json();
        const url = data?.results?.[0]?.urls?.small || getCategoryFallback(category);
        _cache[query] = url;
        return url;
    } catch {
        return getCategoryFallback(category);
    }
}

// Category-based emoji placeholder URLs (100% always work as last resort)
function getCategoryFallback(category) {
    const fallbacks = {
        morning: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400',
        afternoon: 'https://images.unsplash.com/photo-1563379091339-03246963d635?w=400',
        evening: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',
        mocktails: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400',
        icecream: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400',
        coffees: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400',
    };
    return fallbacks[category] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400';
}

// Kept for synchronous use (MenuItemCard display) — same category fallback
export function getAutoFoodImage(name = '', category = '') {
    return getCategoryFallback(category);
}

export default fetchFoodImage;
