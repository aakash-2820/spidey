/** Minimum-cost path in a non-negative weighted adjacency list. */
export function dijkstra(graph,sourceId,destinationId){
 const distance=new Map(Object.keys(graph).map(id=>[id,Infinity]));const previous=new Map();const unvisited=new Set(Object.keys(graph));
 if(!unvisited.has(sourceId)||!unvisited.has(destinationId))return{path:[],totalWeight:Infinity};distance.set(sourceId,0);
 while(unvisited.size){let current=null,best=Infinity;for(const id of unvisited){const d=distance.get(id);if(d<best){best=d;current=id}}if(current===null||best===Infinity)break;unvisited.delete(current);if(current===destinationId)break;
  for(const edge of graph[current]||[]){if(edge.weight<0)throw new Error('Dijkstra requires non-negative weights');const next=best+edge.weight;if(next<(distance.get(edge.to)??Infinity)){distance.set(edge.to,next);previous.set(edge.to,current)}}
 }
 if(distance.get(destinationId)===Infinity)return{path:[],totalWeight:Infinity};const path=[];for(let at=destinationId;at;at=previous.get(at))path.unshift(at);return{path,totalWeight:+distance.get(destinationId).toFixed(3)};
}
