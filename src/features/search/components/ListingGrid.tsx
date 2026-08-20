import React from "react";
import { type ListingItem } from "../../../services/searchApi";
import { ProductCard } from "./ProductCard.js";

interface ListingGridProps {
  results: ListingItem[];
}

export const ListingGrid: React.FC<ListingGridProps> = ({ results }) => {
  return (
    <div style={styles.resultsGrid}>
      {results.map((item, idx) => (
        <ProductCard key={idx} item={item} />
      ))}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  resultsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
    gap: "14px",
    width: "100%",
    animation: "fadeInUp 0.4s ease-out",
  },
};
export default ListingGrid;
