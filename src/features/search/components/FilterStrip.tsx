import React from "react";
import { Layers, ShoppingBag, Filter } from "lucide-react";
import { CustomSelect } from "./CustomSelect";
import type { Category, Platform, SortBy } from "../../../services/searchApi";

interface FilterStripProps {
  category: Category;
  setCategory: (c: Category) => void;
  platform: Platform;
  setPlatform: (p: Platform) => void;
  sortBy: SortBy;
  setSortBy: (s: SortBy) => void;
  minPrice: number | "";
  setMinPrice: (v: number | "") => void;
  maxPrice: number | "";
  setMaxPrice: (v: number | "") => void;
}

const CATEGORY_OPTIONS = [
  { value: "ELETRONICOS", label: "Eletrônicos" },
  { value: "VEICULOS", label: "Veículos" },
  { value: "IMOVEIS", label: "Imóveis" },
  { value: "JOGOS", label: "Jogos/Contas" },
  { value: "OUTROS", label: "Outros" },
];

const PLATFORM_OPTIONS = [
  { value: "ALL", label: "Todos" },
  { value: "MERCADO_LIVRE", label: "M. Livre" },
  { value: "OLX", label: "OLX" },
  { value: "AMAZON", label: "Amazon" },
  { value: "GGMAX", label: "GGMax" },
];

const SORT_OPTIONS = [
  { value: "price_asc", label: "Menor Preço" },
  { value: "price_desc", label: "Maior Preço" },
  { value: "rating_desc", label: "Melhores" },
];

export const FilterStrip: React.FC<FilterStripProps> = ({
  category,
  setCategory,
  platform,
  setPlatform,
  sortBy,
  setSortBy,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}) => {
  return (
    <div style={styles.filterStrip}>
      {/* Category Custom Select */}
      <CustomSelect
        value={category}
        onChange={(val) => setCategory(val as Category)}
        options={CATEGORY_OPTIONS}
        icon={<Layers size={13} />}
        width="135px"
      />

      {/* Platform Custom Select */}
      <CustomSelect
        value={platform}
        onChange={(val) => setPlatform(val as Platform)}
        options={PLATFORM_OPTIONS}
        icon={<ShoppingBag size={13} />}
        width="135px"
      />

      {/* Sort Custom Select */}
      <CustomSelect
        value={sortBy}
        onChange={(val) => setSortBy(val as SortBy)}
        options={SORT_OPTIONS}
        icon={<Filter size={13} />}
        width="135px"
      />

      {/* Price Inputs */}
      <div style={styles.priceInputs}>
        <input
          type="number"
          placeholder="Min"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : "")}
          style={styles.priceInput}
          className="custom-select-premium-btn"
        />
        <span style={styles.priceDivider}>—</span>
        <input
          type="number"
          placeholder="Max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : "")}
          style={styles.priceInput}
          className="custom-select-premium-btn"
        />
      </div>

      {/* Quick Chips */}
      <div style={styles.quickChipsGroup}>
        <button
          type="button"
          onClick={() => setSortBy("price_asc")}
          style={{
            ...styles.chipBtn,
            backgroundColor: sortBy === "price_asc" ? "rgba(0, 184, 148, 0.12)" : "var(--bg-primary)",
            color: sortBy === "price_asc" ? "var(--success)" : "var(--text-secondary)",
            border: sortBy === "price_asc" ? "1px solid rgba(0, 184, 148, 0.4)" : "1px solid var(--border)",
          }}
        >
          <span>📉 Menor Preço</span>
        </button>

        <button
          type="button"
          onClick={() => setSortBy("rating_desc")}
          style={{
            ...styles.chipBtn,
            backgroundColor: sortBy === "rating_desc" ? "rgba(255, 184, 0, 0.12)" : "var(--bg-primary)",
            color: sortBy === "rating_desc" ? "#d35400" : "var(--text-secondary)",
            border: sortBy === "rating_desc" ? "1px solid rgba(255, 184, 0, 0.4)" : "1px solid var(--border)",
          }}
        >
          <span>⭐ Avaliação 4.5+</span>
        </button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  filterStrip: { display: "flex", flexWrap: "wrap" as const, gap: "8px", alignItems: "center", width: "100%" },
  priceInputs: { display: "flex", alignItems: "center", gap: "6px" },
  priceInput: { width: "70px", backgroundColor: "#ffffff", border: "1px solid var(--border)", borderRadius: "24px", color: "var(--text-primary)", padding: "8px 10px", fontSize: "12px", fontWeight: 600, textAlign: "center" as const, outline: "none", transition: "var(--transition)" },
  priceDivider: { color: "var(--text-muted)", fontSize: "12px" },
  quickChipsGroup: { display: "flex", alignItems: "center", gap: "6px", marginLeft: "auto" },
  chipBtn: { borderRadius: "20px", padding: "6px 12px", fontSize: "11px", fontWeight: 700, cursor: "pointer", transition: "var(--transition)" },
};

export default FilterStrip;
