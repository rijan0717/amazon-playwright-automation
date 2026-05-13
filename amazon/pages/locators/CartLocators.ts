// ============================================================
// FILE: amazon/pages/locators/CartLocators.ts
// PURPOSE: All Amazon cart page selectors — NO logic here
// USED BY: pages/CartPage.ts
// ============================================================

export const CartLocators = {

  // ── Search ────────────────────────────────────────────────
  searchBox:          'Search Amazon',
  searchButton:       'Go',

  // ── Product listing ───────────────────────────────────────
  firstProduct:       '.a-link-normal',

  // ── Product detail page ───────────────────────────────────
  quantityDropdown:   'Quantity:1',
  addToCartButton:    'Add to cart',

  // ── Cart / checkout ───────────────────────────────────────
  proceedToCheckout:  'Proceed to checkout',
  signInHeading:      'Sign in or create account',

  // ── Out of stock ──────────────────────────────────────────
  outOfStockSelector: '#outOfStock',
  outOfStockText:     'Currently unavailable',
  cannotShipText:     'This item cannot be shipped to your selected delivery location',
  unavailableText:    'This item cannot be',

} as const;