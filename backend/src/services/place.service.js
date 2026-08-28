import { places } from '../seed/chennai.places.js';export const listPlaces=filters=>places.filter(p=>(!filters?.category||p.category===filters.category)&&p.active);
