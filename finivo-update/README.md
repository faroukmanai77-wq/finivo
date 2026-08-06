# 💳 Finivo | Comparateur de Cartes de Crédit au Canada

Bienvenue sur le dépôt de **Finivo**, une plateforme moderne et intuitive conçue pour aider les résidents canadiens (et particulièrement québécois) à trouver la carte de crédit idéale selon leurs habitudes de consommation.

**🌐 Site en direct :** [finivo.ca](https://finivo.ca)

---

## 🚀 Vision du Projet
Finivo vise à simplifier le paysage financier complexe du Canada en offrant :
- **Transparence** : Comparaison claire des frais annuels, taux d'intérêt et bonus.
- **Précision** : Données à jour sur les "Big Six" banques canadiennes et les néo-banques.
- **Expérience Utilisateur** : Interface ultra-rapide et responsive adaptée aux mobiles.

## 🛠️ Stack Technique
- **Développement** : [Claude Code](https://claude.com/claude-code)
- **Framework** : [React](https://reactjs.org/) avec [Vite](https://vitejs.dev/)
- **Langage** : [TypeScript](https://www.typescriptlang.org/)
- **Stylisation** : [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Icônes** : [Lucide React](https://lucide.dev/)
- **Backend / DB** : [Supabase](https://supabase.com/) (Postgres, Auth, Edge Functions)
- **Hébergement** : [Vercel](https://vercel.com/)
- **DNS / Domaine** : [Cloudflare](https://www.cloudflare.com/) (`finivo.ca` pointe vers Vercel)

## 📂 Structure des Données
Les informations sur les cartes de crédit sont centralisées dans `src/data/creditCards.ts`. Chaque carte suit une interface stricte incluant :
- Frais annuels, bonus de bienvenue et valeur estimée.
- Taux d'intérêt et revenus minimums requis.
- Liens d'affiliation vers les institutions financières officielles.

## 🔧 Installation Locale

```sh
# 1. Cloner le dépôt
git clone https://github.com/faroukmanai77-wq/finivo.git

# 2. Entrer dans le dossier
cd finivo

# 3. Installer les dépendances
npm install

# 4. Copier les variables d'environnement (voir "Variables d'environnement" ci-dessous)
cp .env.example .env

# 5. Lancer le serveur de développement
npm run dev
```

## 🔑 Variables d'environnement

Le frontend a besoin des variables suivantes (voir `.env`) :

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
VITE_SUPABASE_PROJECT_ID=...
```

Ces valeurs se trouvent dans le dashboard Supabase du projet (`Project Settings > API`).

## ☁️ Déploiement

Le site est déployé sur **Vercel** :
- Chaque push sur `main` déclenche un déploiement en production.
- Les mêmes variables d'environnement (`VITE_SUPABASE_*`) doivent être configurées dans **Vercel > Project Settings > Environment Variables**.
- `vercel.json` configure la réécriture des routes (SPA React Router) vers `index.html`.

Le domaine **finivo.ca** est géré sur **Cloudflare** (zone DNS uniquement) :
- Un enregistrement `CNAME` (ou `A`/`ALIAS` selon la config Vercel) pointe `finivo.ca` / `www.finivo.ca` vers le déploiement Vercel.
- Le domaine est ajouté et vérifié dans **Vercel > Project Settings > Domains**.

## 🗄️ Backend (Supabase)

- Les migrations SQL sont dans `supabase/migrations/`.
- Les Edge Functions (`supabase/functions/`) incluent notamment :
  - `mcp` : un serveur [Model Context Protocol](https://modelcontextprotocol.io/) public et en lecture seule exposant les cartes de crédit, courtiers, livres et articles de blog de Finivo aux agents IA.
  - `translate-blog` : traduction automatique des articles de blog.
