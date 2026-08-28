const fallback={destination:'Chennai',travelers:4,budget:4000,currency:'INR',durationDays:1,interests:['beach','food','photography'],avoid:['museum'],travelStyle:'friends',pace:'moderate',startTime:'09:00',endTime:'20:00'};
export async function parseNaturalLanguage(request=''){
 if(!process.env.GEMINI_API_KEY)return {...fallback,source:'deterministic-demo'};
 const prompt=`Extract strict JSON travel requirements from: ${JSON.stringify(request)}. Keys: destination, travelers, budget, currency, durationDays, interests, avoid, travelStyle, pace, startTime, endTime.`;
 const response=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({contents:[{parts:[{text:prompt}]}],generationConfig:{responseMimeType:'application/json'}})});
 if(!response.ok)return {...fallback,source:'fallback'};const data=await response.json();return {...JSON.parse(data.candidates[0].content.parts[0].text),source:'gemini'};
}
