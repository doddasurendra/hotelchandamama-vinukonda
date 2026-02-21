// ============================================================
// Hotel Chandamama - Database Layer (localStorage)
// All data stored locally. Admin can export to Excel / JSON.
// ============================================================

const TABLES = {
    MENU: 'hc_menu',
    ORDERS: 'hc_orders',
    REVIEWS: 'hc_reviews',
    CUSTOMERS: 'hc_customers',
    FUNCTION_BOOKINGS: 'hc_functions',
    CONTACT_MESSAGES: 'hc_contacts',
    GALLERY: 'hc_gallery',
    ANALYTICS: 'hc_analytics',
    DELIVERY_SETTINGS: 'hc_delivery',
    COUPONS: 'hc_coupons',
    INVENTORY: 'hc_inventory',
    SITE_CONTENT: 'hc_content',
    CHATBOT: 'hc_chatbot',
    NOTIFICATIONS: 'hc_notifications',
    ADMIN_SESSION: 'hc_admin_session',
};

// ---- Generic CRUD ----
export function getAll(table) {
    try {
        const data = localStorage.getItem(table);
        return data ? JSON.parse(data) : [];
    } catch { return []; }
}

export function getOne(table, id) {
    return getAll(table).find(r => r.id === id) || null;
}

export function insert(table, record) {
    const all = getAll(table);
    const newRecord = {
        ...record,
        id: record.id || generateId(),
        createdAt: record.createdAt || new Date().toISOString(),
    };
    all.push(newRecord);
    localStorage.setItem(table, JSON.stringify(all));
    return newRecord;
}

export function update(table, id, data) {
    const all = getAll(table);
    const idx = all.findIndex(r => r.id === id);
    if (idx === -1) return null;
    all[idx] = { ...all[idx], ...data, updatedAt: new Date().toISOString() };
    localStorage.setItem(table, JSON.stringify(all));
    return all[idx];
}

export function remove(table, id) {
    const all = getAll(table).filter(r => r.id !== id);
    localStorage.setItem(table, JSON.stringify(all));
}

export function setOne(table, data) {
    localStorage.setItem(table, JSON.stringify(data));
}

export function getSingle(table) {
    try {
        const data = localStorage.getItem(table);
        return data ? JSON.parse(data) : null;
    } catch { return null; }
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

// ---- Admin Auth ----
export const ADMIN_PASSWORD = 'Admin@hotelChandamama';

export function adminLogin(password) {
    if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem(TABLES.ADMIN_SESSION, JSON.stringify({
            loggedIn: true, role: 'Admin', time: new Date().toISOString()
        }));
        return true;
    }
    return false;
}
export function adminLogout() { sessionStorage.removeItem(TABLES.ADMIN_SESSION); }
export function isAdminLoggedIn() {
    try {
        const s = sessionStorage.getItem(TABLES.ADMIN_SESSION);
        return s ? JSON.parse(s).loggedIn === true : false;
    } catch { return false; }
}

// ---- Analytics ----
export function trackPageView(page) {
    const today = new Date().toISOString().split('T')[0];
    const all = getAll(TABLES.ANALYTICS);
    const existing = all.find(a => a.date === today && a.page === page);
    if (existing) {
        update(TABLES.ANALYTICS, existing.id, { views: (existing.views || 0) + 1 });
    } else {
        insert(TABLES.ANALYTICS, { date: today, page, views: 1 });
    }
}

// ---- Seed Data ----
export function seedDatabase() {
    // Only seed if no menu data exists
    if (getAll(TABLES.MENU).length > 0) return;

    const menuItems = [
        // MORNING
        { name: 'Idly (2 pcs)', nameTE: 'ఇడ్లీ (2)', price: 30, category: 'morning', available: true, imageUrl: '', description: 'Soft steamed rice cakes with sambar & chutney', descriptionTE: 'సాంబార్ & చట్నీతో మృదువైన ఇడ్లీలు' },
        { name: 'Plain Dosa', nameTE: 'సాదా దోశ', price: 45, category: 'morning', available: true, imageUrl: '', description: 'Crispy thin rice crepe with sambar & chutney', descriptionTE: 'పల్చని క్రిస్పీ దోశ' },
        { name: 'Masala Dosa', nameTE: 'మసాలా దోశ', price: 60, category: 'morning', available: true, imageUrl: '', description: 'Dosa stuffed with spiced potato filling', descriptionTE: 'మసాలా పూర్ణంతో దోశ' },
        { name: 'Onion Pesarattu', nameTE: 'ఉల్లిపాయ పెసరట్టు', price: 55, category: 'morning', available: true, imageUrl: '', description: 'Moong dal crepe with onions & green chillies', descriptionTE: 'పెసర పిండి అట్టు' },
        { name: 'Plain Pesarattu', nameTE: 'సాదా పెసరట్టు', price: 45, category: 'morning', available: true, imageUrl: '', description: 'Classic green moong dal crepe', descriptionTE: 'పెసర పిండి అట్టు' },
        { name: 'Upma', nameTE: 'ఉప్మా', price: 35, category: 'morning', available: true, imageUrl: '', description: 'Semolina upma with vegetables', descriptionTE: 'రవ్వ ఉప్మా' },
        { name: 'Vada (2 pcs)', nameTE: 'వడ (2)', price: 40, category: 'morning', available: true, imageUrl: '', description: 'Crispy medu vada with sambar & chutney', descriptionTE: 'మెదు వడ' },
        { name: 'Poori (2 pcs)', nameTE: 'పూరీ (2)', price: 50, category: 'morning', available: true, imageUrl: '', description: 'Puffed fried bread with potato curry', descriptionTE: 'పూరీ కూర' },
        { name: 'Chandamama Special Dosa', nameTE: 'చందమామ స్పెషల్ దోశ', price: 80, category: 'morning', available: true, imageUrl: '', description: 'Chef special loaded dosa with paneer & veggies', descriptionTE: 'సిఫ్ స్పెషల్ దోశ', isSpecial: true },
        // AFTERNOON
        { name: 'Meals (Full)', nameTE: 'మీల్స్ (ఫుల్)', price: 80, category: 'afternoon', available: true, imageUrl: '', description: 'Complete South Indian meal with rice, sambar, rasam, 2 curries, papad', descriptionTE: 'పూర్తి భోజనం' },
        { name: 'Half Meals', nameTE: 'హాఫ్ మీల్స్', price: 60, category: 'afternoon', available: true, imageUrl: '', description: 'Rice, sambar, one curry, papad', descriptionTE: 'హాఫ్ మీల్స్' },
        { name: 'Veg Biryani', nameTE: 'వెజ్ బిర్యానీ', price: 90, category: 'afternoon', available: true, imageUrl: '', description: 'Aromatic basmati rice with mixed vegetables & spices', descriptionTE: 'వెజ్ బిర్యానీ' },
        { name: 'Chapathi (2 pcs)', nameTE: 'చపాతీ (2)', price: 45, category: 'afternoon', available: true, imageUrl: '', description: 'Soft whole wheat chapathi with curry', descriptionTE: 'చపాతీ కూర' },
        { name: 'Parota (2 pcs)', nameTE: 'పరోటా (2)', price: 50, category: 'afternoon', available: true, imageUrl: '', description: 'Layered flaky paratha with curry', descriptionTE: 'పరోటా' },
        { name: 'Paneer Dosa', nameTE: 'పనీర్ దోశ', price: 75, category: 'afternoon', available: true, imageUrl: '', description: 'Dosa with paneer filling', descriptionTE: 'పనీర్ దోశ' },
        // EVENING
        { name: 'Samosa (2 pcs)', nameTE: 'సమోసా (2)', price: 30, category: 'evening', available: true, imageUrl: '', description: 'Crispy pastry with spiced potato filling', descriptionTE: 'సమోసా' },
        { name: 'Mirchi Bajji (2 pcs)', nameTE: 'మిర్చి బజ్జీ (2)', price: 25, category: 'evening', available: true, imageUrl: '', description: 'Deep fried spiced chilli fritters', descriptionTE: 'మిర్చి బజ్జీ' },
        { name: 'Onion Pakoda', nameTE: 'ఉల్లిపాయ పకోడా', price: 35, category: 'evening', available: true, imageUrl: '', description: 'Crispy onion fritters', descriptionTE: 'ఉల్లి పకోడా' },
        { name: 'Aloo Bonda (3 pcs)', nameTE: 'ఆలూ బొండా (3)', price: 30, category: 'evening', available: true, imageUrl: '', description: 'Potato balls in gram flour batter', descriptionTE: 'ఆలూ బొండా' },
        { name: 'Evening Tiffin Combo', nameTE: 'ఈవెనింగ్ కాంబో', price: 55, category: 'evening', available: true, imageUrl: '', description: 'Samosa + Pakoda + Chai combo', descriptionTE: 'ఈవెనింగ్ కాంబో', isSpecial: true },
        // MOCKTAILS
        { name: 'Blue Lagoon', nameTE: 'బ్లూ లగూన్', price: 80, category: 'mocktails', available: true, imageUrl: '', description: 'Refreshing blue-colored mocktail with lemon & mint', descriptionTE: 'బ్లూ లగూన్' },
        { name: 'Virgin Mojito', nameTE: 'వర్జిన్ మొహిటో', price: 75, category: 'mocktails', available: true, imageUrl: '', description: 'Fresh mint, lime & soda mocktail', descriptionTE: 'మింట్ మొహిటో' },
        { name: 'Watermelon Cooler', nameTE: 'పుచ్చకాయ కూలర్', price: 70, category: 'mocktails', available: true, imageUrl: '', description: 'Fresh watermelon juice with mint', descriptionTE: 'పుచ్చకాయ' },
        { name: 'Rose Milk Shake', nameTE: 'రోజ్ మిల్క్ షేక్', price: 65, category: 'mocktails', available: true, imageUrl: '', description: 'Chilled rose-flavoured milk shake', descriptionTE: 'రోజ్ మిల్క్ షేక్' },
        { name: 'Mango Lassi', nameTE: 'మామిడి లస్సీ', price: 70, category: 'mocktails', available: true, imageUrl: '', description: 'Thick mango yogurt drink', descriptionTE: 'మామిడి లస్సీ' },
        // ICE CREAM
        { name: 'Vanilla Scoop', nameTE: 'వెనిల్లా స్కూప్', price: 40, category: 'icecream', available: true, imageUrl: '', description: 'Classic creamy vanilla ice cream', descriptionTE: 'వెనిల్లా ఐస్ క్రీం' },
        { name: 'Chocolate Sundae', nameTE: 'చాకొలేట్ సండే', price: 70, category: 'icecream', available: true, imageUrl: '', description: 'Rich chocolate ice cream with sauce & nuts', descriptionTE: 'చాకొలేట్ సండే' },
        { name: 'Mango Ice Cream', nameTE: 'మామిడి ఐస్ క్రీం', price: 55, category: 'icecream', available: true, imageUrl: '', description: 'Fresh mango flavoured ice cream', descriptionTE: 'మామిడి ఐస్ క్రీం' },
        { name: 'Mixed Fruit Ice Cream', nameTE: 'మిక్స్డ్ ఫ్రూట్', price: 75, category: 'icecream', available: true, imageUrl: '', description: 'Assorted fruit ice cream bowl', descriptionTE: 'మిక్స్డ్ ఫ్రూట్' },
        // COFFEES
        { name: 'Filter Coffee', nameTE: 'ఫిల్టర్ కాఫీ', price: 25, category: 'coffees', available: true, imageUrl: '', description: 'Traditional South Indian filter coffee', descriptionTE: 'ఫిల్టర్ కాఫీ' },
        { name: 'Cappuccino', nameTE: 'కప్పుచ్చినో', price: 60, category: 'coffees', available: true, imageUrl: '', description: 'Frothy espresso based coffee with milk', descriptionTE: 'కప్పుచ్చినో' },
        { name: 'Cold Coffee', nameTE: 'కోల్డ్ కాఫీ', price: 65, category: 'coffees', available: true, imageUrl: '', description: 'Chilled blended coffee with milk', descriptionTE: 'కోల్డ్ కాఫీ' },
        { name: 'Hot Milk Tea', nameTE: 'టీ', price: 15, category: 'coffees', available: true, imageUrl: '', description: 'Classic masala chai', descriptionTE: 'మసాలా టీ' },
        { name: 'Lemon Tea', nameTE: 'నిమ్మకాయ టీ', price: 20, category: 'coffees', available: true, imageUrl: '', description: 'Refreshing hot lemon tea', descriptionTE: 'నిమ్మ టీ' },
    ];

    menuItems.forEach(item => insert(TABLES.MENU, {
        ...item,
        autoGenerated: true,
    }));

    // Default site content
    setOne(TABLES.SITE_CONTENT, {
        hotelName: 'Hotel Chandamama',
        tagline: 'SPOONS • SELF SERVICE • TAKE AWAY',
        address: 'NRT Road, Beside Indian Petrol Pump, Mulakaluru, Vinukonda, Andhra Pradesh',
        phone: '09989324091',
        whatsapp: '09989324091',
        email: 'hotelchandamama@gmail.com',
        openTime: '06:00',
        closeTime: '22:00',
        holidayNotice: '',
        holidayActive: false,
        dailySpecial: 'Chandamama Special Dosa – Chef\'s Pick of the Day!',
        introText: 'Welcome to Hotel Chandamama – Vinukonda\'s most loved pure vegetarian restaurant. We serve fresh, hygienic South Indian delicacies prepared with love. Experience the authentic taste of Andhra cuisine in our beautifully designed dining space.',
        instagram: 'https://instagram.com',
        facebook: 'https://facebook.com',
        youtube: 'https://youtube.com',
        mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3843.5!2d79.7556!3d16.0500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sHotel+Chandamama!5e0!3m2!1sen!2sin!4v1614000000000!5m2!1sen!2sin',
        logoUrl: '',
        heroUrl: '',
        rating: '4.3',
        reviewCount: '124',
    });

    // Default delivery settings
    setOne(TABLES.DELIVERY_SETTINGS, {
        enabled: true,
        maxDistance: 5,
        fee: 30,
        minOrder: 150,
        freeDeliveryAbove: 500,
        note: 'Food delivery for events/functions only. No door delivery.',
    });

    // Default chatbot
    setOne(TABLES.CHATBOT, {
        enabled: true,
        greeting: 'Namaste! 🙏 Welcome to Hotel Chandamama. How can I help you?',
        faqs: [
            { q: 'What are your opening hours?', a: 'We are open from 6:00 AM to 10:00 PM every day.' },
            { q: 'Where are you located?', a: 'NRT Road, Beside Indian Petrol Pump, Mulakaluru, Vinukonda, Andhra Pradesh.' },
            { q: 'What food do you serve?', a: 'We serve pure vegetarian South Indian cuisine including dosas, idlies, meals, mocktails, ice creams and coffees.' },
            { q: 'Do you offer home delivery?', a: 'We offer food delivery for events and functions only. Contact us on WhatsApp for bookings.' },
            { q: 'How can I contact you?', a: 'Call or WhatsApp us at 09989324091.' },
            { q: 'Do you take orders online?', a: 'Yes! Browse our menu and place your order on this website.' },
        ]
    });

    // Seed sample reviews
    const reviews = [
        { name: 'Ravi Kumar', rating: 5, comment: 'Best hotel in Vinukonda! Chandamama special dosa is absolutely amazing. Must visit!', approved: true, date: '2025-01-15' },
        { name: 'Lakshmi Devi', rating: 5, comment: 'Very clean, hygienic and delicious food. The mocktails are refreshing. Love this place!', approved: true, date: '2025-01-20' },
        { name: 'Suresh Babu', rating: 4, comment: 'Good food, reasonable prices. The filter coffee is great. Ambience is good.', approved: true, date: '2025-02-01' },
        { name: 'Anusha Reddy', rating: 5, comment: 'Excellent service! The interior is beautiful. Food is fresh and hot. Highly recommended.', approved: true, date: '2025-02-10' },
        { name: 'Mohan Rao', rating: 4, comment: 'Tasty food, good variety. The veg biryani is worth trying. Will visit again.', approved: true, date: '2025-02-15' },
    ];
    reviews.forEach(r => insert(TABLES.REVIEWS, r));

    // Seed gallery photos - hotel interior images will be added by admin
    const galleryPhotos = [
        { url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800', title: 'Restaurant Ambience', type: 'gallery' },
        { url: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800', title: 'Delicious Dosa', type: 'gallery' },
        { url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800', title: 'South Indian Platter', type: 'gallery' },
    ];
    galleryPhotos.forEach(p => insert(TABLES.GALLERY, p));

    // Sample inventory
    const inventory = [
        { name: 'Rice', unit: 'kg', quantity: 50, minLevel: 10, category: 'Grains' },
        { name: 'Dal (Moong)', unit: 'kg', quantity: 20, minLevel: 5, category: 'Pulses' },
        { name: 'Oil', unit: 'L', quantity: 15, minLevel: 3, category: 'Oils' },
        { name: 'Milk', unit: 'L', quantity: 30, minLevel: 10, category: 'Dairy' },
        { name: 'Tomatoes', unit: 'kg', quantity: 10, minLevel: 3, category: 'Vegetables' },
        { name: 'Onions', unit: 'kg', quantity: 15, minLevel: 5, category: 'Vegetables' },
    ];
    inventory.forEach(i => insert(TABLES.INVENTORY, i));
}

export { TABLES };
