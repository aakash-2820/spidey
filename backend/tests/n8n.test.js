import test from 'node:test';
import assert from 'node:assert/strict';
import { detectCommand } from '../src/services/nlp.service.js';
import { generateTripWithN8n } from '../src/services/n8n.service.js';

test('detects itinerary generation commands',()=>{
  assert.equal(detectCommand('Make a plan from my selected places').intent,'MAKE_PLAN');
  assert.equal(detectCommand('Generate my itinerary').intent,'MAKE_PLAN');
});

test('fails safely when the production webhook is missing',async()=>{
  const previous=process.env.N8N_TRAVEL_PLANNER_WEBHOOK;
  delete process.env.N8N_TRAVEL_PLANNER_WEBHOOK;
  await assert.rejects(()=>generateTripWithN8n({destination:'Chennai'}),error=>error.code==='N8N_NOT_CONFIGURED');
  if(previous)process.env.N8N_TRAVEL_PLANNER_WEBHOOK=previous;
});

test('posts trip context and accepts JSON itinerary output',async()=>{
  const previousUrl=process.env.N8N_TRAVEL_PLANNER_WEBHOOK,previousFetch=global.fetch;
  process.env.N8N_TRAVEL_PLANNER_WEBHOOK='https://n8n.example/webhook/travel-planner';
  let request;
  global.fetch=async(url,options)=>{request={url:String(url),body:JSON.parse(options.body)};return new Response(JSON.stringify({itinerary:{title:'Chennai day'}}),{headers:{'content-type':'application/json'}})};
  try{const result=await generateTripWithN8n({destination:'Chennai',selectedPlaces:[{name:'Marina Beach'}]});assert.equal(request.body.destination,'Chennai');assert.equal(result.itinerary.title,'Chennai day')}finally{global.fetch=previousFetch;if(previousUrl)process.env.N8N_TRAVEL_PLANNER_WEBHOOK=previousUrl;else delete process.env.N8N_TRAVEL_PLANNER_WEBHOOK}
});

test('accepts text/plain workflow output',async()=>{
  const previousUrl=process.env.N8N_TRAVEL_PLANNER_WEBHOOK,previousFetch=global.fetch;
  process.env.N8N_TRAVEL_PLANNER_WEBHOOK='https://n8n.example/webhook/travel-planner';
  global.fetch=async()=>new Response('Day 1: Marina Beach',{headers:{'content-type':'text/plain'}});
  try{const result=await generateTripWithN8n({destination:'Chennai'});assert.equal(result.text,'Day 1: Marina Beach')}finally{global.fetch=previousFetch;if(previousUrl)process.env.N8N_TRAVEL_PLANNER_WEBHOOK=previousUrl;else delete process.env.N8N_TRAVEL_PLANNER_WEBHOOK}
});
