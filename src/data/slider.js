import { SLIDE_IMG } from './images'

const TITLES = [
  "Cacao, beurre de cacao & chocolats Nya Mboa",
  "Nya Mboa noir 70 % éclats de fèves",
  "Nya Mboa 100 % noir",
  "Tartine Mboa, la pâte à tartiner",
  "À la rencontre des amateurs de chocolat",
  "SOCTRACAO fête ses 10 ans",
  "Goshen Crousty Cao, toute la richesse de la fève",
  "Salon du Chocolat de Montréal 2025, stand 46",
  "Sublimez vos pâtisseries avec notre poudre de cacao",
  "Fèves de cacao nature, sélection SOCTRACAO",
  "Tartine Mboa, le petit format de 90 g",
  "Dégustation en salon : Tartine Mboa et Nya Mboa",
  "Des moments de qualité en famille",
  "« De loin la meilleure tartine du pays », Christian Ngoms",
  "Tartine Mboa, un vrai coup de cœur",
  "Tartine Mboa à l’honneur, septembre 2026"
]

// Catégories de la galerie, dans l’ordre des images
export const GALLERY_CATS = ["Produits","Produits","Produits","Produits","Salons & rencontres","Moments","Produits","Salons & rencontres","Produits","Produits","Produits","Salons & rencontres","Moments","Moments","Moments","Produits"]

export const SLIDES = TITLES.map((t, i) => ({ src: SLIDE_IMG[i], t }))
