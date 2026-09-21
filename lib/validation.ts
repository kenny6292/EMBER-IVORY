export function isValidEmail(value:string){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);}
export function required(value:string){return value.trim().length>0;}
export function positiveInteger(value:number){return Number.isInteger(value)&&value>0;}
