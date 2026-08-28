const trips=new Map();
export function createTrip(data){const id=data.id||crypto.randomUUID();const trip={id,status:'planned',items:[],revision:1,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),...data};trips.set(id,trip);return trip}
export const listTrips=()=>[...trips.values()];export const getTrip=id=>trips.get(id);
export function updateTrip(id,patch){const trip=trips.get(id);if(!trip)return null;const next={...trip,...patch,id,revision:(trip.revision||1)+1,updatedAt:new Date().toISOString()};trips.set(id,next);return next}
export function deleteTrip(id){return trips.delete(id)}
export function addItem(id,item){const trip=getTrip(id);if(!trip)return null;const next={...item,id:item.id||crypto.randomUUID(),priority_type:item.priority_type||'USER_SELECTED',priority_score:item.priority_score||90};return updateTrip(id,{items:[...(trip.items||[]),next]})}
export function updateItem(id,itemId,patch){const trip=getTrip(id);return trip&&updateTrip(id,{items:trip.items.map(x=>x.id===itemId?{...x,...patch,id:itemId}:x)})}
export function removeItem(id,itemId){const trip=getTrip(id);return trip&&updateTrip(id,{items:trip.items.filter(x=>x.id!==itemId)})}
