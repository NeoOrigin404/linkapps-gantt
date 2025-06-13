# Application de Suivi de Production

Cette application est une solution de suivi de production développée avec React Native et Expo. Elle permet de visualiser et gérer les ordres de fabrication, le statut des machines et l'historique des opérations.

## Structure du Projet

### Composants (`/components`)

#### Composants UI de Base
- `Collapsible.tsx` : Composant pour créer des sections dépliables
- `ExternalLink.tsx` : Composant pour gérer les liens externes
- `HapticTab.tsx` : Onglet avec retour haptique
- `HelloWave.tsx` : Composant d'animation de salutation
- `ParallaxScrollView.tsx` : Vue défilante avec effet de parallaxe
- `ThemedText.tsx` : Composant de texte avec support du thème
- `ThemedView.tsx` : Composant de vue avec support du thème

#### Composants GanttChart (`/components/GanttChart`)
Le module GanttChart est un ensemble de composants spécialisés pour l'affichage et la gestion des diagrammes de Gantt :

- **Composants Principaux**
  - `GanttChart.tsx` : Composant principal qui orchestre l'affichage du diagramme
  - `TimeGrid.tsx` : Grille temporelle avec graduation et gestion du zoom
  - `MachineList.tsx` : Liste des machines avec leurs statuts
  - `WorkOrderList.tsx` : Liste des ordres de travail

- **Composants de Visualisation**
  - `ManufacturingOrderBars.tsx` : Barres représentant les ordres de fabrication
  - `WorkOrderBars.tsx` : Barres représentant les ordres de travail
  - `MaintenanceBars.tsx` : Barres représentant les périodes de maintenance
  - `StatusBars.tsx` : Indicateurs de statut des machines
  - `CurrentTimeIndicator.tsx` : Indicateur de l'heure actuelle

- **Composants d'Interface**
  - `SearchBar.tsx` : Barre de recherche pour filtrer les données
  - `DateRangePicker.tsx` : Sélecteur de plage de dates
  - `IntervalSelector.tsx` : Sélecteur d'intervalle de temps
  - `CategoryList.tsx` : Liste des catégories de machines

- **Composants d'Information**
  - `ManufacturingOrderTooltip.tsx` : Infobulle pour les ordres de fabrication
  - `WorkOrderTooltip.tsx` : Infobulle pour les ordres de travail

- **Composants de Support**
  - `MachineBackgrounds.tsx` : Arrière-plans pour les machines
  - `WorkOrderBackgrounds.tsx` : Arrière-plans pour les ordres de travail
  - `types.ts` : Définitions TypeScript pour le module
  - `constants.ts` : Constantes utilisées dans le module

### Hooks (`/hooks`)
- `useThemeColor.ts` : Hook pour gérer les couleurs du thème
- `useColorScheme.ts` : Hook pour détecter le schéma de couleur du système
- `useColorScheme.web.ts` : Version web du hook useColorScheme

### Données (`/data`)
- `ordres_de_fabrication.json` : Données des ordres de fabrication
- `machine_status_history.json` : Historique des statuts des machines
- `machines.json` : Informations sur les machines
- `data.json` : Données générales de l'application

### Configuration
- `package.json` : Dépendances et scripts du projet
- `tsconfig.json` : Configuration TypeScript
- `app.json` : Configuration Expo
- `expo-env.d.ts` : Types pour l'environnement Expo

## Installation

1. Cloner le repository
2. Installer les dépendances :
```bash
npm install
```
3. Lancer l'application :
```bash
npm start
```

## Fonctionnalités Principales

1. **Visualisation des Ordres de Fabrication**
   - Affichage en diagramme de Gantt
   - Suivi des statuts
   - Détails des opérations

2. **Suivi des Machines**
   - État en temps réel
   - Historique des statuts
   - Maintenance et alertes

3. **Interface Utilisateur**
   - Support des thèmes clair/sombre
   - Animations et retours haptiques
   - Interface responsive

## Fonctionnalités Implémentées

### 1. Visualisation du Diagramme de Gantt

#### Affichage des Données
- ✅ Affichage des ordres de fabrication sur une timeline
- ✅ Visualisation des statuts des machines
- ✅ Indicateur de l'heure actuelle
- ✅ Barres de maintenance
- ✅ Grille temporelle avec graduation

#### Navigation et Zoom
- ✅ Sélection d'intervalles de temps (60min, 8h, 1j, 7j)
- ✅ Défilement horizontal et vertical
- ✅ Bouton "Aujourd'hui" pour revenir à la date actuelle
- ✅ Zoom adaptatif selon l'intervalle sélectionné

#### Filtrage et Recherche
- ✅ Filtrage des données par plage de dates
- ✅ Affichage des données pertinentes uniquement
- ✅ Catégorisation des machines

### 2. Interface Utilisateur

#### Composants Interactifs
- ✅ Tooltips détaillés pour les ordres de fabrication
- ✅ Tooltips pour les statuts des machines
- ✅ Barres de défilement personnalisées
- ✅ Indicateurs visuels de statut

#### Thème et Style
- ✅ Support du thème clair/sombre
- ✅ Styles cohérents pour tous les composants
- ✅ Mise en page responsive
- ✅ Animations fluides

### 3. Gestion des Données

#### Types de Données Supportés
- ✅ Ordres de fabrication (ManufacturingOrder)
- ✅ Statuts des machines (MachineStatus)
- ✅ Historique des statuts (MachineStatusHistory)
- ✅ Informations sur les machines (Machine)

#### Fonctionnalités de Données
- ✅ Filtrage temporel des données
- ✅ Calcul automatique des dimensions
- ✅ Gestion des chevauchements
- ✅ Mise à jour en temps réel

### 4. Performance et Optimisation

#### Optimisations Implémentées
- ✅ Mémoisation des calculs coûteux
- ✅ Rendu conditionnel des composants
- ✅ Gestion efficace de la mémoire
- ✅ Chargement optimisé des données

#### Gestion de la Mémoire
- ✅ Nettoyage des ressources
- ✅ Gestion des références
- ✅ Optimisation des re-rendus

### 5. Fonctionnalités Techniques

#### Gestion du Temps
- ✅ Conversion UTC
- ✅ Calculs de durée
- ✅ Gestion des fuseaux horaires
- ✅ Formatage des dates

#### Interactions
- ✅ Gestion des événements tactiles
- ✅ Retour haptique
- ✅ Navigation intuitive
- ✅ Gestion des états

## Fonctionnalités à Implémenter

### 1. Interface Utilisateur
- ⏳ Mise en place d'un dark mode complet
- ⏳ Implémentation d'une barre de défilement horizontale flottante pour la version web
- ⏳ Système de hover pour afficher les informations détaillées des OF survolés
- ⏳ Personnalisation de l'interface selon les besoins spécifiques du client
- ⏳ Option d'affichage/masquage des numéros d'OF sur le diagramme de Gantt
- ⏳ Support multilingue (français/anglais) avec possibilité de changer la langue de l'interface

### 2. Fonctionnalités de Filtrage
- ⏳ Activation des boutons de filtrage "Status", "OF", "Cycles"
- ⏳ Mise en place d'une barre de recherche fonctionnelle

### 3. Visualisation des Données
- ⏳ Ajout d'une colonne de couleur pour identifier les équipes (4h-12h / 12h-20h / 20h-4h)
- ⏳ Implémentation d'un curseur sur l'histogramme horizontal pour visualiser le pourcentage d'avancement global des OF
- ⏳ Système de gestion des chevauchements de phases pour un même OF

## Développement

### Structure des Composants
Chaque composant suit une architecture modulaire avec :
- Props typées avec TypeScript
- Styles isolés
- Tests unitaires (dans `/components/__tests__`)

### Gestion des Thèmes
L'application utilise un système de thème personnalisé avec :
- Support natif des thèmes système
- Couleurs personnalisables
- Composants thématiques réutilisables

### Tests
Les tests sont organisés dans le dossier `__tests__` de chaque composant.

## Contribution
1. Créer une branche pour votre fonctionnalité
2. Développer et tester
3. Soumettre une pull request

## Licence
[À définir]

## Structures de Données

### Types Principaux

#### Machine
```typescript
interface Machine {
    machine_id: number;
    machine_name: string;
    machine_type: string;
    site_id: number;
    grp_id: number;
    status: string;
    last_maintenance_utc: string;
    next_maintenance_utc: string;
    location: string;
    serial_number: string;
    notes: string;
}
```

#### ManufacturingOrder (Ordre de Fabrication)
```typescript
interface ManufacturingOrder {
    of_id: number;
    machine_id: number;
    machine_name: string;
    start_datetime_utc: string;
    end_datetime_utc: string;
    mould_cavities: number;
    quantity_to_do: number;
    quantity_started: number;
    quantity_left: number;
    quantity_produced: number;
    quantity_defective: number;
    part_number: string;
    material: string;
    cycle_time_seconds: number;
    status: string;
    site_id: number;
    grp_id: number;
    notes: string;
}
```

#### MachineStatusHistory (Historique des Statuts)
```typescript
interface MachineStatusHistory {
    history_id: number;
    machine_id: number;
    machine_name: string;
    start_datetime_utc: string;
    end_datetime_utc: string;
    site_id: number;
    grp_id: number;
    notes: string;
}
```

### Intervalles de Temps
L'application utilise des intervalles de temps prédéfinis pour l'affichage du diagramme de Gantt :
```typescript
interface TimeInterval {
    value: number;
    unit: "minute" | "hour" | "day" | "week" | "month";
    primary: boolean;
}
```

Intervalles disponibles :
- 60 minutes
- 480 minutes (8 heures)
- 1 jour
- 7 jours

### Props du GanttChart
```typescript
interface GanttChartProps {
    startDate: string;
    endDate: string;
    machines: Machine[];
    manufacturingOrders: ManufacturingOrder[];
    style?: any;
    onOrderPress?: (order: ManufacturingOrder) => void;
}
```
