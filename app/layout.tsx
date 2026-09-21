import "./globals.css";
import type {Metadata} from "next";
export const metadata:Metadata={title:"EMBER & IVORY | Where Fire Meets Flavour",description:"Contemporary dining shaped by fire, craft, and unforgettable ingredients.",metadataBase:new URL("https://ember-and-ivory.vercel.app")};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}