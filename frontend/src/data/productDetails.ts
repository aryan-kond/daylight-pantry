// Verified product facts shown on each product page.
// Only add something here once it is confirmed from the real product label.
// Never guess ingredients, allergens or nutrition: leave the product out instead.
export type ProductFacts = {
  ingredients?: string;
  allergens?: string;
  nutrition?: string;
  storage?: string;
};

export const PRODUCT_FACTS: Record<string, ProductFacts> = {
  // Example (replace with real, checked information). The key is the product id:
  // "honey-almond-granola": {
  //   ingredients: "Rolled oats, almonds, honey, ...",
  //   allergens: "Contains almonds.",
  //   nutrition: "Per 100 g: ...",
  //   storage: "Store in a cool, dry place.",
  // },
};
