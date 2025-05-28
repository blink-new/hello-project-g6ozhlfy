import React from 'react';
import { motion } from 'framer-motion';

interface WorldMapProps {
  highlightCountries: string[]; // Array of country codes (e.g., ['US', 'FR', 'ES'])
}

// Simplified World Map SVG (replace with a more detailed one if needed)
// This is a placeholder structure. A real map would have <path> elements with country IDs.
const WorldMapSVG = ({
  highlightCountries,
}: { highlightCountries: string[] }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1000 500"
    className="w-full h-full"
  >
    {/* Placeholder for continents/countries */}
    {/* In a real map, these would be paths with IDs like id="US", id="FR", etc. */}
    <rect x="0" y="0" width="1000" height="500" fill="#e0e0e0" />
    
    {/* Example: Highlight a placeholder country with ID "US" */}
    {/* In a real map, you'd iterate through country paths and apply styles */}
    {highlightCountries.includes('US') && (
      <motion.rect
        x="100"
        y="100"
        width="50"
        height="30"
        fill="#4f46e5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 0.5 }}
      />
    )}
     {/* Example: Highlight a placeholder country with ID "FR" */}
    {highlightCountries.includes('FR') && (
      <motion.rect
        x="500"
        y="200"
        width="40"
        height="25"
        fill="#4f46e5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 0.5 }}
      />
    )}
     {/* Example: Highlight a placeholder country with ID "ES" */}
    {highlightCountries.includes('ES') && (
      <motion.rect
        x="480"
        y="250"
        width="45"
        height="28"
        fill="#4f46e5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 0.5 }}
      />
    )}
    {/* Add more placeholder countries as needed */}

    {/* Text overlay */}
    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="40" fill="#333" opacity="0.3">
      World Map Placeholder
    </text>
  </svg>
);

export default function WorldMap({ highlightCountries }: WorldMapProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-30">
      <WorldMapSVG highlightCountries={highlightCountries} />
    </div>
  );
}
