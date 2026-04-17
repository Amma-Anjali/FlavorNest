/**
 * FlavorNest – Global Kitchen  |  script.js
 * ─────────────────────────────────────────
 * Features:
 *  • 10 recipes across 6 world cuisines
 *  • Live search by name, ingredient, cuisine
 *  • Cuisine filter (hero pills + culture cards)
 *  • Favorites with localStorage persistence
 *  • Recipe detail modal
 *  • AI ingredient-based recipe finder (JS logic)
 *  • Scroll-reveal animations
 *  • Navbar scroll effect + mobile hamburger
 */

/* ════════════════════════════════════════
   RECIPE DATABASE  (10 global recipes)
════════════════════════════════════════ */
const recipes = [
  /* ─── INDIAN ─── */
  {
    id: 0,
    title: 'Butter Chicken',
    cuisine: 'Indian',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80',
    time: '50 min',
    difficulty: 'Medium',
    servings: '4',
    description: 'Tender chicken simmered in a velvety tomato-cream sauce spiced with garam masala, cumin and fenugreek. The definitive Indian comfort classic.',
    keywords: ['chicken', 'tomato', 'cream', 'butter', 'masala', 'curry'],
    ingredients: [
      '700g boneless chicken, cubed',
      '200g Greek yogurt',
      '2 tsp garam masala, 1 tsp cumin',
      '1 tsp turmeric, 1 tsp chili powder',
      '400g crushed tomatoes',
      '150ml heavy cream',
      '2 tbsp butter, 2 garlic cloves, fresh ginger',
      'Salt, sugar, fenugreek leaves (kasuri methi)',
    ],
    steps: [
      'Marinate chicken in yogurt and half the spices for at least 1 hour.',
      'Grill or pan-sear chicken until slightly charred; set aside.',
      'In the same pan, melt butter and sauté garlic + ginger paste.',
      'Add crushed tomatoes and remaining spices; simmer 15 min.',
      'Blend sauce smooth. Return to pan, add cream and chicken.',
      'Simmer 10 min. Finish with kasuri methi and serve with naan.',
    ],
  },
  {
    id: 1,
    title: 'Masala Dosa',
    cuisine: 'Indian',
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=600&q=80',
    time: '40 min',
    difficulty: 'Medium',
    servings: '4',
    description: 'A crispy fermented rice-and-lentil crepe filled with spiced potato masala, served with coconut chutney and tangy sambar.',
    keywords: ['rice', 'lentil', 'potato', 'dosa', 'south indian', 'vegan'],
    ingredients: [
      '2 cups rice, ½ cup urad dal (soaked overnight)',
      '3 large potatoes, boiled & mashed',
      '1 tsp mustard seeds, curry leaves',
      '2 onions, 2 green chillies, turmeric',
      'Fresh coriander, coconut oil',
      'Coconut chutney & sambar to serve',
    ],
    steps: [
      'Grind soaked rice and dal into a smooth batter; ferment overnight.',
      'Heat a non-stick tawa, spread batter in thin circles.',
      'Cook until golden and crisp on the edges.',
      'For the filling: sauté mustard seeds, onions, chillies.',
      'Add mashed potato, turmeric and salt; mix well.',
      'Place potato filling on dosa, fold and serve with chutney.',
    ],
  },

  /* ─── ITALIAN ─── */
  {
    id: 2,
    title: 'Pasta Carbonara',
    cuisine: 'Italian',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600&q=80',
    time: '25 min',
    difficulty: 'Easy',
    servings: '2',
    description: 'The Roman original — silky eggs and Pecorino Romano emulsified with guanciale and plenty of black pepper. No cream, ever.',
    keywords: ['pasta', 'egg', 'cheese', 'pork', 'guanciale', 'bacon'],
    ingredients: [
      '200g spaghetti or rigatoni',
      '150g guanciale or pancetta, cubed',
      '3 egg yolks + 1 whole egg',
      '60g Pecorino Romano, grated',
      '30g Parmesan, grated',
      'Freshly cracked black pepper, salt',
    ],
    steps: [
      'Cook pasta in well-salted boiling water al dente. Reserve 1 cup pasta water.',
      'Render guanciale in a cold pan until crispy; remove from heat.',
      'Whisk egg yolks, whole egg and grated cheese together.',
      'Drain pasta, add to the pan with guanciale off heat.',
      'Pour egg mixture over, toss vigorously, adding pasta water to create a glossy sauce.',
      'Serve immediately with extra cheese and black pepper.',
    ],
  },
  {
    id: 3,
    title: 'Margherita Pizza',
    cuisine: 'Italian',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80',
    time: '45 min',
    difficulty: 'Easy',
    servings: '2',
    description: 'The timeless Neapolitan classic — thin, airy crust, San Marzano tomato sauce, fresh mozzarella and fragrant basil.',
    keywords: ['pizza', 'tomato', 'mozzarella', 'basil', 'dough', 'cheese'],
    ingredients: [
      'Pizza dough (store-bought or homemade)',
      '1 cup San Marzano tomatoes, crushed',
      '200g fresh mozzarella di bufala',
      'Fresh basil leaves',
      '2 tbsp extra-virgin olive oil',
      'Sea salt and black pepper',
    ],
    steps: [
      'Preheat oven to 250 °C with a pizza stone or baking sheet inside.',
      'Roll dough thin on a floured surface to ~12 inches.',
      'Spread crushed tomatoes, leaving a 2 cm border.',
      'Tear mozzarella over the sauce.',
      'Bake 10–12 min until crust is golden and cheese is bubbling.',
      'Top with fresh basil and a drizzle of olive oil. Serve immediately.',
    ],
  },

  /* ─── CHINESE ─── */
  {
    id: 4,
    title: 'Egg Fried Rice',
    cuisine: 'Chinese',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=80',
    time: '20 min',
    difficulty: 'Easy',
    servings: '2',
    description: 'Restaurant-style wok-tossed fried rice with fluffy scrambled eggs, spring onions, soy sauce and sesame oil. The perfect weeknight staple.',
    keywords: ['rice', 'egg', 'soy', 'vegetable', 'wok', 'quick', 'sesame'],
    ingredients: [
      '2 cups day-old cooked jasmine rice',
      '3 eggs, lightly beaten',
      '3 spring onions, sliced',
      '2 garlic cloves, minced',
      '2 tbsp soy sauce, 1 tsp sesame oil',
      '2 tbsp vegetable oil, white pepper',
    ],
    steps: [
      'Heat wok or large skillet until smoking hot. Add oil.',
      'Scramble eggs in the wok, breaking into small pieces. Set aside.',
      'Add garlic, stir-fry 30 seconds. Add cold rice, press flat.',
      'Toss rice over high heat for 2–3 min until separated and slightly toasty.',
      'Return eggs, add soy sauce and sesame oil. Toss everything together.',
      'Garnish with spring onions. Season with white pepper and serve hot.',
    ],
  },
  {
    id: 5,
    title: 'Steamed Dumplings (Jiaozi)',
    cuisine: 'Chinese',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&q=80',
    time: '60 min',
    difficulty: 'Medium',
    servings: '4',
    description: 'Delicate handmade dumplings filled with pork, ginger, cabbage and sesame oil — steamed to pillowy perfection and served with chilli-soy dipping sauce.',
    keywords: ['pork', 'cabbage', 'ginger', 'dumpling', 'dim sum', 'steamed'],
    ingredients: [
      '2 cups all-purpose flour, ½ cup hot water',
      '300g ground pork',
      '1 cup napa cabbage, salted & squeezed dry',
      '1 tbsp grated ginger, 2 garlic cloves',
      '2 tbsp soy sauce, 1 tsp sesame oil',
      'Soy sauce, rice vinegar, chili oil for dipping',
    ],
    steps: [
      'Mix flour and hot water; knead until smooth. Rest 30 min covered.',
      'Combine all filling ingredients; mix until sticky.',
      'Roll dough into a log; cut into 24 pieces. Roll each into a thin circle.',
      'Place 1 tsp filling in the centre, fold and pleat the edges to seal.',
      'Steam in a bamboo steamer over boiling water for 12–14 min.',
      'Serve immediately with dipping sauce of soy, vinegar and chili oil.',
    ],
  },

  /* ─── MEXICAN ─── */
  {
    id: 6,
    title: 'Street Tacos al Pastor',
    cuisine: 'Mexican',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80',
    time: '35 min',
    difficulty: 'Medium',
    servings: '4',
    description: 'Marinated pork seasoned with dried chillies, achiote and pineapple, seared until crispy and served in warm corn tortillas with fresh salsa.',
    keywords: ['pork', 'taco', 'pineapple', 'chili', 'corn', 'mexican'],
    ingredients: [
      '600g pork shoulder, thinly sliced',
      '2 dried guajillo chillies, soaked',
      '1 tbsp achiote paste',
      '½ pineapple, sliced',
      '2 garlic cloves, cumin, oregano',
      'Corn tortillas, onion, coriander, lime',
    ],
    steps: [
      'Blend soaked chillies, achiote, garlic, cumin and oregano with a splash of water.',
      'Marinate pork slices in this paste for at least 2 hours (overnight is best).',
      'Sear pork in a hot pan until caramelised and cooked through.',
      'Grill pineapple slices until lightly charred; dice.',
      'Warm corn tortillas on a dry griddle.',
      'Assemble tacos: pork, pineapple, diced onion, coriander and a squeeze of lime.',
    ],
  },

  /* ─── JAPANESE ─── */
  {
    id: 7,
    title: 'Tonkotsu Ramen',
    cuisine: 'Japanese',
    image: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600&q=80',
    time: '3 hrs',
    difficulty: 'Hard',
    servings: '2',
    description: 'A soul-warming bowl of rich, cloudy pork-bone broth simmered for hours, topped with chashu belly, soft-boiled marinated egg, bamboo shoots and nori.',
    keywords: ['pork', 'noodle', 'ramen', 'egg', 'broth', 'japanese', 'soup'],
    ingredients: [
      '1 kg pork trotters & neck bones',
      '2 packs fresh ramen noodles',
      '4 soft-boiled eggs, marinated in soy',
      'Chashu pork belly, thinly sliced',
      'Bamboo shoots (menma), nori, spring onions',
      'Sesame oil, white miso, soy sauce, mirin',
    ],
    steps: [
      'Blanch bones, rinse thoroughly, then simmer in fresh water 10–12 hrs.',
      'Strain broth; season with miso, soy and mirin.',
      'Roll pork belly tightly, tie with string and braise in soy, mirin and sake 2 hrs.',
      'Marinate soft-boiled eggs in soy, mirin and water overnight.',
      'Cook ramen noodles separately until al dente; drain.',
      'Assemble bowls: ladle broth, add noodles, top with all garnishes.',
    ],
  },
  {
    id: 8,
    title: 'Salmon Nigiri Sushi',
    cuisine: 'Japanese',
    image: 'https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=600&q=80',
    time: '40 min',
    difficulty: 'Medium',
    servings: '2',
    description: 'Perfectly seasoned sushi rice shaped by hand and topped with silky, buttery slices of sashimi-grade salmon. Simple elegance on a plate.',
    keywords: ['salmon', 'rice', 'fish', 'sushi', 'sashimi', 'seafood'],
    ingredients: [
      '2 cups Japanese short-grain rice',
      '3 tbsp rice vinegar, 1 tbsp sugar, 1 tsp salt',
      '300g sashimi-grade salmon, sliced',
      'Wasabi paste',
      'Soy sauce and pickled ginger for serving',
    ],
    steps: [
      'Rinse rice until water runs clear; cook in rice cooker or pot.',
      'Mix rice vinegar, sugar and salt; fold into hot rice. Fan to cool.',
      'Wet hands with water; shape rice into oblongs (~30g each).',
      'Dab a tiny amount of wasabi on each rice ball.',
      'Drape a salmon slice over each rice ball; gently press to adhere.',
      'Serve with soy sauce and pickled ginger.',
    ],
  },

  /* ─── FRENCH ─── */
  {
    id: 9,
    title: 'Ratatouille Provençale',
    cuisine: 'French',
    image: 'https://images.unsplash.com/photo-1543353071-087092ec393a?w=600&q=80',
    time: '55 min',
    difficulty: 'Easy',
    servings: '4',
    description: 'A sun-drenched Provençal stew of courgette, aubergine, tomatoes and peppers slowly braised with olive oil and herbes de Provence.',
    keywords: ['vegetable', 'tomato', 'courgette', 'aubergine', 'vegan', 'french', 'stew'],
    ingredients: [
      '1 aubergine, 2 courgettes, diced',
      '2 bell peppers (red & yellow), diced',
      '4 ripe tomatoes, chopped',
      '1 onion, 4 garlic cloves',
      '3 tbsp olive oil, herbes de Provence',
      'Fresh basil, salt and black pepper',
    ],
    steps: [
      'Sauté onion in olive oil until soft; add garlic and cook 1 min.',
      'Add aubergine, cook 5 min until beginning to soften.',
      'Add peppers, courgettes and tomatoes. Season generously.',
      'Stir in herbes de Provence; cover and simmer 35–40 min.',
      'Uncover for the last 10 min to thicken the sauce.',
      'Finish with torn fresh basil and a glug of olive oil. Serve warm or at room temperature.',
    ],
  },
];

/* ════════════════════════════════════════
   STATE
════════════════════════════════════════ */
let favorites     = JSON.parse(localStorage.getItem('gk_favs') || '[]');
let activeSearch  = '';
let activeCuisine = '';

/* ════════════════════════════════════════
   UTILITY HELPERS
════════════════════════════════════════ */

/** Show a brief toast notification */
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2600);
}

/** Persist favorites and refresh badge + drawer */
function saveFavorites() {
  localStorage.setItem('gk_favs', JSON.stringify(favorites));
  document.getElementById('favBadge').textContent = favorites.length;
  renderFavDrawer();
}

const isFav = id => favorites.includes(id);

/** Toggle a recipe's favorite status */
function toggleFav(id, e) {
  if (e) e.stopPropagation(); // prevent opening modal
  if (isFav(id)) {
    favorites = favorites.filter(f => f !== id);
    showToast('Removed from favorites');
  } else {
    favorites.push(id);
    showToast('♥ Added to favorites!');
  }
  saveFavorites();
  renderRecipes(); // re-render so heart icons update
}

/* ════════════════════════════════════════
   RENDER RECIPE CARDS
════════════════════════════════════════ */

/** Build cuisine CSS class name */
const cuisineClass = c => `tag-${c.toLowerCase()}`;

/** Build a recipe card's HTML */
function buildCard(r) {
  const fav     = isFav(r.id);
  const diffCls = 'difficulty-' + r.difficulty.toLowerCase();
  const tagCls  = cuisineClass(r.cuisine);

  return `
    <div class="recipe-card reveal" data-id="${r.id}" role="button" tabindex="0" aria-label="View ${r.title}">
      <div class="rc-img-wrap">
        <img src="${r.image}" alt="${r.title}" class="rc-img" loading="lazy" />
        <span class="rc-cuisine ${tagCls}">${r.cuisine}</span>
        <button
          class="rc-fav ${fav ? 'is-fav' : ''}"
          data-id="${r.id}"
          aria-label="${fav ? 'Remove from favorites' : 'Add to favorites'}"
          onclick="toggleFav(${r.id}, event)"
        >${fav ? '♥' : '♡'}</button>
      </div>
      <div class="rc-body">
        <h3 class="rc-title">${r.title}</h3>
        <div class="rc-meta">
          <span>🕒 ${r.time}</span>
          <span class="${diffCls}">📊 ${r.difficulty}</span>
          <span>👤 ${r.servings}</span>
        </div>
      </div>
    </div>
  `;
}

/** Filter recipes by search + cuisine, then render into the grid */
function renderRecipes() {
  const grid    = document.getElementById('recipesGrid');
  const noRes   = document.getElementById('noResults');
  const label   = document.getElementById('filterLabel');
  const chipW   = document.getElementById('filterChipWrap');
  const chipTxt = document.getElementById('filterChipText');

  const filtered = recipes.filter(r => {
    // cuisine match
    const cuisineOk = !activeCuisine || r.cuisine === activeCuisine;
    // text search: title, cuisine, keywords
    const q = activeSearch.toLowerCase();
    const searchOk = !q ||
      r.title.toLowerCase().includes(q) ||
      r.cuisine.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.keywords.some(k => k.includes(q)) ||
      r.ingredients.some(i => i.toLowerCase().includes(q));
    return cuisineOk && searchOk;
  });

  // Update label
  if (activeCuisine) {
    label.textContent = `Showing ${filtered.length} ${activeCuisine} recipe${filtered.length !== 1 ? 's' : ''}`;
    chipW.style.display = 'block';
    chipTxt.textContent  = `🍽 ${activeCuisine}`;
  } else if (activeSearch) {
    label.textContent = `${filtered.length} result${filtered.length !== 1 ? 's' : ''} for "${activeSearch}"`;
    chipW.style.display = 'none';
  } else {
    label.textContent = 'Showing all recipes';
    chipW.style.display = 'none';
  }

  if (filtered.length === 0) {
    grid.innerHTML = '';
    noRes.style.display = 'block';
  } else {
    grid.innerHTML = filtered.map(buildCard).join('');
    noRes.style.display = 'none';
    // Add click listeners to newly rendered cards
    grid.querySelectorAll('.recipe-card').forEach(card => {
      card.addEventListener('click',  () => openModal(+card.dataset.id));
      card.addEventListener('keydown', e => { if (e.key === 'Enter') openModal(+card.dataset.id); });
    });
    observeReveal();
  }
}

/* ════════════════════════════════════════
   RECIPE MODAL
════════════════════════════════════════ */

/** Open recipe detail modal for the given recipe id */
function openModal(id) {
  const r       = recipes.find(r => r.id === id);
  if (!r) return;

  const overlay  = document.getElementById('modalOverlay');
  const content  = document.getElementById('modalContent');
  const tagClass = cuisineClass(r.cuisine);

  content.innerHTML = `
    <img src="${r.image}" alt="${r.title}" class="modal-img" />
    <div class="modal-body">
      <span class="modal-cuisine ${tagClass}">${r.cuisine}</span>
      <h2 class="modal-title">${r.title}</h2>
      <div class="modal-meta">
        <span>🕒 ${r.time}</span>
        <span>📊 ${r.difficulty}</span>
        <span>👤 ${r.servings} servings</span>
      </div>
      <p class="modal-desc">${r.description}</p>

      <p class="modal-h">Ingredients</p>
      <ul class="modal-ing">
        ${r.ingredients.map(i => `<li>${i}</li>`).join('')}
      </ul>

      <p class="modal-h">Instructions</p>
      <ol class="modal-steps">
        ${r.steps.map(s => `<li>${s}</li>`).join('')}
      </ol>

      <button
        class="btn btn-gold"
        onclick="toggleFav(${r.id}, event)"
        id="modalFavBtn"
      >
        ${isFav(r.id) ? '♥ Remove from Favorites' : '♡ Add to Favorites'}
      </button>
    </div>
  `;

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// Close modal by clicking overlay background
document.getElementById('modalOverlay').addEventListener('click', e => {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
});
document.getElementById('modalClose').addEventListener('click', closeModal);

// Keyboard: Escape closes modal or drawer
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeModal(); closeDrawer(); }
});

/* ════════════════════════════════════════
   FAVORITES DRAWER
════════════════════════════════════════ */

function renderFavDrawer() {
  const list = document.getElementById('favList');
  if (favorites.length === 0) {
    list.innerHTML = `
      <div class="fav-empty">
        <div class="fav-icon">♡</div>
        <p>No favorites yet.<br/>Tap the heart on any recipe!</p>
      </div>
    `;
    return;
  }
  list.innerHTML = favorites.map(id => {
    const r = recipes.find(r => r.id === id);
    if (!r) return '';
    return `
      <div class="fav-item" onclick="openModal(${r.id}); closeDrawer();">
        <img src="${r.image}" alt="${r.title}" />
        <div class="fav-item-info">
          <h4>${r.title}</h4>
          <p>${r.cuisine} · ${r.time}</p>
        </div>
      </div>
    `;
  }).join('');
}

function openDrawer() {
  document.getElementById('favDrawer').classList.add('open');
  document.getElementById('drawerBackdrop').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeDrawer() {
  document.getElementById('favDrawer').classList.remove('open');
  document.getElementById('drawerBackdrop').classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('favNavBtn').addEventListener('click',    openDrawer);
document.getElementById('drawerClose').addEventListener('click',  closeDrawer);
document.getElementById('drawerBackdrop').addEventListener('click', closeDrawer);

/* ════════════════════════════════════════
   SEARCH
════════════════════════════════════════ */

document.getElementById('searchInput').addEventListener('input', function () {
  activeSearch = this.value.trim();
  renderRecipes();
  if (activeSearch) {
    document.getElementById('trending').scrollIntoView({ behavior: 'smooth' });
  }
});

document.getElementById('searchBtn').addEventListener('click', () => {
  document.getElementById('trending').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('searchInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('trending').scrollIntoView({ behavior: 'smooth' });
});

/* ════════════════════════════════════════
   CUISINE FILTER
   Shared logic used by hero pills, culture cards and filter chip clear
════════════════════════════════════════ */

function applyCuisineFilter(cuisine) {
  activeCuisine = cuisine;

  // Sync hero pills
  document.querySelectorAll('.pill').forEach(p => {
    p.classList.toggle('active', p.dataset.cuisine === cuisine);
  });

  renderRecipes();
  document.getElementById('trending').scrollIntoView({ behavior: 'smooth' });
}

// Hero pills
document.querySelectorAll('.pill').forEach(pill => {
  pill.addEventListener('click', () => applyCuisineFilter(pill.dataset.cuisine));
});

// Culture cards in "Explore by Culture" section
document.querySelectorAll('.culture-card').forEach(card => {
  card.addEventListener('click', () => applyCuisineFilter(card.dataset.cuisine));
});

// Clear filter chip (×) button
document.getElementById('clearFilter').addEventListener('click', () => {
  applyCuisineFilter('');
});

// "Clear Search" button in no-results state
document.getElementById('clearSearchBtn').addEventListener('click', () => {
  document.getElementById('searchInput').value = '';
  activeSearch  = '';
  activeCuisine = '';
  applyCuisineFilter('');
});

/* ════════════════════════════════════════
   AI RECIPE FINDER
   Simple JS logic: match user-typed ingredients
   against each recipe's keyword array
════════════════════════════════════════ */

document.getElementById('aiFindBtn').addEventListener('click', () => {
  const rawInput  = document.getElementById('aiInput').value.trim();
  const resultsEl = document.getElementById('aiResults');
  const emptyEl   = document.getElementById('aiEmpty');

  if (!rawInput) {
    showToast('Please enter some ingredients first 🥄');
    return;
  }

  // Parse user input into individual ingredient tokens
  const tokens = rawInput.toLowerCase()
    .split(/[,\+\s]+/)
    .map(t => t.trim())
    .filter(Boolean);

  // Score each recipe by how many of the user's ingredients it matches
  const scored = recipes.map(r => {
    const score = tokens.reduce((acc, token) => {
      const matches =
        r.keywords.some(k => k.includes(token)) ||
        r.title.toLowerCase().includes(token) ||
        r.cuisine.toLowerCase().includes(token);
      return acc + (matches ? 1 : 0);
    }, 0);
    return { ...r, score };
  }).filter(r => r.score > 0).sort((a, b) => b.score - a.score);

  // Show results or empty state
  if (scored.length === 0) {
    resultsEl.style.display = 'none';
    emptyEl.style.display   = 'block';
    return;
  }

  emptyEl.style.display  = 'none';
  resultsEl.style.display = 'grid';

  resultsEl.innerHTML = scored.slice(0, 6).map(r => `
    <div class="ai-result-card" onclick="openModal(${r.id})">
      <img src="${r.image}" alt="${r.title}" loading="lazy" />
      <div class="ai-result-info">
        <h4>${r.title}</h4>
        <p>${r.cuisine} · ${r.time}</p>
      </div>
    </div>
  `).join('');
});

// Allow Enter key in AI input
document.getElementById('aiInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('aiFindBtn').click();
});

/* ════════════════════════════════════════
   NAVBAR: scroll shadow + hamburger menu
════════════════════════════════════════ */

const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open);
});

// Close mobile nav when any link is clicked
navLinks.addEventListener('click', e => {
  if (e.target.classList.contains('nav-link')) {
    navLinks.classList.remove('open');
  }
});

/* ════════════════════════════════════════
   SCROLL REVEAL (Intersection Observer)
   Adds .visible to .reveal elements as they
   enter the viewport, with stagger delay.
════════════════════════════════════════ */

function observeReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Stagger cards based on their sibling index
        const siblings = Array.from(entry.target.parentNode.children);
        const idx      = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${Math.min(idx * 0.07, 0.42)}s`;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.10 });

  document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
}

/* ════════════════════════════════════════
   INIT — run once DOM is ready
════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // Render the recipe grid
  renderRecipes();

  // Restore favorites state (badge + drawer)
  saveFavorites();

  // Observe all existing .reveal elements (section headers, culture cards, etc.)
  document.querySelectorAll('.sec-header, .culture-card, .featured-card').forEach(el => {
    el.classList.add('reveal');
  });
  observeReveal();
});
