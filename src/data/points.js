import { POINT_IMG } from './images'

const ALTS = [
  "SOCTRACAO chez Carrefour Market",
  "SOCTRACAO à Santa Lucia, Bonabéri",
  "SOCTRACAO à Mâ Épicerie Fine, Yaoundé",
  "SOCTRACAO chez Carrefour Market, Douala et Yaoundé",
  "SOCTRACAO à la boulangerie Le Bien est Bien, Douala",
  "SOCTRACAO au Point de Ndokotti",
  "SOCTRACAO à la boulangerie Meno, Douala",
  "SOCTRACAO dans les boulangeries Saker",
  "SOCTRACAO chez Dovv, Yaoundé",
  "Chocolats Nya Mboa chez Dovv, Yaoundé",
  "Tartine Mboa chez Dovv, Yaoundé",
  "Beurre de cacao Goshen chez Dovv, Yaoundé",
  "SOCTRACAO à Garoua",
  "SOCTRACAO chez Smile, Douala",
  "Boulangeries Saker à Douala",
  "Anpiat Shop, Deido, Douala",
  "Smile (superette), Japoma, Douala",
  "Boulangerie Meno, rond-point Deido, Douala",
  "Rebecca Supermarket, Bonabéri, Douala",
  "Le Point de Ndokoti, Douala",
  "Petit Jean, Mboppi, Douala",
  "Le Bien est Bien, marché PK14, Douala",
  "Santa Lucia, Douala",
  "Super U, Bali et Bonamoussadi, Douala",
  "Casino, poste centrale et Bastos, Yaoundé",
  "Super U, Palais des Congrès, Yaoundé",
  "Mâ Épicerie, Tsinga, Yaoundé",
  "Stations Tradex, Youpwe, Parcours Vita, Missolè"
]

export const POINTS = ALTS.map((alt, i) => ({ alt, src: POINT_IMG[i] }))
