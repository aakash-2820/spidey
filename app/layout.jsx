import { Manrope } from 'next/font/google';
import './globals.css';
const manrope = Manrope({ variable: '--font-manrope', subsets: ['latin'] });
export const metadata = {
    title: 'TravelMind — AI-Powered Adaptive Travel Planner',
    description: 'A personalized itinerary that intelligently adapts when real life changes.',
    openGraph: { title: 'TravelMind — Your trip. Smarter at every turn.', description: 'AI-powered adaptive travel that keeps your trip on track.', images: ['/og.png'] },
    twitter: { card: 'summary_large_image', title: 'TravelMind — Your trip. Smarter at every turn.', description: 'AI-powered adaptive travel that keeps your trip on track.', images: ['/og.png'] },
};
export default function RootLayout({ children }) {
    return <html lang="en"><body className={manrope.variable}>{children}</body></html>;
}
