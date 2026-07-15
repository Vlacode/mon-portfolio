# Rapport des modifications

## Version 1.0

Création du portfolio.

- Hero
- À propos
- Compétences
- Parcours
- Contact

---

## Version 1.1

Ajout :

Mode sombre.

---

## Version 1.2

Refonte de la section Formation.

Améliorations :

- timeline horizontale
- meilleure hiérarchie
- image recentrée
- responsive

---

## Version 1.3

Refonte de la section Mes Projets.

Améliorations :

- cartes responsives
- adaptation automatique
- badges optimisés
- meilleure grille

---

## Version 1.4

Refonte complète de la section Contact.

Ajouts :

- téléphone international
- liste des objets
- validation dynamique
- spinner
- messages d'erreur
- EmailJS
- WhatsApp
- responsive amélioré

---

## Version 1.5

### Refactoring CSS complet

Objectif :

Améliorer la qualité du code CSS sans modifier le rendu visuel du portfolio.

Cette opération correspond à un **refactoring CSS**.

### Analyse réalisée

Le fichier `style.css` a été entièrement audité afin d'identifier :

- les styles dupliqués ;
- les animations répétées ;
- les media queries redondantes ;
- les sélecteurs identiques ;
- les règles inutilisées ;
- les possibilités de mutualisation.

### Travaux effectués

#### Nettoyage

- suppression des règles CSS dupliquées ;
- suppression des animations répétées ;
- suppression des media queries redondantes.

#### Optimisation

- fusion des sélecteurs identiques ;
- regroupement des styles similaires ;
- réduction de la taille du fichier ;
- amélioration des performances de rendu.

#### Réorganisation

Nouvelle organisation logique du fichier CSS :

1. Variables
2. Reset
3. Base
4. Accessibilité
5. Navigation
6. Hero
7. Boutons
8. Sections
9. About
10. Skills
11. Formation
12. Projets
13. Contact
14. Footer
15. Animations
16. Scrollbar
17. Responsive

### Résultat

✔ Aucun changement visuel.

✔ Aucun changement fonctionnel.

✔ CSS plus propre.

✔ Lecture simplifiée.

✔ Maintenance facilitée.

✔ Meilleure évolutivité.

✔ Réduction de la dette technique.

### Type d'intervention

- Refactoring CSS
- Code Cleanup
- CSS Optimization
- Code Quality Improvement
- Maintenance préventive
---

# Prochaines évolutions

- téléchargement du CV
- filtres de projets
- internationalisation
- blog technique
- PWA
- optimisation Lighthouse > 95