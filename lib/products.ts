export type Game = "pokemon" | "mtg" | "yugioh";
export type Condition = "Near Mint" | "Lightly Played" | "Moderately Played" | "Sealed";

export interface Product {
  id: string;
  name: string;
  game: Game;
  set: string;
  rarity: string;
  condition: Condition;
  price: number; // GBP
  stock: number;
  blurb: string;
  image?: string; // optional photo URL; falls back to generated art
}

export const GAMES: Record<Game, { label: string; from: string; to: string; accent: string }> = {
  pokemon: { label: "Pokémon", from: "#ffcb05", to: "#e63946", accent: "#ffcb05" },
  mtg: { label: "Magic: The Gathering", from: "#7c3aed", to: "#f97316", accent: "#a78bfa" },
  yugioh: { label: "Yu-Gi-Oh!", from: "#0ea5e9", to: "#6d28d9", accent: "#38bdf8" },
};

// Official Pokémon card scans from the Pokémon TCG API image host, e.g. ptcg("base1", 4).
const ptcg = (set: string, num: number | string) => `https://images.pokemontcg.io/${set}/${num}_hires.png`;

// Sample inventory — replace with your real stock (or move to a database later).
export const PRODUCTS: Product[] = [
  { id: "poke-charizard-base", name: "Charizard", game: "pokemon", set: "Base Set", rarity: "Holo Rare", condition: "Lightly Played", price: 349.99, stock: 1, blurb: "The grail. Iconic 1999 holo Charizard.", image: ptcg("base1", 4) },
  { id: "poke-pikachu-base", name: "Pikachu", game: "pokemon", set: "Base Set", rarity: "Common", condition: "Near Mint", price: 24.5, stock: 6, blurb: "The classic 1999 red-cheeks Pikachu.", image: ptcg("base1", 58) },
  { id: "poke-umbreon-vmax", name: "Umbreon VMAX (Alt Art)", game: "pokemon", set: "Evolving Skies", rarity: "Secret Rare", condition: "Near Mint", price: 289.0, stock: 2, blurb: "Moonlit alternate-art chase card.", image: ptcg("swsh7", 215) },
  { id: "poke-lugia-neo", name: "Lugia", game: "pokemon", set: "Neo Genesis", rarity: "Holo Rare", condition: "Moderately Played", price: 129.0, stock: 3, blurb: "Neo-era classic with a gorgeous holo.", image: ptcg("neo1", 9) },
  { id: "poke-blastoise-base", name: "Blastoise", game: "pokemon", set: "Base Set", rarity: "Holo Rare", condition: "Moderately Played", price: 159.0, stock: 2, blurb: "Base Set starter powerhouse with Rain Dance.", image: ptcg("base1", 2) },
  { id: "poke-venusaur-base", name: "Venusaur", game: "pokemon", set: "Base Set", rarity: "Holo Rare", condition: "Lightly Played", price: 119.0, stock: 2, blurb: "The third of the original starter holos.", image: ptcg("base1", 15) },
  { id: "poke-mewtwo-base", name: "Mewtwo", game: "pokemon", set: "Base Set", rarity: "Holo Rare", condition: "Near Mint", price: 74.0, stock: 3, blurb: "Psychic legend from the original set.", image: ptcg("base1", 10) },
  { id: "poke-booster-151", name: "151 Booster Bundle", game: "pokemon", set: "Scarlet & Violet 151", rarity: "Sealed", condition: "Sealed", price: 28.99, stock: 20, blurb: "Six boosters of the original 151." },
  { id: "poke-mewtwo-ex", name: "Mewtwo ex", game: "pokemon", set: "Scarlet & Violet 151", rarity: "Special Illustration Rare", condition: "Near Mint", price: 54.0, stock: 4, blurb: "Stunning full-art psychic powerhouse." },

  { id: "mtg-black-lotus-repro", name: "Black Lotus (Proxy Display)", game: "mtg", set: "Alpha (Display Copy)", rarity: "Display", condition: "Near Mint", price: 14.99, stock: 15, blurb: "Display-quality copy for your binder." },
  { id: "mtg-sheoldred", name: "Sheoldred, the Apocalypse", game: "mtg", set: "Dominaria United", rarity: "Mythic Rare", condition: "Near Mint", price: 62.0, stock: 5, blurb: "Constructed staple that punishes every draw." },
  { id: "mtg-ragavan", name: "Ragavan, Nimble Pilferer", game: "mtg", set: "Modern Horizons 2", rarity: "Mythic Rare", condition: "Near Mint", price: 48.5, stock: 7, blurb: "The monkey that broke Modern." },
  { id: "mtg-mana-crypt", name: "Mana Crypt", game: "mtg", set: "Eternal Masters", rarity: "Mythic Rare", condition: "Lightly Played", price: 189.0, stock: 1, blurb: "Zero-mana rock for Commander power players." },
  { id: "mtg-commander-deck", name: "Commander Precon Deck", game: "mtg", set: "Assorted", rarity: "Sealed", condition: "Sealed", price: 44.99, stock: 9, blurb: "Ready-to-play 100-card Commander deck." },
  { id: "mtg-lightning-bolt", name: "Lightning Bolt", game: "mtg", set: "Magic 2011", rarity: "Common", condition: "Near Mint", price: 2.5, stock: 40, blurb: "The most efficient burn spell ever printed." },

  { id: "ygo-blue-eyes", name: "Blue-Eyes White Dragon", game: "yugioh", set: "Legend of Blue Eyes", rarity: "Ultra Rare", condition: "Lightly Played", price: 199.0, stock: 2, blurb: "Seto Kaiba's legendary dragon, first print era." },
  { id: "ygo-dark-magician", name: "Dark Magician", game: "yugioh", set: "Starter Deck: Yugi", rarity: "Ultra Rare", condition: "Near Mint", price: 34.0, stock: 8, blurb: "The ultimate wizard in terms of attack and defence." },
  { id: "ygo-ash-blossom", name: "Ash Blossom & Joyous Spring", game: "yugioh", set: "Maximum Crisis", rarity: "Secret Rare", condition: "Near Mint", price: 21.0, stock: 12, blurb: "The most-played hand trap in the game." },
  { id: "ygo-exodia", name: "Exodia the Forbidden One", game: "yugioh", set: "Legend of Blue Eyes", rarity: "Ultra Rare", condition: "Moderately Played", price: 89.0, stock: 3, blurb: "Five pieces. One unstoppable win." },
  { id: "ygo-booster-box", name: "Legacy of Destruction Booster Box", game: "yugioh", set: "Legacy of Destruction", rarity: "Sealed", condition: "Sealed", price: 79.99, stock: 6, blurb: "24 packs of fresh competitive staples." },
  { id: "ygo-red-eyes", name: "Red-Eyes Black Dragon", game: "yugioh", set: "Starter Deck: Joey", rarity: "Ultra Rare", condition: "Near Mint", price: 27.5, stock: 5, blurb: "Joey's trusty fire-breathing dragon." },
];

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);
export const gbp = (n: number) => new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(n);
