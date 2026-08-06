# 💳  Finivo | Comparateur de Cartes de Crédit au Canada

Bienvenue sur le dépôt de **Finivo**, une plateforme moderne et intuitive conçue pour aider les résidents canadiens (et particulièrement québécois) à trouver la carte de crédit idéale selon leurs habitudes de consommation.

**🌐 Site en direct :** [finivo.ca](https://finivo.ca) (ou https://finivo.pages.dev)

---

## 🚀 Vision du Projet
Finivo vise à simplifier le paysage financier complexe du Canada en offrant :
- **Transparence** : Comparaison claire des frais annuels, taux d'intérêt et bonus.
- **Précision** : Données à jour sur les "Big Six" banques canadiennes et les néo-banques.
- **Expérience Utilisateur** : Interface ultra-rapide et responsive adaptée aux mobiles.

## 🛠️ Technologies Utilisées
Ce projet est bâti avec les meilleures technologies web actuelles :
- **Framework** : [React](https://reactjs.org/) avec [Vite](https://vitejs.dev/) pour une performance maximale.
- **Langage** : [TypeScript](https://www.typescriptlang.org/) pour un code robuste.
- **Stylisation** : [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/) pour un design professionnel.
- **Icônes** : [Lucide React](https://lucide.dev/).
- **Déploiement** : [Cloudflare Pages](https://pages.cloudflare.com/) pour une sécurité et une rapidité de classe entreprise.

## 📂 Structure des Données
Les informations sur les cartes de crédit sont centralisées dans `src/data/creditCards.ts`. Chaque carte suit une interface stricte incluant :
- Frais annuels, bonus de bienvenue et valeur estimée.
- Taux d'intérêt et revenus minimums requis.
- Liens d'affiliation vers les institutions financières officielles.

## 🔧 Installation Locale (Pour les développeurs)

Si vous souhaitez contribuer ou tester le projet localement :

```sh
# 1. Cloner le dépôt
git clone [https://github.com/votre-utilisateur/finivo.git](https://github.com/votre-utilisateur/finivo.git)

# 2. Entrer dans le dossier
cd finivo

# 3. Installer les dépendances
npm install

# 4. Lancer le serveur de développement
npm run dev
To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
