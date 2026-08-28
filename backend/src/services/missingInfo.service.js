export const REQUIRED_FIELDS=['destination','durationDays','budget','travellers'];
export function detectMissingTripInformation(data){return REQUIRED_FIELDS.filter(key=>data[key]===null||data[key]===undefined||data[key]==='')}
export function nextClarification(data){const field=detectMissingTripInformation(data)[0];const questions={destination:'Where are you travelling?',durationDays:'How many days are you planning?',budget:'What budget should I plan around?',travellers:'How many people are travelling?'};return field?{field,question:questions[field]}:null}
