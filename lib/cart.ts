import type {CartItem} from "./types";

export function addToCart(cart:CartItem[], item:CartItem):CartItem[]{
  const existing=cart.find(x=>x.menuItemId===item.menuItemId);
  if(existing) return cart.map(x=>x.menuItemId===item.menuItemId?{...x,quantity:x.quantity+1}:x);
  return [...cart,{...item,quantity:1}];
}
export function updateCartQuantity(cart:CartItem[], id:string, quantity:number):CartItem[]{
  if(quantity<=0) return cart.filter(x=>x.menuItemId!==id);
  return cart.map(x=>x.menuItemId===id?{...x,quantity}:x);
}
export function cartSubtotal(cart:CartItem[]):number{
  return cart.reduce((sum,item)=>sum+(item.price*item.quantity),0);
}
