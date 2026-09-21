"use client";
import Link from "next/link";
import {useEffect,useState} from "react";
import {cartSubtotal} from "@/lib/cart";
import type {CartItem} from "@/lib/types";
export default function Cart(){const[items,setItems]=useState<CartItem[]>([]);
useEffect(()=>{try{setItems(JSON.parse(localStorage.getItem("ember-cart")||"[]"))}catch{}},[]);
const subtotal=cartSubtotal(items);
return <main className="min-h-screen bg-[#eee8dc] px-5 py-16 md:px-12"><Link href="/order" className="text-xs uppercase tracking-[.2em]">← Menu & ordering</Link><h1 className="serif mt-16 text-5xl">Your cart</h1>{items.length?<><div className="mt-10 grid gap-4">{items.map(i=><div key={i.menuItemId} className="flex justify-between bg-white/60 p-5"><span>{i.name} × {i.quantity}</span><span>₦{(i.price*i.quantity).toLocaleString()}</span></div>)}</div><div className="mt-8 flex justify-between border-t border-black/10 pt-6 text-lg"><span>Subtotal</span><strong>₦{subtotal.toLocaleString()}</strong></div><Link href="/checkout" className="mt-8 inline-block bg-black px-7 py-4 text-xs uppercase tracking-[.18em] text-white">Continue to checkout</Link></>:<div className="mt-10 bg-white/60 p-8"><p>Your cart is empty.</p><Link href="/order" className="mt-5 inline-block underline">Browse the menu</Link></div>}</main>}