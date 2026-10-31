import { TREND_IMG } from './images'

const ITEMS = [
  [
    "https://soctracao.com/filiere-cacao-les-producteurs-dechantent-suite-a-la-baisse-de-41-du-prix-du-kilogramme/",
    "01",
    "Filière cacao : les producteurs déchantent suite à la baisse de 4,1 % du prix du kilogramme"
  ],
  [
    "https://soctracao.com/creer-sa-plantation-de-cacao/",
    "02",
    "Créer sa plantation de cacao"
  ],
  [
    "https://soctracao.com/cacao-ivoirien-3t-ha-cacao-camerounais-1t-ha-pourquoi/",
    "03",
    "Cacao ivoirien : 3 t/ha, cacao camerounais : 1 t/ha. Pourquoi ?"
  ],
  [
    "https://soctracao.com/la-fabrication-du-chocolat-sintroduit-en-milieu-rural/",
    "04",
    "La fabrication du chocolat s’introduit en milieu rural"
  ],
  [
    "https://soctracao.com/ecoles-paysannes-et-rendement-du-cacao-au-cameroun/",
    "05",
    "Écoles paysannes et rendement du cacao au Cameroun"
  ],
  [
    "https://soctracao.com/les-systemes-agroforestiers-a-base-cacaoyer-au-cameroun/",
    "06",
    "Les systèmes agroforestiers à base cacaoyer au Cameroun"
  ],
  [
    "https://soctracao.com/la-provenance-des-feves-de-cacao-du-cameroun/",
    "07",
    "La provenance des fèves de cacao du Cameroun"
  ]
]

export const TREND = ITEMS.map(([href, n, t], i) => ({ href, n, t, img: TREND_IMG[i] }))
