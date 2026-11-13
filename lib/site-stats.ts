/** Eén bron voor de drie tellers. Homepage, Over ons en de footer lezen dezelfde sleutels. */
export const siteStats = {
  projecten: {
    key: 'stats.projecten',
    editorLabel: 'Teller: afgeronde projecten',
    value: '200+',
  },
  jaren: {
    key: 'stats.jaren',
    editorLabel: 'Teller: jaar vakmanschap',
    value: '10+',
  },
  reviews: {
    key: 'stats.reviews',
    editorLabel: 'Teller: vijfsterrenreviews',
    value: '95+',
  },
} as const
