export type Role = "customer" | "staff" | "admin";
export type OrderStatus = "pending" | "confirmed" | "preparing" | "ready" | "completed" | "cancelled";
export type ReservationStatus = "pending" | "confirmed" | "seated" | "completed" | "cancelled" | "no_show";
export type OrderType = "pickup" | "delivery";

export interface MenuCategory { id:string; name:string; slug:string; description?:string; sort_order:number; is_active:boolean; }
export interface MenuItem { id:string; category_id:string; name:string; slug:string; description:string; price:number; image_url?:string; is_available:boolean; is_featured:boolean; sort_order:number; }
export interface CartItem { menuItemId:string; name:string; price:number; quantity:number; }
