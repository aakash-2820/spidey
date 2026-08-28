const p=(id,name,lat,lon,category,tags,cost,duration,indoorOutdoor='indoor')=>({id,name,normalizedName:name.toLowerCase().replace(/[^a-z0-9]+/g,' ').trim(),city:'Madurai',state:'Tamil Nadu',country:'India',latitude:lat,longitude:lon,category,tags,description:null,imageUrl:null,imageSource:null,imageAttribution:null,rating:null,ratingSource:null,ratingCount:null,openingHours:null,averageCost:cost,visitDurationMinutes:duration,indoorOutdoor,source:'DEMO',externalId:null,weatherSensitivity:indoorOutdoor==='outdoor'?'high':'low',popularityScore:85,friendsFriendly:true,familyFriendly:true,soloFriendly:true,active:true});
export const maduraiPlaces=[
 p('meenakshi','Meenakshi Amman Temple',9.9195,78.1193,'temple',['temple','architecture','heritage','spiritual'],0,120),
 p('mahal','Thirumalai Nayakkar Mahal',9.9151,78.1239,'palace',['palace','mahal','heritage','architecture','photography'],50,90),
 p('teppakulam','Vandiyur Mariamman Teppakulam',9.9127,78.1454,'heritage',['temple','heritage','photography','spiritual'],0,75,'outdoor'),
 p('gandhi-museum','Gandhi Memorial Museum',9.9300,78.1389,'museum',['heritage','history'],0,90),
 p('koodal','Koodal Azhagar Temple',9.9138,78.1158,'temple',['temple','architecture','spiritual'],0,60),
 p('pazhamudhir','Pazhamudhir Solai',10.0934,78.2230,'temple',['temple','nature','spiritual','nearby'],0,90,'outdoor'),
 p('alagar','Alagar Koyil',10.0730,78.2140,'temple',['temple','architecture','nature','nearby'],0,100,'outdoor'),
 p('vilakkuthoon','Vilakkuthoon Market Streets',9.9174,78.1214,'market',['market','traditional food','photography'],300,75,'outdoor'),
 p('jigarthanda','Famous Jigarthanda',9.9210,78.1198,'food',['traditional food','jigarthanda','food'],120,35),
 p('murugan-idli','Murugan Idli Shop',9.9197,78.1182,'food',['traditional food','food'],250,55),
];
