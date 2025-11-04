// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// App Configuration
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Dragon Ball API';
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0';

// UI Constants
export const ITEMS_PER_PAGE = 20;
export const DEBOUNCE_DELAY = 300;

// Colors
export const COLORS = {
  primary: '#FF6B35',
  secondary: '#004E89',
  accent: '#FFD23F',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6'
};

// Entity Types
export const ENTITY_TYPES = {
  PERSONAJE: 'personaje',
  RAZA: 'raza',
  PLANETA: 'planeta',
  SAGA: 'saga',
  TECNICA: 'tecnica',
  TRANSFORMACION: 'transformacion',
  BATALLA: 'batalla'
};

// Technique Types
export const TECHNIQUE_TYPES = [
  'Ataque',
  'Defensa',
  'Especial',
  'Ki',
  'Transformación'
];

// Common Affiliations
export const AFFILIATIONS = [
  'Guerreros Z',
  'Saiyans',
  'Namekianos',
  'Androides',
  'Ejército de Freezer',
  'Majin',
  'Dioses',
  'Neutral'
];