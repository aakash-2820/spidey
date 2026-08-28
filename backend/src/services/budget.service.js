export const summarizeBudget=(budget,items)=>{const spent=items.reduce((n,x)=>n+(x.averageCost||0),0);return{budget,estimatedSpend:spent,remaining:budget-spent,withinBudget:spent<=budget}};
