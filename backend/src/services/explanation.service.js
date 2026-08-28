export const explain=(changes)=>changes.length?changes.map(x=>x.reason).join(' '):'The plan already satisfies the new conditions, so no disruption was needed.';
